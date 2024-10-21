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
      socket.emit("CLIENT_SEND_TYPING", "hidden");
    }
  });
}
//END: CLIENT_SENT_MESSAGE

//NOTE: SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const myId = document.querySelector("[my-id]").getAttribute("my-id");
  const body = document.querySelector(".chat .inner-body");
  const boxTyping = document.querySelector(".chat .inner-list-typing");

  const div = document.createElement("div");
  let htmlFullName = "";

  // Nếu tin nhắn đến từ người dùng hiện tại, chỉ hiển thị nội dung
  if (myId === data.user_id) {
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

  body.insertBefore(div, boxTyping);

  // Cuộn xuống cuối mỗi khi có tin nhắn mới
  body.scrollTop = body.scrollHeight;
});
//END: SERVER_RETURN_MESSAGE

// NOTE: Scroll chat to bottom
const bodyChat = document.querySelector(".chat");

if (bodyChat) {
  // Tự động cuộn xuống cuối khi trang load
  bodyChat.scrollTop = bodyChat.scrollHeight;
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

//NOTE: Show typing
var timeOut;
const showTyping = () => {
  socket.emit("CLIENT_SEND_TYPING", "show");

  clearTimeout(timeOut);

  timeOut = setTimeout(() => {
    socket.emit("CLIENT_SEND_TYPING", "hidden");
  }, 3000);
};
//END: Show typing

//NOTE: Insert Icon To Input
const emojiPicker = document.querySelector("emoji-picker");
if (emojiPicker) {
  const inputChat = document.querySelector(
    ".chat .inner-form input[name='content']"
  );
  emojiPicker.addEventListener("emoji-click", (event) => {
    const icon = event.detail.unicode;
    inputChat.value += icon;

    const end = inputChat.value.length;
    inputChat.setSelectionRange(end, end);
    inputChat.focus();

    showTyping();
  });

  // Typing Chat

  inputChat.addEventListener("keyup", () => {
    showTyping();
  });
  // -Typing Chat
}
//END: Insert Icon To Input

//NOTE: SERVER_RETURN_TYPING
const elementListTyping = document.querySelector(".chat .inner-list-typing");
if (elementListTyping) {
  socket.on("SERVER_RETURN_TYPING", (data) => {
    console.log(data);
    if (data.type == "show") {
      const existTyping = elementListTyping.querySelector(
        `[user-id="${data.userId}"]`
      );

      if (!existTyping) {
        const bodyChat = document.querySelector(".chat");
        const boxTyping = document.createElement("div");
        boxTyping.classList.add("box-typing");
        boxTyping.setAttribute("user-id", data.userId);

        boxTyping.innerHTML = `
          <div class="box-typing">
            <div class="inner-name">${data.fullName}</div>
            <div class="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        `;

        elementListTyping.appendChild(boxTyping);

        bodyChat.scrollTop = bodyChat.scrollHeight;
      }
    } else {
      const boxTypingRemove = elementListTyping.querySelector(
        `[user-id="${data.userId}"]`
      );

      if (boxTypingRemove) {
        elementListTyping.removeChild(boxTypingRemove);
      }
    }
  });
}
//END: SERVER_RETURN_TYPING
