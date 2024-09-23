//NOTE: Button Status
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
  let url = new URL(window.location.href);

  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");

      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }

      window.location.href = url.href;
    });
  });
}
//END: End Button Status

//NOTE: Form Search
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;

    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }

    window.location.href = url.href;
  });
}
//END: Form Search

//NOTE: Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination) {
  let url = new URL(window.location.href);
  buttonPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      const totalPage = button.getAttribute("button-pagTotal");

      // Nếu page là NaN hoặc âm, đặt lại thành 1
      if (isNaN(page) || page <= 0) {
        url.searchParams.set("page", 1);
      } else {
        // Nếu page lớn hơn totalPage, đặt về totalPage
        url.searchParams.set("page", Math.min(totalPage, page));
      }

      window.location.href = url.href;
    });
  });
}
//END: Pagination
