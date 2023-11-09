import productRouter from "./productRouter";
import authenticationRouter from "./authentication";
import orderRotuer from "./orderRouter";
import customerRouter from "./customerRouter";
import cartRouter from "./cartRouter";

function route(app) {
  app.use("/api/v1/cart", cartRouter);
  app.use("/api/v1/customer", customerRouter);
  app.use("/api/v1/order", orderRotuer);
  app.use("/api/v1/product", productRouter);
  app.use("/api/v1/authentication", authenticationRouter);
}

export default route;
