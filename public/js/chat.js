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

// const form = document.getElementById("form");
// const input = document.getElementById("input");
// const messages = document.getElementById("messages");

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   if (input.value) {
//     socket.emit("CLIENT_SEND_MESSAGE", input.value);
//     input.value = "";
//   }
// });

// socket.on("SEVER_RETURN_MESSAGE", (msg) => {
//   const item = document.createElement("li");
//   item.textContent = msg;
//   messages.appendChild(item);
//   window.scrollTo(0, document.body.scrollHeight);
// });
