import mongoose from "mongoose";
const { Schema } = mongoose;

const orderDetailSchema = new Schema(
  {
    SoDH: String,
    MSHH: String,
    SoLuong: Number,
    GiaDatHang: Number,
    GiamGia: Number,
  },
  {
    timestamps: true,
  }
);
const ChiTietDatHang =
  models.orderDetailSchema ||
  mongoose.model("ChiTietDatHang", orderDetailSchema);

export default ChiTietDatHang;
