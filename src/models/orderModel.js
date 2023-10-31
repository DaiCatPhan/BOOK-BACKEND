import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    MSKH: String,
    MSNV: String,
    NGAYDH: String,
    NGAYGH: String,
    TrangThaiHD: String,
  },
  {
    timestamps: true,
  }
);
const DatHang = models.orderSchema || mongoose.model("DatHang", orderSchema);

export default DatHang;
