const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImages = (image) => {
  return cloudinary.uploader.upload(image, {
    upload_preset: 'smart_shopping',
    allowed_formats: 'jpg, jpeg, png',
  });
};

module.exports = uploadImages;
