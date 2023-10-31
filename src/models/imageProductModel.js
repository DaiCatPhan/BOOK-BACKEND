import mongoose from "mongoose";
const { Schema } = mongoose;

const imageProductSchema = new Schema(
  {
    TenHinh: String,
    MSHH: String,
  },
  {
    timestamps: true,
  }
);
const HinhHH =
  models.imageProductSchema || mongoose.model("HinhHH", imageProductSchema);

export default HinhHH;
