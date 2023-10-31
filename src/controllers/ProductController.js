class ProductController {
  read = async (req, res) => {
    res.json("read product");
  };

  create = async (req, res) => {
    res.json(req.body);
  };
}

export default new ProductController();
