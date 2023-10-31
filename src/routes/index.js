import productRouter from "./productRouter";

function route(app) {
  app.use("/api/v1/product", productRouter);
}

export default route;
