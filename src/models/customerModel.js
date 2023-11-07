import mongoose from "mongoose";
const { Schema } = mongoose;

const customerSchema = new Schema(
  {
    Email: String,
    HoTen: String,
    Password: String,
    DiaChi: String,
    SoDienThoai: String,
    Role: String,
  },
  {
    timestamps: true,
  }
);
const KhachHang = mongoose.model("KhachHang", customerSchema);

export default KhachHang;
