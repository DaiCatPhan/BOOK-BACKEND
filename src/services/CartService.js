import db from "../models/index.js";
import CartController from "../controllers/CartController.js";

const exitHangHoaCart = async (idHangHoa, idUser) => {
  const HangHoa = await db.Cart.findOne({
    IdHangHoa: idHangHoa,
    idUser: idUser,
  });
  return HangHoa;
};

const create = async (rawData) => {
  try {
    const exitHH = await exitHangHoaCart(rawData.IdHangHoa, rawData.idUser);

    if (exitHH) {
      const updateHH = await db.Cart.findOneAndUpdate(
        {
          _id: exitHH._id,
        },
        {
          SoLuong: +exitHH.SoLuong + +rawData.SoLuong,
          Money: (+exitHH.SoLuong + +rawData.SoLuong) * +exitHH.Gia,
        },
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
      Gia: rawData.Gia,
      Money: rawData.SoLuong * rawData.Gia,
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



export default { create };
