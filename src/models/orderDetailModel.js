import mongoose from "mongoose";
const { Schema } = mongoose;

const orderDetailSchema = new Schema(
  {
    SoDonDH: String,
    MSHH: String,
    SoLuong: Number,
    GiaDatHang: Number,
    GiamGia: Number,
  },
  {
    timestamps: true,
  }
);
const ChiTietDatHang = mongoose.model("ChiTietDatHang", orderDetailSchema);

export default ChiTietDatHang;
