import ProductService from "../services/ProductService";
class ProductController {
  read = async (req, res) => {
    const { idProduct } = req.query;

    if (!idProduct) {
      return res.json({
        EM: "Không có id book !!!!",
        EC: -1,
        DT: [],
      });
    }

    try {
      const data = await ProductService.read(req.query);
      return res.json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (error) {
      console.log(">>> error", error);
    }
  };

  readAllType = async (req, res) => {
    // const { type , author } = req.query;
    // try {
    //   const data = await ProductService.readAllType(req.query);
    //   return res.json({
    //     EM: data.EM,
    //     EC: data.EC,
    //     DT: data.DT,
    //   });
    // } catch (error) {
    //   console.log(">>> error", error);
    // }
  };

  update = async (req, res) => {
    const { idProduct, TenHH, MoTaHH, Gia, SoLuongHang, GhiChu, TheLoai } =
      req.body;
    if (!idProduct || !TenHH || !MoTaHH || !Gia || !TheLoai) {
      return {
        EM: "Nhập thiếu trường dữ liệu !!! ",
        EC: -2,
        DT: [],
      };
    }
    try {
      // check vaidate
      const data = await ProductService.update(req.body);
      return res.json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (error) {
      console.log(">>> error", error);
    }
  };

  delete = async (req, res) => {
    const { idProduct } = req.body;

    if (!idProduct) {
      return {
        EM: "Nhập thiếu trường dữ liệu !!! ",
        EC: -2,
        DT: [],
      };
    }
    try {
      // check vaidate
      const data = await ProductService.deleted(req.body);
      return res.json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (error) {
      console.log(">>> error", error);
    }
  };

  // [POST] /api/v1/product/create
  create = async (req, res) => {
    const { TenHH, MoTaHH, Gia, SoLuongHang, GhiChu, TheLoai, TacGia } =
      req.body;

    const dataBody = {
      TenHH: TenHH,
      MoTaHH: MoTaHH,
      Gia: +Gia,
      SoLuongHang: +SoLuongHang,
      GhiChu: GhiChu,
      TheLoai: TheLoai,
      TacGia: TacGia,
    };

    const HinhHH = req?.file?.path;

    if (!HinhHH) {
      return res.json({
        EM: "Upload hình lỗi , không có hình !!! ",
        EC: -2,
        DT: [],
      });
    }

    if (!TenHH || !MoTaHH || !Gia || !TheLoai || !TacGia) {
      return res.json({
        EM: "Nhập thiếu trường dữ liệu !!! ",
        EC: -2,
        DT: [],
      });
    }
    try {
      // check vaidate
      const data = await ProductService.create(dataBody, HinhHH);
      return res.json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (error) {
      console.log(">>> error", error);
    }
  };
}

export default new ProductController();
