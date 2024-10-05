//NOTE: button-delete
const buttonsDelete = document.querySelectorAll("[button-delete]");
if (buttonsDelete.length > 0) {
  const formDeleteItem = document.querySelector("#form-delete");
  const path = formDeleteItem.getAttribute("data-path");
  buttonsDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const ifConfirm = confirm("Bạn có chắc muốn xoá không?");
      if (ifConfirm) {
        const id = button.getAttribute("data-id");
        const action = `${path}/${id}?_method=DELETE`;

        formDeleteItem.action = action;
        formDeleteItem.submit();
      }
    });
  });
}
//END: button-delete
