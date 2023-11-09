import CartService from "../services/CartService";

class CartController {
  // [POST] /api/v1/cart/create

  async create(req, res) {
    const { IdUser, IdHangHoa, SoLuong  } = req.body;
    if (!IdUser || !IdHangHoa || !SoLuong  ) {
      return res.json({
        EM: "Nhập thiếu trường dữ liệu !!! ",
        EC: -2,
        DT: [],
      });
    }

    try {
      // check vaidate
      const data = await CartService.create(req.body);
      return res.json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (error) {
      console.log(">>> error", error);
    }
  }

  // [GET] /api/v1/cart/readPanigation
  async readPanigation(req, res) {
    try {
      let page = +req.query.page;
      let limit = +req.query.limit;
      let sort = req.query.sort;
      let IdUser = req.query.IdUser;

      let data = await CartService.readPanigation(req.query);

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
  }

  // [PATCH] /api/v1/cart/update
  async update(req, res) {
    const { idCart, SoLuong } = req.body;
    if (!idCart || !SoLuong) {
      return res.json({
        EM: "Thiếu dữ liệu  !!!!",
        EC: -1,
        DT: [],
      });
    }
    try {
      // check vaidate
      const data = await CartService.updateNumberCart(req.body);
      return res.json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (error) {
      console.log(">>> error", error);
    }
  }

  // [DELETE] /api/v1/cart/delete
  async delete(req, res) {
    const { idCart } = req.body;
    if (!idCart) {
      return res.json({
        EM: "Thiếu dữ liệu  !!!!",
        EC: -1,
        DT: [],
      });
    }
    try {
      // check vaidate
      const data = await CartService.deletedCart(req.body);
      return res.json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (error) {
      console.log(">>> error", error);
    }
  }
}

export default new CartController();
