import mongoose from "mongoose";
const { Schema } = mongoose;

const staffSchema = new Schema(
  {
    HoTenNV: String,
    Password: String,
    ChucVu: String,
    DiaChi: String,
    SoDienThoai: String,
  },
  {
    timestamps: true,
  }
);
const NhanVien = models.staffSchema || mongoose.model("NhanVien", staffSchema);

export default NhanVien;
