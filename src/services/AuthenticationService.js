import db from "../models/index.js";
import jwt from "jsonwebtoken";
import bcrypt, { genSaltSync } from "bcrypt";
const salt = genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compare(inputPassword, hashPassword);
};

const checkEmailExits = async (userEmail) => {
  let user = null;

  user = await db.Staff.findOne({
    Email: userEmail,
  });

  if (user === null) {
    user = await db.Customer.findOne({
      Email: userEmail,
    });
  }

  if (user === null) {
    return false;
  }
  return true; //  Email có tồn tại
};

const checkPhoneExits = async (phone) => {
  let user = null;

  user = await db.Staff.findOne({
    SoDienThoai: phone,
  });

  if (user === null) {
    user = await db.Customer.findOne({
      SoDienThoai: phone,
    });
  }

  if (user === null) {
    return false;
  }
  return true; //  Email có tồn tại
};

const registerNewUser = async (rawUserData) => {
  const { Email, HoTen, SoDienThoai, Password } = rawUserData;
  // B1. kiểm tra email  -> B2. hashpassword -> B3. create new user
  try {
    // B1
    let isEmailExits = await checkEmailExits(Email);
    let isPhoneExits = await checkPhoneExits(SoDienThoai);

    if (isEmailExits === true) {
      return {
        EM: "Email đã tồn tại !!!",
        EC: -1,
        DT: [],
      };
    }
    if (isPhoneExits === true) {
      return {
        EM: "Số điện thoại đã tồn tại !!!",
        EC: -1,
        DT: [],
      };
    }

    // B2
    let hashPassword = hashUserPassword(Password);

    // B3
    const customer = await db.Customer.create({
      Email: Email,
      HoTen: HoTen,
      SoDienThoai: SoDienThoai,
      Password: hashPassword,
      Role: "khach_hang",
    });

    if (customer) {
      return {
        EM: "Tạo tài khoản thành công",
        EC: 0,
        DT: customer,
      };
    }
  } catch (err) {
    console.log(">>> err ", err);
    return {
      EM: "Loi server !!!",
      EC: -2,
    };
  }
};

const getUserLoginWithEmail = async (email) => {
  let user = null;
  user = await db.Staff.findOne({
    Email: email,
  });

  if (user === null) {
    user = await db.Customer.findOne({
      Email: email,
    });
  }

  return user;
};

const handleUserLogin = async (rawData) => {
  const { Email, Password } = rawData;
  try {
    let user = await getUserLoginWithEmail(Email);

    if (user === null) {
      return {
        EM: "Email không đúng !!!",
        EC: -2,
        DT: "",
      };
    }

    let isCorrectPassword = await checkPassword(Password, user.Password);

    if (isCorrectPassword === true) {
      let tokentData = {
        Id: user._id,
        HoTen: user.HoTen,
        Email: user.Email,
        Role: user.Role,
        SoDienThoai: user.SoDienThoai,
      };
      const token = jwt.sign(tokentData, process.env.JWT_KEY);

      return {
        EM: "ok",
        EC: 0,
        DT: {
          token,
          tokentData,
        },
      };

      // Tiếp tục
    } else {
      return {
        EM: " Mật khẩu sai !!!",
        EC: -2,
        DT: "",
      };
    }
  } catch (err) {
    console.log(">>> err", err);
    return {
      EM: "Loi server !!!",
      EC: -2,
      DT: "",
    };
  }
};

export default { registerNewUser, handleUserLogin };
