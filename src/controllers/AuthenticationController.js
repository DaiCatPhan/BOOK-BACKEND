import jwt from "jsonwebtoken";
import { TokenExpiredError } from "jsonwebtoken";
import AuthenticationService from "../services/AuthenticationService";

class AuthenticationController {
  // [POST] /api/v1/authentication/register
  async register(req, res) {
    try {
      const { Email, HoTen, SoDienThoai, Password } = req.body;

      // Validate
      if (!Email || !HoTen || !SoDienThoai || !Password) {
        return res.status(200).json({
          EM: "Nhập thiếu dữ liệu !!!",
          EC: "-1",
          DT: "",
        });
      }

      // Create User
      let data = await AuthenticationService.registerNewUser(req.body);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (err) {
      return res.status(500).json({
        EM: "error server", // error message
        EC: "-5", // error code
        DT: "", // data
      });
    }
  }

  // [POST] /api/v1/authentication/login
  async login(req, res, next) {
    try {
      const { Email, Password } = req.body;

      if (!Email || !Password) {
        return res.status(200).json({
          EM: "Nhập thiếu dữ liệu !!!",
          EC: -1,
          DT: [],
        });
      }

      let data = await AuthenticationService.handleUserLogin({
        Email,
        Password,
      });

      if (data.EC === 0) {
        return res
          .cookie("token", data.DT.token, {
            sameSite: "none",
            secure: true,
            httpOnly: true,
          })
          .status(200)
          .json({ EC: 0, EM: "Login successfully!!", DT: data.DT });
      }

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

  // [GET] /api/v1/authentication/logout
  async logout(req, res, next) {
    try {
      res.cookie("token", "");
      return res
        .status(200)
        .json({ EM: "Đăng xuất thành công", EC: 0, DT: [] });
    } catch (err) {
      return res.status(500).json({ msg: "Error logout.", err: err.message });
    }
  }

  // [GET] /api/v1/authentication/getProfile
  async getProfile(req, res) {
    try {
      const token = req.cookies.token;

      console.log(">>>>>>>>.token", token);
      if (!token) {
        return res.status(200).json({
          EM: "Người dùng chưa đăng nhập",
          EC: -1,
          DT: [],
        });
      }
      const dataUser = jwt.verify(token, process.env.JWT_KEY);
      return res.status(200).json({
        EM: "Người dùng đã đăng nhập",
        EC: 0,
        DT: dataUser,
      });
    } catch (err) {
      console.log("err <<< ", err);
      return res.status(500).json({ err: err });
    }
  }
}

export default new AuthenticationController();
