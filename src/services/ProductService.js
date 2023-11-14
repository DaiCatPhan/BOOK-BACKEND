import db from "../models/index.js";

const existProductByName = async (name) => {
  const product = await db.Product.findOne({
    TenHH: name,
  });
  if (product) {
    return true;
  } else {
    return false;
  }
};

const existProductById = async (id) => {
  const product = await db.Product.findById(id);
  if (product) {
    return true;
  } else {
    return false;
  }
};

const getProductById = async (id) => {
  const product = await db.Product.findOne({
    _id: id,
  });
  return product;
};

const create = async (rawData, HinhHH) => {
  try {
    const existProdut = await existProductByName(rawData?.TenHH);
    if (existProdut) {
      return {
        EM: "Têm sản phẩm đã tồn tại !!! ",
        EC: -2,
        DT: [],
      };
    }

    const data = await db.Product.create({
      TenHH: rawData.TenHH,
      MoTaHH: rawData.MoTaHH,
      Gia: rawData.Gia,
      SoLuongHang: rawData.SoLuongHang,
      GhiChu: rawData.GhiChu,
      TheLoai: rawData.TheLoai,
      HinhHH: HinhHH,
      TacGia: rawData.TacGia,
    });

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

const update = async (rawData, HinhHH) => {
  try {
    const existProdut = await existProductById(rawData?.idProduct);
    if (!existProdut) {
      return {
        EM: "Sản phẩm không tồn tại !!! ",
        EC: -2,
        DT: [],
      };
    }

    const data = await db.Product.findByIdAndUpdate(
      rawData.idProduct,
      {
        TenHH: rawData.TenHH,
        MoTaHH: rawData.MoTaHH,
        Gia: rawData.Gia,
        SoLuongHang: rawData.SoLuongHang,
        GhiChu: rawData.GhiChu,
        TheLoai: rawData.TheLoai,
        HinhHH: HinhHH,
        TacGia: rawData.TacGia,
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
  } catch (error) {
    console.log(">>> error", error);
    return {
      EM: " Lỗi server",
      EC: -5,
      DT: [],
    };
  }
};

const getBookWithPagination = async (rawData) => {
  const { page, limit, sort, type, author } = rawData;

  try {
    if (!page && !limit && !sort && !type && !author) {
      const data = await db.Product.find({});
      return {
        EM: "Lấy dữ liệu thành công",
        EC: 0,
        DT: data,
      };
    }

    let offset = (+page - 1) * limit;

    const filter = {};
    const sorter = {};

    if (sort?.startsWith("-")) {
      sorter[sort.substring(1)] = -1;
    } else {
      sorter[sort] = 1;
    }

    if (author) {
      filter.TacGia = author;
    }

    if (type) {
      filter.TheLoai = type;
    }

    console.log("Kiem tra >>>>>>>>>>>", offset, limit);

    const pagination = await db.Product.find(filter)
      .skip(offset)
      .limit(limit)
      .sort(sorter)
      .exec();

    const totalRecords = await db.Product.countDocuments(filter);
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

const read = async (rawData) => {
  try {
    const exitProduct = await existProductById(rawData.idProduct);
    if (!exitProduct) {
      return {
        EM: "Không tồn tại sản phẩm !!!",
        EC: -3,
        DT: [],
      };
    }
    const product = await getProductById(rawData.idProduct);
    if (product) {
      return {
        EM: "Lấy sản phẩm thành công",
        EC: 0,
        DT: product,
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

const deleted = async (rawData) => {
  try {
    const exitProduct = await existProductById(rawData.idProduct);
    if (!exitProduct) {
      return {
        EM: "Không tồn tại sản phẩm !!!",
        EC: -3,
        DT: [],
      };
    }

    const deleted = await db.Product.findByIdAndDelete({
      _id: rawData?.idProduct,
    });

    if (deleted) {
      return {
        EM: "Xóa sản phẩm thành công",
        EC: 0,
        DT: deleted,
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

export default { create, getBookWithPagination, read, update, deleted };
