import db from "../models/index.js";
import CustomerController from "../controllers/CustomerController.js";

const create = async (rawData) => {
  try {
    // Cập nhật thông tin người dùng
    // Email , SoDienThoai,HoTen,DiaChi

    // const updateCus = CustomerController.update({
    //   Email: rawData.Email,
    //   HoTen: rawData.DataUdateCustomer.HoTen,
    //   SoDienThoai: rawData.DataUdateCustomer.SoDienThoai,
    //   DiaChi: rawData.DataUdateCustomer.DiaChi,
    // });

    // if (!updateCus) {
    //   return {
    //     EM: "Cập nhật người dùng thất bại , không thể đặt hàng !!!",
    //     EC: -2,
    //     DT: updateCus,
    //   };
    // }

    // Tạo đặt hàng
    const data = await db.Order.create({
      MSKH: rawData.Email,
      MSNV: "",
      NgayDH: "",
      NgayGH: "",
      Money: 0,
      TrangthaiHD: 0,
    });
    // Tạo chi tiết đặt hàng
    if (data._id) {
    }

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

export default { create };
