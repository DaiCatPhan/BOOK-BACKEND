import OrderService from "../services/OrderService";
import CustomerController from "../controllers/CustomerController";

class OrderController {
  // [POST ] /api/v1/order/create
  async create(req, res) {
    const { DataUpdateCustomer, DataOrder } = req.body;

    

    if (
      !DataUpdateCustomer.IDCus ||
      !DataUpdateCustomer.Email ||
      !DataUpdateCustomer.HoTen ||
      !DataUpdateCustomer.SoDienThoai ||
      !DataUpdateCustomer.DiaChi
    ) {
      return res.json({
        EM: "Dữ liệu người dùng không đươc trống !!! ",
        EC: -2,
        DT: [],
      });
    }

    if (DataOrder.length <= 0) {
      return res.json({
        EM: "Không có dữ liệu trong giỏ hàng !!! ",
        EC: -2,
        DT: [],
      });
    }

    try {
      // check vaidate
      const data = await OrderService.create(req.body);
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


  async read(req, res) {
    const { ID_KhachHang } = req.query;

    if (!ID_KhachHang) {
      return res.json({
        EM: "Không có ID_KhachHang !!! ",
        EC: -2,
        DT: [],
      });
    }

    const data = await OrderService.read({ ID_KhachHang });
    if (data) {
      return res.json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    }
  }
  update(req, res) {
    return res.json("udpate Order");
  }
  delete(req, res) {
    return res.json("delete Order");
  }
}

export default new OrderController();
