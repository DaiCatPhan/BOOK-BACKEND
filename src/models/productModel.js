import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    TenHH: String,
    MoTaHH: String,
    Gia: Number,
    SoLuongHang: Number,
    GhiChu: String,
    TheLoai: String,
  },
  {
    timestamps: true,
  }
);
const HangHoa =
  models.productSchema || mongoose.model("HangHoa", productSchema);

export default HangHoa;
