import OrderService from "../services/OrderService";
import CustomerController from "../controllers/CustomerController";

class OrderController {
  async create(req, res) {
    const { Email, DataUdateCustomer , DataOrder } = req.body;

    if (!Email) {
      return res.json({
        EM: "Nhập thiếu trường dữ liệu !!! ", 
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
  read(req, res) {
    return res.json("read");
  }
  update(req, res) {
    return res.json("udpate Order");
  }
  delete(req, res) {
    return res.json("delete Order");
  }
}

export default new OrderController();
