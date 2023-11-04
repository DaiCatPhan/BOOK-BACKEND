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

const update = async (rawData) => {
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

const readAllType = async (rawData) => {
  const { type, author } = rawData;
  // try {
  //   const typeBook = await db.Product.findAll({ TheLoai: type });
  //   const authorBook = await db.Product.findAll({ author: author });
  //   const allBook = await db.Product.findAll({});

  //   const data = {}

  //   return {
  //     EM: 'Lấy dữ liệu thành công',
  //     EC : 0,
  //     DT: data,
  //   }

  // } catch (error) {
  //   console.log(">>> error", error);
  //   return {
  //     EM: " Lỗi server",
  //     EC: -5,
  //     DT: [],
  //   };
  // }
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

export default { create, readAllType, read, update, deleted };
