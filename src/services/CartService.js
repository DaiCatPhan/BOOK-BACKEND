import db from "../models/index.js";
import CartController from "../controllers/CartController.js";

const exitHangHoaCart = async (idHangHoa, idUser) => {
  const HangHoa = await db.Cart.findOne({
    IdUser: idUser,
    IdHangHoa: idHangHoa,
  });
  return HangHoa;
};

const create = async (rawData) => {
  try {
    const exitHH = await exitHangHoaCart(rawData.IdHangHoa, rawData.IdUser);

    if (exitHH) {
      const updateHH = await db.Cart.findOneAndUpdate(
        {
          _id: exitHH._id,
        },
        { $set: { SoLuong: +exitHH.SoLuong + +rawData.SoLuong } },
        { new: true }
      );
      return {
        EM: "Tạo đơn hàng thành công ",
        EC: 0,
        DT: updateHH,
      };
    }

    const data = await db.Cart.create({
      IdUser: rawData.IdUser,
      IdHangHoa: rawData.IdHangHoa,
      SoLuong: rawData.SoLuong,
    });

    if (data) {
      return {
        EM: "Tạo đơn hàng thành công ",
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

const readPanigation = async (rawData) => {
  const { page, limit, sort, IdUser } = rawData;

  try {
    if (!page && !limit && !sort) {
      const data = await db.Cart.find({ IdUser: IdUser })
        .populate({
          path: "IdUser", // Liên kết với KhachHang
          model: "KhachHang", // Tên model của KhachHang
        })
        .populate({
          path: "IdHangHoa", // Liên kết với KhachHang
          model: "HangHoa", // Tên model của KhachHang
        });

      return {
        EM: "Lấy dữ liệu thành công",
        EC: 0,
        DT: data,
      };
    }

    let offset = (page - 1) * limit;

    const filter = {};
    const sorter = {};

    if (sort?.startsWith("-")) {
      sorter[sort.substring(1)] = -1;
    } else {
      sorter[sort] = 1;
    }

    if (IdUser) {
      filter.IdUser = IdUser;
    }

    const pagination = await db.Cart.find(filter)
      .skip(offset)
      .limit(limit)
      .sort(sorter)
      .exec();

    const totalRecords = await db.Cart.countDocuments(filter);
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

const updateNumberCart = async (rawData) => {
  try {
    const cart = await db.Cart.findById({ _id: rawData.idCart });

    if (!cart) {
      return {
        EM: "Không tìm thấy idCart ! ",
        EC: -2,
        DT: [],
      };
    }

    const updateNumber = await db.Cart.findOneAndUpdate(
      { _id: rawData.idCart },
      { $set: { SoLuong: rawData.SoLuong } },
      { new: true }
    );

    return {
      EM: "Cập nhật số lượng  thành công ",
      EC: 0,
      DT: updateNumber,
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

const deletedCart = async (rawData) => {
  try {
    const exitID_Cart = await db.Cart.findById({ _id: rawData.idCart });
    if (!exitID_Cart) {
      return {
        EM: "Không tồn tại ID CART !!!",
        EC: -2,
        DT: exitID_Cart,
      };
    }

    const deletedCart = await db.Cart.findByIdAndDelete({
      _id: rawData.idCart,
    });
    return {
      EM: "Xóa sản phẩm thành công  !!!",
      EC: 0,
      DT: deletedCart,
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

export default { create, readPanigation, updateNumberCart, deletedCart };
