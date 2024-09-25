//NOTE: Change Status
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if (buttonsChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-path");

  buttonsChangeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");

      let statusChange = statusCurrent == "active" ? "inactive" : "active";

      const action = path + `/${statusChange}/${id}?_method=PATCH`;

      formChangeStatus.action = action;

      formChangeStatus.submit();
    });
  });
}
//END: Change Status

//NOTE: button-delete
const buttonsDelete = document.querySelectorAll("[button-delete]");
if (buttonsDelete.length > 0) {
  const formDeleteItem = document.querySelector("#form-delete-status");
  const path = formDeleteItem.getAttribute("data-path");

  buttonsDelete.forEach((button) => {
    const currentPath = window.location.pathname;
    button.addEventListener("click", () => {
      const message = currentPath.includes("admin/products/trash")
        ? "Bạn có chắc muốn khôi phục lại sản phẩm này không?"
        : "Bạn có chắc muốn xoá không?";
      const isConfirm = confirm(message);

      if (isConfirm) {
        const id = button.getAttribute("data-id");

        const action = `${path}/${id}?_method=PATCH`;

        // console.log(action);
        formDeleteItem.action = action;
        formDeleteItem.submit();
      }
    });
  });
}
//END: button-delete

//NOTE: button-restore
const buttonsRestore = document.querySelectorAll("[button-restore]");
if (buttonsRestore.length > 0) {
  const formRestore = document.querySelector("#form-restore-status");
  const path = formRestore.getAttribute("data-path");

  buttonsRestore.forEach((button) => {
    const currentPath = window.location.pathname;
    button.addEventListener("click", () => {
      const message = currentPath.includes("admin/products/trash")
        ? "Bạn có chắc muốn khôi phục lại sản phẩm này không?"
        : "Bạn có chắc muốn xoá không?";
      const isConfirm = confirm(message);

      if (isConfirm) {
        const id = button.getAttribute("data-id");

        const action = `${path}/${id}?_method=PATCH`;

        // console.log(action);
        formRestore.action = action;
        formRestore.submit();
      }
    });
  });
}
//END: button-restore

//NOTE: button-deletef
const buttonsDeletef = document.querySelectorAll("[button-delete-f]");
if (buttonsDeletef.length > 0) {
  buttonsDeletef.forEach((button) => {
    const formDeletef = document.querySelector("#form-delete-f");
    const path = formDeletef.getAttribute("data-path");

    button.addEventListener("click", () => {
      const isConfirm = confirm(
        "Bạn có chắc muốn xoá vĩnh viễn sản phẩm này không?"
      );
      if (isConfirm) {
        isConfirm;
        const id = button.getAttribute("data-id");
        const action = `${path}/${id}?_method=DELETE`;

        formDeletef.action = action;
        formDeletef.submit();
      }
    });
  });
}
//END: button-deletef
