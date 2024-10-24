const Chat = require("../../models/chat.model");
const uploadTocloudinary = require("../../helpers/uploadTocloudinary");
const User = require("../../models/users.model");

module.exports = (res) => {
  //NOTE: Socket.io
  _io.once("connection", (socket) => {
    socket.on("CLIENT_ADD_FRIEND", async (userId) => {
      const myUserId = res.locals.user.id;

      // add id A in B
      const existIdAinB = await User.findOne({
        _id: userId,
        acceptFriends: myUserId,
      });

      if (!existIdAinB) {
        await User.updateOne(
          {
            _id: userId,
          },
          {
            $push: { acceptFriends: myUserId },
          }
        );
      }

      // add id B in A
      const existIdBinA = await User.findOne({
        _id: myUserId,
        requestFriends: userId,
      });

      if (!existIdBinA) {
        await User.updateOne(
          {
            _id: myUserId,
          },
          {
            $push: { requestFriends: userId },
          }
        );
      }
    });
  });
  //END: Socket.io
};
