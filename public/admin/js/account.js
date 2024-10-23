//NOTE: Account Delete
const buttonsDelete = document.querySelectorAll("[button-delete]");
if (buttonsDelete.length > 0) {
  const formDeleteItem = document.querySelector("#form-delete-status");
  const path = formDeleteItem.getAttribute("data-path");

  buttonsDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Bạn có chắc muốn xoá tài khoản này không");

      if (isConfirm) {
        const id = button.getAttribute("data-id");

        const action = `${path}/${id}?_method=PATCH`;

        formDeleteItem.action = action;
        formDeleteItem.submit();
      }
    });
  });
}
//END: Account Delete
