// NOTE: Chức năng gửi yêu cầu
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend");
if (listBtnAddFriend) {
  listBtnAddFriend.forEach((button) => {
    button.addEventListener("click", () => {
      const buttonAddClass = button.closest(".box-user");
      buttonAddClass.classList.add("add");

      const userId = button.getAttribute("btn-add-friend");

      socket.emit("CLIENT_ADD_FRIEND", userId);
    });
  });
}
// END: Chức năng gửi yêu cầu

// NOTE: Chức năng Huỷ gửi yêu cầu
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend");
if (listBtnCancelFriend) {
  listBtnCancelFriend.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".box-user").classList.remove("add");

      const userId = button.getAttribute("btn-cancel-friend");

      socket.emit("CLIENT_CANCEL_FRIEND", userId);
    });
  });
}
// END: Chức năng Huỷ gửi yêu cầu
