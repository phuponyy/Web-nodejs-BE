const categoryMiddleware = require("../../middlewares/client/category.middlewares");
const cartMiddleware = require("../../middlewares/client/cart.middlewares");

const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");
const searchRoutes = require("./search.route");
const cartRoutes = require("./cart.route");
const checkoutRoutes = require("./checkout.route");
const accountRoutes = require("./account.route");
const infoUserMiddleware = require("../../middlewares/client/account.middlewares");
const chatRoutes = require("./chat.route");
const authMiddleware = require("../../middlewares/client/auth.middlewares");

module.exports = (app) => {
  app.use(cartMiddleware.cartId);

  app.use(categoryMiddleware.category);

  app.use(infoUserMiddleware.infoUser);

  app.use("/", homeRoutes);

  app.use("/products", productRoutes);

  app.use("/search", searchRoutes);

  app.use("/cart", cartRoutes);

  app.use("/checkout", checkoutRoutes);

  app.use("/account", accountRoutes);

  app.use("/chat", authMiddleware.requireAuth, chatRoutes);
};
