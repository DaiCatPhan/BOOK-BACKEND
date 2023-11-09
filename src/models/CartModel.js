import mongoose from "mongoose";
const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    IdUser: String,
    IdHangHoa: String,
    SoLuong: Number,
  },
  {
    timestamps: true,
  }
);
const VoHang = mongoose.model("VoHang", cartSchema);

export default VoHang;