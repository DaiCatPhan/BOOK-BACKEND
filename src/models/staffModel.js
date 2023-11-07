import mongoose from "mongoose";
const { Schema } = mongoose;

const staffSchema = new Schema(
  {
    Email: String,
    HoTen: String,
    Password: String,
    ChucVu: String,
    DiaChi: String,
    SoDienThoai: String,
    Role: String,
  },
  {
    timestamps: true,
  }
);
const NhanVien =  mongoose.model("NhanVien", staffSchema);

export default NhanVien;
