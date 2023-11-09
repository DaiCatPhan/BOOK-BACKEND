import mongoose from "mongoose";
const { Schema } = mongoose;

const cartSchema = new Schema(
  {
    IdUser: { type: Schema.Types.ObjectId, ref: "KhachHang" },
    IdHangHoa: { type: Schema.Types.ObjectId, ref: "HangHoa" },
    SoLuong: Number,
  },
  {
    timestamps: true,
  }
);
const VoHang = mongoose.model("VoHang", cartSchema);

export default VoHang;
