import CustomerService from "../services/CustomerService";

class CustomerController {
  // [GET] /api/v1/customer/update
  async update(req, res) {
    const { Email, HoTen, SoDienThoai, DiaChi } = req.body;
    if (!Email || !HoTen || !SoDienThoai || !DiaChi) {
      return res.json({
        EM: "Nhập thiếu trường dữ liệu !!! ",
        EC: -2,
        DT: [],
      });
    }
    try {
      // check vaidate
      const data = await CustomerService.update(req.body);
      return res.json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (error) {
      console.log(">>> error", error);
    }
  }

  // [GET] /api/v1/customer/readPanigation
  async readPanigation(req, res) {
    try {
      let page = +req.query.page;
      let limit = +req.query.limit;
      let sort = req.query.sort;

      let data = await CustomerService.readPanigation(req.query);

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
}

export default new CustomerController();
