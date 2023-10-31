class HomeController {
  getHomePage(req, res) {
    res.json("getHomePage");
  }
}

export default new HomeController();
