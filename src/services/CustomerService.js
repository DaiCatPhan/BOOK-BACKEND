import db from "../models/index.js";

const existCustomerByEmail = async (email) => {
  const Customer = await db.Customer.findOne({
    Email: email,
  });
  if (Customer) {
    return true;
  } else {
    return false;
  }
};

const update = async (rawData) => {
  try {
    const existCus = await existCustomerByEmail(rawData.Email);
    if (!existCus) {
      return {
        EM: "Người dùng không tồn tại !!! ",
        EC: -2,
        DT: [],
      };
    }

    const data = await db.Customer.findOneAndUpdate(
      { Email: rawData.Email },
      {
        HoTen: rawData.HoTen,
        SoDienThoai: rawData.SoDienThoai,
        DiaChi: rawData.DiaChi,
      },
      { new: true }
    );

    if (data) {
      return {
        EM: "Update sản phẩm thành công ",
        EC: 0,
        DT: data,
      };
    }

    if (data) {
      return {
        EM: "Tạo sản phẩm thành công ",
        EC: 0,
        DT: data,
      };
    }
  } catch (error) {
    console.log(">>> error", error);
    return {
      EM: " Lỗi server",
      EC: -5,
      DT: [],
    };
  }
};

const readPanigation = async (rawData) => {
  const { page, limit, sort } = rawData;

  try {
    if (!page && !limit && !sort) {
      const data = await db.Customer.find({});
      return {
        EM: "Lấy dữ liệu thành công",
        EC: 0,
        DT: data,
      };
    }

    let offset = (page - 1) * limit;

    const filter = {};
    const sorter = {};

    if (sort?.startsWith("-")) {
      sorter[sort.substring(1)] = -1;
    } else {
      sorter[sort] = 1;
    }

    const pagination = await db.Customer.find(filter)
      .skip(offset)
      .limit(limit)
      .sort(sorter)
      .exec();

    const totalRecords = await db.Customer.countDocuments(filter);
    const meta = {
      current: page,
      pageSize: limit,
      pages: Math.ceil(totalRecords / limit),
      total: totalRecords,
    };
    const data = { pagination, meta };
    return {
      EM: "Lấy dữ liệu thành công",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(">>> error", error);
    return {
      EM: " Lỗi server",
      EC: -5,
      DT: [],
    };
  }
};

const deleted = async (rawData) => {
  try {
    const existCus = await existCustomerByEmail(rawData.Email);
    if (!existCus) {
      return {
        EM: "Người dùng không tồn tại !!! ",
        EC: -2,
        DT: [],
      };
    }

    const data = await db.Customer.findOneAndUpdate(
      { Email: rawData.Email },
      {
        HoTen: rawData.HoTen,
        SoDienThoai: rawData.SoDienThoai,
        DiaChi: rawData.DiaChi,
      },
      { new: true }
    );

    if (data) {
      return {
        EM: "Update sản phẩm thành công ",
        EC: 0,
        DT: data,
      };
    }

    if (data) {
      return {
        EM: "Tạo sản phẩm thành công ",
        EC: 0,
        DT: data,
      };
    }
  } catch (error) {
    console.log(">>> error", error);
    return {
      EM: " Lỗi server",
      EC: -5,
      DT: [],
    };
  }
};

const read = async (rawData) => {
  try {
    const existCus = await existCustomerByEmail(rawData.Email);
    if (!existCus) {
      return {
        EM: "Người dùng không tồn tại !!! ",
        EC: -2,
        DT: [],
      };
    }

    const data = await db.Customer.findOneAndUpdate(
      { Email: rawData.Email },
      {
        HoTen: rawData.HoTen,
        SoDienThoai: rawData.SoDienThoai,
        DiaChi: rawData.DiaChi,
      },
      { new: true }
    );

    if (data) {
      return {
        EM: "Update sản phẩm thành công ",
        EC: 0,
        DT: data,
      };
    }

    if (data) {
      return {
        EM: "Tạo sản phẩm thành công ",
        EC: 0,
        DT: data,
      };
    }
  } catch (error) {
    console.log(">>> error", error);
    return {
      EM: " Lỗi server",
      EC: -5,
      DT: [],
    };
  }
};

export default { update, readPanigation };
