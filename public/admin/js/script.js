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
    if (inputsChecked.length > 0) {
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name=ids]");

      inputsChecked.forEach((input) => {
        const id = input.value;
        ids.push(id);
      });
      inputIds.value = ids.join(", ");

      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất 1 bản ghi!");
    }
  });
}
//END: Form Change Multi
