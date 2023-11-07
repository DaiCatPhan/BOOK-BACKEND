import productRouter from "./productRouter";
import authenticationRouter from "./authentication";

function route(app) {
  app.use("/api/v1/product", productRouter);
  app.use("/api/v1/authentication", authenticationRouter);
}

export default route;
