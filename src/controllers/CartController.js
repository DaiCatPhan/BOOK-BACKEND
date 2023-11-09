import CartService from "../services/CartService";

class CartController {
  async create(req, res) {
    const { IdUser, IdHangHoa, SoLuong, Gia } = req.body;
    if (!IdUser || !IdHangHoa || !SoLuong || !Gia) {
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
  readPanigation(req, res) {
    return res.json("readPanigation");
  }
  read(req, res) {
    return res.json("read");
  }
  update(req, res) {
    const { idCart, SoLuong } = req.body;
    return res.json("udpate Order");
  }
  delete(req, res) {
    return res.json("delete Order");
  }
}

export default new CartController();
