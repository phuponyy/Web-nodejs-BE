const User = require("../../models/users.model");
const Product = require("../../models/product.model");
const Category = require("../../models/product-category.model");
const Account = require("../../models/account.model");
const os = require("os");

// NOTE: [GET] /admin/dashboard
module.exports.dashboard = async (req, res) => {
  const totalAccounts = await Account.countDocuments();
  const totalProducts = await Product.countDocuments();
  const accounts = await Account.find();

  // Example: Getting a breakdown of active and inactive users
  const activeUsers = await User.countDocuments({ status: "active" });
  const inactiveUsers = await User.countDocuments({ status: "inactive" });

  // Fetch all product categories
  const categories = await Category.find({ deleted: false }).sort({
    position: 1,
  });

  // Get product counts for each category
  const productCounts = await Product.aggregate([
    { $group: { _id: "$product_category_id", count: { $sum: 1 } } },
  ]);

  // Create a mapping of category ID to product count
  const productCountMap = {};
  productCounts.forEach((item) => {
    productCountMap[item._id] = item.count;
  });

  // Prepare data for the chart
  const labels = categories.map((category) => category.title);
  const counts = categories.map(
    (category) => productCountMap[category._id] || 0
  ); // Default to 0 if no products

  // Gather system metrics
  const totalMemory = os.totalmem(); // Total memory in bytes
  const freeMemory = os.freemem(); // Free memory in bytes
  const usedMemory = totalMemory - freeMemory; // Used memory
  const uptime = os.uptime(); // System uptime in seconds
  const cpuLoad = os.loadavg()[0]; // Average CPU load over the last minute

  res.render("admin/pages/dashboard", {
    pageTitle: "Trang tổng quan",
    totalAccounts, // Pass total accounts count
    totalProducts, // Pass total products count
    accounts, // Pass the list of accounts
    activeUsers, // Pass the active users count
    inactiveUsers, // Pass the inactive users count
    labels,
    counts,
    totalMemory,
    freeMemory,
    usedMemory,
    uptime,
    cpuLoad,
    accounts: await User.find({}),
  });
};
