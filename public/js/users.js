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
