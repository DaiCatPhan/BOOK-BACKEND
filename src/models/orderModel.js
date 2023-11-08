import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    MSKH: String,
    MSNV: String,
    NgayDH: String,
    NgayGH: String,
    TrangthaiHD: String,
    Money: Number,
  },
  {
    timestamps: true,
  }
);
const DatHang = mongoose.model("DatHang", orderSchema);

export default DatHang;
