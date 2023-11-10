import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    MSKH: { type: mongoose.Types.ObjectId, ref: "KhachHang" },
    MSNV: { type: mongoose.Types.ObjectId, ref: "NhanVien" },
    NgayDH: { type: Date, default: Date.now },
    NgayGH: Date,
    TrangthaiHD: String,
  },
  {
    timestamps: true,
  }
);
const DatHang = mongoose.model("DatHang", orderSchema);

export default DatHang;
