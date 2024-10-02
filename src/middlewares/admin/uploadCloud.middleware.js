const streamifier = require("streamifier");
const cloudinary = require("cloudinary").v2;

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

module.exports.upload = async (req, res, next) => {
  if (!req.file) {
    return next(); // Skip middleware if no file is uploaded
  }

  const streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };

  try {
    const result = await streamUpload(req); // Wait for the upload to complete
    console.log(result.secure_url); // Log the URL of the uploaded image
    req.body[req.file.fieldname] = result.secure_url; // Save URL in request body
    next();
  } catch (error) {
    console.error("Cloudinary upload error:", error); // Log any errors
    res.status(500).send("File upload failed"); // Send a response on error
  }
};
