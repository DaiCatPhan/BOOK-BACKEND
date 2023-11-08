import mongoose from "mongoose";
const { Schema } = mongoose;

const orderDetailSchema = new Schema(
  {
    MSHH: String,
    SoLuong: Number,
    GiaDatHang: Number,
    Money: Number,
    GiamGia: Number,
  },
  {
    timestamps: true,
  }
);
const ChiTietDatHang = mongoose.model("ChiTietDatHang", orderDetailSchema);

export default ChiTietDatHang;
