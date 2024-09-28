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

//NOTE: Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputsID = checkboxMulti.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputsID.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputsID.forEach((input) => {
        input.checked = false;
      });
    }
  });

  inputsID.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll(
        "input[name='id']:checked"
      ).length;

      if (countChecked == inputsID.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
//END: Checkbox Multi

//NOTE: Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();

    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const inputsChecked = checkboxMulti.querySelectorAll(
      "input[name='id']:checked"
    );
    const typeChange = e.target.elements.type.value;
    const currentPath = window.location.pathname;
    if (typeChange == "delete-all" || typeChange == "restore-all") {
      const message = currentPath.includes("admin/products/trash")
        ? "Bạn có chắc muốn khôi phục lại sản phẩm này không?"
        : "Bạn có chắc muốn xoá những sản phẩm này không?";
      const isConfirm = confirm(message);
      if (!isConfirm) {
        return;
      }
    }

    if (inputsChecked.length > 0) {
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name=ids]");

      inputsChecked.forEach((input) => {
        const id = input.value;
        if (typeChange == "change-position") {
          const position = input
            .closest("tr")
            .querySelector("input[name=position]").value;

          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });

      if (typeChange == "restore-all") {
        // Chỉ lấy các id đã được chọn (đã check)
        inputsChecked.forEach((input) => {
          ids.push(input.value);
        });
      }

      inputIds.value = ids.join(", ");

      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất 1 bản ghi!");
    }
  });
}
//END: Form Change Multi

//NOTE: show alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"), 10) || 3000;
  const closeAlert = showAlert.querySelector("[close-alert]");
  setTimeout(() => {
    showAlert.classList.add("alert-hidden");

    // Set display: none after the animation (0.5s)
    setTimeout(() => {
      showAlert.style.display = "none";
    }, 500); // Match the animation duration (500ms)
  }, time);

  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
//END: end show alert
