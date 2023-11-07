import ProductService from "../services/ProductService";
class ProductController {
  // [GET] /api/v1/product/read
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

  // [GET] /api/v1/product/readPanigate
  readPanigate = async (req, res) => {
    try {
      let page = +req.query.page;
      let limit = +req.query.limit;
      let sort = req.query.sort;
      let type = req.query.type;
      let author = req.query.author;

      let data = await ProductService.getBookWithPagination(req.query);

      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (err) {
      console.log("err <<< ", err);
      return res.status(500).json({
        EM: "error server", // error message
        EC: "-1", // error code
        DT: "", // data
      });
    }
    // }
  };

  // [PUT] /api/v1/product/update
  update = async (req, res) => {
    const {
      idProduct,
      TenHH,
      MoTaHH,
      Gia,
      SoLuongHang,
      GhiChu,
      TheLoai,
      TacGia,
    } = req.body;

    const HinhHH = req?.file?.path || req.body.HinhHH;

    if (
      !idProduct ||
      !TenHH ||
      !MoTaHH ||
      !Gia ||
      !TheLoai ||
      !TacGia ||
      !SoLuongHang
    ) {
      return res.json({
        EM: "Nhập thiếu trường dữ liệu !!! ",
        EC: -2,
        DT: [],
      });
    }

    try {
      // check vaidate
      const data = await ProductService.update(req.body, HinhHH);
      return res.json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (error) {
      console.log(">>> error", error);
    }
  };

  // [DELETE] /api/v1/product/delete
  delete = async (req, res) => {
    const { idProduct } = req.body;
    if (!idProduct) {
      return res.json({
        EM: "Nhập thiếu trường dữ liệu !!! ",
        EC: -2,
        DT: [],
      });
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
