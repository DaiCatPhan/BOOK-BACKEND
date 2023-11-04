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
    TacGia: String,
    HinhHH: String,
  },
  {
    timestamps: true,
  }
);
const HangHoa = mongoose.model("HangHoa", productSchema);

export default HangHoa;
