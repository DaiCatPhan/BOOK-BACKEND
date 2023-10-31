import mongoose from "mongoose";
const { Schema } = mongoose;

const customerSchema = new Schema(
  {
    HoTenKH: String,
    Password: String,
    DiaChi: String,
    SoDienThoai: String,
  },
  {
    timestamps: true,
  }
);
const KhachHang =
  models.customerSchema || mongoose.model("KhachHang", customerSchema);

export default KhachHang;
