const Chat = require("../../models/chat.model");
const User = require("../../models/users.model");

module.exports.index = async (req, res) => {
  const userId = res.locals.user.id;
  const fullName = res.locals.user.fullName;

  //NOTE: Socket.io
  _io.once("connection", (socket) => {
    socket.on("CLIENT_SEND_MESSAGE", async (content) => {
      const chat = new Chat({
        user_id: userId,
        content: content,
      });
      await chat.save();

      // Tả data về client
      _io.emit("SERVER_RETURN_MESSAGE", {
        user_id: userId,
        fullName: fullName,
        content: content,
      });
    });

    // Typing Chat
    socket.on("CLIENT_SEND_TYPING", async (type) => {
      socket.broadcast.emit("SERVER_RETURN_TYPING", {
        userId: userId,
        fullName: fullName,
        type: type,
      });
    });
    // -Typing Chat
  });
  //END: Socket.io

  //NOTE: Lấy data từ database
  const chats = await Chat.find({
    deleted: false,
  });

  for (const chat of chats) {
    const infoUser = await User.findOne({
      _id: chat.user_id,
    }).select("fullName avatar");

    chat.infoUser = infoUser;
  }
  //END: Lấy data từ database

  res.render("client/pages/chat", {
    pageTitle: "Trang chat",
    chats: chats,
  });
};
