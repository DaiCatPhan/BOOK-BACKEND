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
      MSKH: DataUpdateCustomer.Email,
      MSNV: "",
      NgayDH: "",
      NgayGH: "",
      Money: 0,
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

    console.log("deleteItemCart", deleteItemCart);

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

export default { create };
