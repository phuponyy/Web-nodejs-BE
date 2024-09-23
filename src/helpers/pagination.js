module.exports = (objectPagination, query, countProduct) => {
  let maxPagesToShow = 5;
  let halfPagesToShow = Math.floor(maxPagesToShow / 2);

  // Tính toán tổng số trang
  const totalPage = Math.ceil(countProduct / objectPagination.limitItems);
  objectPagination.totalPage = totalPage;

  // Cập nhật trang hiện tại từ query
  if (query.page) {
    objectPagination.currentPage = parseInt(query.page);
  }

  if (objectPagination.currentPage > objectPagination.totalPage) {
    objectPagination.currentPage = objectPagination.totalPage;
  }

  // Kiểm tra nếu trang hiện tại không hợp lệ
  if (
    isNaN(objectPagination.currentPage) || // Không phải là số
    objectPagination.currentPage < 1 || // Nhỏ hơn 1
    objectPagination.currentPage > totalPage // Lớn hơn tổng số trang
  ) {
    objectPagination.currentPage = 1; // Mặc định về trang 1
  }

  // Cập nhật số trang bỏ qua cho truy vấn
  objectPagination.skip =
    (objectPagination.currentPage - 1) * objectPagination.limitItems;

  // Tính toán các trang bắt đầu và kết thúc
  objectPagination.startPage = Math.max(
    1,
    objectPagination.currentPage - halfPagesToShow
  );
  objectPagination.endPage = Math.min(
    totalPage,
    objectPagination.currentPage + halfPagesToShow
  );

  // Điều chỉnh startPage và endPage nếu không đủ trang hiển thị
  if (
    objectPagination.endPage - objectPagination.startPage + 1 <
    maxPagesToShow
  ) {
    if (objectPagination.startPage === 1) {
      objectPagination.endPage = Math.min(maxPagesToShow, totalPage);
    } else if (objectPagination.endPage === totalPage) {
      objectPagination.startPage = Math.max(1, totalPage - maxPagesToShow + 1);
    }
  }

  return objectPagination;
};
