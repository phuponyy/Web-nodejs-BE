const Cart = require("../../models/cart.model");

module.exports.cartId = async (req, res, next) => {
  //   console.log(req.cookies.cartId);

  if (!req.cookies.cartId) {
    const cart = new Cart();
    await cart.save();

    const expiresCookie = 1000 * 60 * 60 * 24 * 365;

    res.cookie("cartId", cart.id, {
      expires: new Date(Date.now() + expiresCookie),
    });
  } else {
    const cart = await Cart.findOne({
      _id: req.cookies.cartId,
    });

    if (!cart) {
      return next();
    }

    if (req.user) {
      // Nếu người dùng đã đăng nhập, xóa trường expireAt
      cart.expireAt = undefined; // Xóa expireAt
      await cart.save();
      console.log(`Đã xóa expireAt cho giỏ hàng: ${cartId}`);
    } else {
      // Nếu người dùng chưa đăng nhập, giữ expireAt để xóa sau 2 phút
      const timeElapsed = Date.now() - new Date(cart.createdAt).getTime();
      const expiresTime = 1000 * 60 * 2;

      if (timeElapsed > expiresTime && !cart.user_id) {
        await Cart.deleteOne({ _id: cart._id });
        res.clearCookie("cartId"); // Xóa cookie khi giỏ hàng đã bị xóa
        console.log(
          `Đã xóa giỏ hàng: ${cart._id} sau 2 phút không có user_id.`
        );
      }
    }

    cart.totalQuantity = cart.products.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    res.locals.miniCart = cart;
  }
  next();
};
