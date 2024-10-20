import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";

//NOTE: CLIENT_SENT_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");
if (formSendData) {
  formSendData.addEventListener("submit", (e) => {
    e.preventDefault();
    const content = e.target.elements.content.value;

    if (content) {
      socket.emit("CLIENT_SEND_MESSAGE", content);
      e.target.elements.content.value = "";
    }
  });
}
//END: CLIENT_SENT_MESSAGE

//NOTE: SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const myId = document.querySelector("[my-id]").getAttribute("my-id");
  const body = document.querySelector(".chat .inner-body");

  const div = document.createElement("div");
  let htmlFullName = "";

  // Nếu tin nhắn đến từ người dùng hiện tại, chỉ hiển thị nội dung
  if (myId !== data.userId) {
    div.classList.add("inner-outgoing");
  } else {
    // Nếu tin nhắn từ người khác, hiển thị tên và nội dung
    htmlFullName = `<div class="inner-name">${data.fullName}</div>`;
    div.classList.add("inner-incoming");
  }

  div.innerHTML = `
    ${htmlFullName}
    <div class="inner-content">${data.content}</div>
  `;

  body.appendChild(div);

  // Cuộn xuống cuối mỗi khi có tin nhắn mới
  body.scrollTop = body.scrollHeight;
});
//END: SERVER_RETURN_MESSAGE

// NOTE: Scroll chat to bottom
const bodyChat = document.querySelector(".chat");

if (bodyChat) {
  // Tự động cuộn xuống cuối khi trang load
  bodyChat.scrollTop = bodyChat.scrollHeight;

  // Theo dõi sự kiện để cuộn xuống khi có tin nhắn mới
  const observer = new MutationObserver(() => {
    bodyChat.scrollTop = bodyChat.scrollHeight;
  });

  // Bắt đầu quan sát sự thay đổi trong phần body chat
  observer.observe(bodyChat, { childList: true });
}
// END: Scroll chat to bottom

//NOTE: Emoji event
const buttonIcon = document.querySelector(".button-icon");
if (buttonIcon) {
  const tooltip = document.querySelector(".tooltip");
  Popper.createPopper(buttonIcon, tooltip);

  buttonIcon.onclick = () => {
    tooltip.classList.toggle("show");
  };

  document.addEventListener("click", (e) => {
    if (!tooltip.contains(e.target) && !buttonIcon.contains(e.target)) {
      tooltip.classList.remove("show");
    }
  });
}
//END: Emoji event

//NOTE: Insert Icon To Input
const emojiPicker = document.querySelector("emoji-picker");
if (emojiPicker) {
  const inputChat = document.querySelector(
    ".chat .inner-form input[name='content']"
  );
  emojiPicker.addEventListener("emoji-click", (event) => {
    const icon = event.detail.unicode;
    inputChat.value += icon;
  });
}
//END: Insert Icon To Input
