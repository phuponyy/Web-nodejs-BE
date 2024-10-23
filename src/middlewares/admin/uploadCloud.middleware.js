const uploadTocloudinarcy = require("../../helpers/uploadTocloudinary");

module.exports.upload = async (req, res, next) => {
  if (req.file) {
    const link = await uploadTocloudinary(req.file.buffer);
    req.body[req.file.fieldname] = link;
  }
  next();
};
