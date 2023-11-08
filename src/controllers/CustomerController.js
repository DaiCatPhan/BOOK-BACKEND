import CustomerService from "../services/CustomerService";

class CustomerController {
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
}

export default new CustomerController();
