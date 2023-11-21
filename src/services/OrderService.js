import db from "../models/index.js";
import CustomerController from "../controllers/CustomerController.js";
import CartService from "./CartService.js";

const checkAvailableOrder = async (product_id, quantity) => {
  const productDoc = await db.Product.findOne({ _id: product_id });

  if (productDoc) {
    const quantityMax = productDoc.SoLuongHang || 0;

    const hanghoaAll = await db.OrderDetail.find({
      MSHH: product_id,
    });

    // Tính số hàng còn lại trong kho của sản phẩm
    const ordered = hanghoaAll.reduce((total, item) => {
      return (total += item.SoLuong);
    }, 0);

    if (ordered + quantity > quantityMax)
      return {
        isAvailable: false,
        quantityAvailable: quantityMax - ordered,
        productDoc: productDoc.TenHH,
      };

    return {
      isAvailable: true,
      quantityAvailable: quantityMax - ordered,
    };
  }
};

const create = async (rawData) => {
  const { DataUpdateCustomer, DataOrder } = rawData;
  try {
    // Kiểm tra số lượng hàng coi đủ không================================================================

    const promiseCheckAvailable = DataOrder.map(async (p) => {
      const orderAvailable = await checkAvailableOrder(p.MSHH, p.SoLuong);

      return {
        productCart: p,
        isAvailable: orderAvailable.isAvailable,
        quantityAvailable: orderAvailable.quantityAvailable,
        data: orderAvailable.productDoc,
      };
    });
    const checkOrderMap = await Promise.all(promiseCheckAvailable);

    const productNotOrder = checkOrderMap.filter((c) => c.isAvailable == false);

    const msgText = productNotOrder.reduce((acc, item) => {
      return acc + item.data + ":" + item.quantityAvailable + "\n";
    }, "");

    if (productNotOrder.length > 0) {
      return {
        DT: [],
        EC: -2,
        EM: `Đã có người vừa đặt số lượng không đủ cấp cho bạn.\nSố lượng có thể đặt:\n${msgText}`,
      };
    }

    //====================================================================================================

    // Cập nhật thông tin người dùng

    const updateCus = await db.Customer.findOneAndUpdate(
      { Email: DataUpdateCustomer.Email },
      {
        HoTen: DataUpdateCustomer.HoTen,
        SoDienThoai: DataUpdateCustomer.SoDienThoai,
        DiaChi: DataUpdateCustomer.DiaChi,
      },
      { new: true }
    ).lean();

    if (!updateCus) {
      return {
        EM: "Cập nhật người dùng thất bại , không thể đặt hàng !!!",
        EC: -2,
        DT: updateCus,
      };
    }

    // Tạo đặt hàng
    const order = await db.Order.create({
      MSKH: DataUpdateCustomer.IDCus,
      TrangthaiHD: 0,
    });

    if (!order._id) {
      return {
        EM: "Tạo đơn hàng thất bại !!!",
        EC: -2,
        DT: [],
      };
    }

    // Xoa cac sản phẩm trong giỏ hàng
    const orderIdArrayToDelete = DataOrder.map((item) => {
      return item.IDCart;
    });
    const deleteCondition = {
      _id: { $in: orderIdArrayToDelete },
    };
    const deleteItemCart = await db.Cart.deleteMany(deleteCondition);

    // Tạo chi tiết đặt hàng
    const DataOrderDetail = DataOrder.map((item) => ({
      ...item,
      SoDonDH: order._id,
    }));

    const data = await db.OrderDetail.insertMany(DataOrderDetail);

    // if (data) {
    return {
      EM: "Tạo đơn hàng thành công ",
      EC: 0,
      DT: data,
    };
    // }
  } catch (error) {
    console.log(">>> error", error);
    return {
      EM: " Lỗi server",
      EC: -5,
      DT: [],
    };
  }
};

const read = async (rawData) => {
  const { ID_KhachHang, type, sort } = rawData;

  const sorter = {};
  if (sort?.startsWith("-")) {
    sorter[sort.substring(1)] = -1;
  } else {
    sorter[sort] = 1;
  }

  try {
    const CustomerOrder = await db.Order.find({
      MSKH: ID_KhachHang,
      TrangthaiHD: type,
    })
      .sort(sorter)
      .lean();

    const result = CustomerOrder.map(async (item) => {
      let detail = await db.OrderDetail.find({ SoDonDH: item._id })
        .populate("MSHH")
        .lean();

      return {
        ...item,
        OrderDetail: detail,
      };
    });

    const data = await Promise.all(result);

    return {
      EM: "Lấy dữ liệu thành công",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(">>> error", error);
    return {
      EM: " Lỗi server",
      EC: -5,
      DT: [],
    };
  }
};

const readPagination = async (rawData) => {
  const { page, limit, type, sort } = rawData;

  try {
    let offset = (page - 1) * limit;

    const sorter = {};
    if (sort?.startsWith("-")) {
      sorter[sort.substring(1)] = -1;
    } else {
      sorter[sort] = 1;
    }

    const order = await db.Order.find({ TrangthaiHD: type })
      .skip(offset)
      .limit(limit)
      .sort(sorter)
      .populate("MSKH")
      .lean();

    const result = order.map(async (item) => {
      let detail = await db.OrderDetail.find({ SoDonDH: item._id })

        .populate("MSHH")
        .lean();

      return {
        ...item,
        OrderDetail: detail,
      };
    });

    const pagination = await Promise.all(result);

    const totalRecords = await db.Order.countDocuments({ TrangthaiHD: type });
    const meta = {
      current: page,
      pageSize: limit,
      pages: Math.ceil(totalRecords / limit),
      total: totalRecords,
    };
    const data = { pagination, meta };

    return {
      EM: "Lấy dữ liệu thành công",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(">>> error", error);
    return {
      EM: " Lỗi server",
      EC: -5,
      DT: [],
    };
  }
};

const update = async (rawData) => {
  try {
    const existOrder = await db.Order.findById({ _id: rawData.idOrder });

    if (!existOrder) {
      return {
        EM: "Sản phẩm không tồn tại !!! ",
        EC: -2,
        DT: [],
      };
    }

    const data = await db.Order.findByIdAndUpdate(
      { _id: rawData.idOrder },
      {
        TrangthaiHD: rawData.TrangThaiHD,
        NgayGH: rawData.NgayGH,
      },
      { new: true }
    );

    if (data) {
      return {
        EM: "Update sản phẩm thành công ",
        EC: 0,
        DT: data,
      };
    }
  } catch (error) {
    console.log(">>> error", error);
    return {
      EM: " Lỗi server",
      EC: -5,
      DT: [],
    };
  }
};

const deleted = async (rawData) => {
  try {
    const exitProduct = await db.Order.findById(rawData.idOrder);
    if (!exitProduct) {
      return {
        EM: "Không tồn tại đơn hàng !!!",
        EC: -3,
        DT: [],
      };
    }

    // Xóa trong bảng Đặt hàng chi tiết trước
    const deleteCondition = {
      SoDonDH: { $in: rawData.idOrder },
    };
    const deleteItemCart = await db.OrderDetail.deleteMany(deleteCondition);

    // Xóa trong bảng đơn hàng

    const deleted = await db.Order.findByIdAndDelete({
      _id: rawData?.idOrder,
    });

    if (deleted) {
      return {
        EM: "Xóa đơn hàng thành công",
        EC: 0,
        DT: deleted,
      };
    }
  } catch (error) {
    console.log(">>> error", error);
    return {
      EM: " Lỗi server",
      EC: -5,
      DT: [],
    };
  }
};

const revenueProduct = async () => {
  try {
    const products = await db.Product.find().lean();

    const resultPromise = products.map(async (book) => {
      const orderDetails = await db.OrderDetail.find().populate({
        path: "MSHH",
        match: { _id: book._id },
      });

      return {
        ...book,
        orderDetails,
      };
    });

    const resultRaw = await Promise.all(resultPromise);
    const result = resultRaw.map((item) => {
      const detail = item.orderDetails.filter((item) => item.MSHH != null);
      const result = detail.reduce((total, item) => {
        return total + item.SoLuong * item.GiaDatHang;
      }, 0);

      return {
        TenHH: item.TenHH,
        totalMoney: result,
      };
    });

    return {
      EM: "Doanh thu mỗi sản phẩm mỗi tháng",
      EC: 0,
      DT: result,
    };
  } catch (error) {
    console.error("Lỗi:", error);
    return {
      EM: "Lỗi server",
      EC: -5,
      DT: [],
    };
  }
};

const dashboardAll = async (rawData) => {
  try {
    const customers = await db.Customer.countDocuments({});
    const product = await db.Product.countDocuments({});
    const order = await db.Order.countDocuments({});
    const data = {
      customers,
      product,
      order,
    };
    return {
      EM: "Lấy dữ liệu thành công",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(">>> error", error);
    return {
      EM: " Lỗi server",
      EC: -5,
      DT: [],
    };
  }
};

export default {
  create,
  read,
  readPagination,
  update,
  deleted,
  revenueProduct,
  dashboardAll,
};
