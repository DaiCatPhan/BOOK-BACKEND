import db from "../models/index.js";
import CustomerController from "../controllers/CustomerController.js";
import CartService from "./CartService.js";

const create = async (rawData) => {
  const { DataUpdateCustomer, DataOrder } = rawData;
  try {
    // Cập nhật thông tin người dùng
    // Email , SoDienThoai,HoTen,DiaChi

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
  const { ID_KhachHang } = rawData;
  try {
    const CustomerOrder = await db.Order.find({ MSKH: ID_KhachHang })
      // .populate("MSKH")
      .lean();

    const result = CustomerOrder.map(async (item) => {
      let detail = await db.OrderDetail.find({ SoDonDH: item._id })
        .populate("MSHH")
        .lean();
      // return {
      //   order: item,
      //   OrderDetail: detail,
      // };

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

export default { create, read, readPagination, update };
