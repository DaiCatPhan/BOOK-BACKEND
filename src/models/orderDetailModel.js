import mongoose from "mongoose";
const { Schema } = mongoose;

const orderDetailSchema = new Schema(
  {
    SoDonDH: { type: mongoose.Types.ObjectId, ref: "DatHang" },
    MSHH: { type: mongoose.Types.ObjectId, ref: "HangHoa" },
    SoLuong: Number,
    GiaDatHang: Number, 
    GiamGia: Number,
  },
  {
    timestamps: true,
  }
);
const ChiTietDatHang = mongoose.model("ChiTietDatHang", orderDetailSchema);

export default ChiTietDatHang;
