const Chat = require("../../models/chat.model");
const User = require("../../models/users.model");

const chatSocket = require("../../sockets/client/chat.socket");

module.exports.index = async (req, res) => {
  //NOTE: Socket.io
  chatSocket(res);
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
