import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiOptions,
} from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Utilizes Cloudinary API to upload an image in base64 and returns the reference link of the stored image
const uploadBase64Image = async (
  base64Image: string,
  options: UploadApiOptions = {}
) => {
  try {
    const result: UploadApiResponse = await cloudinary.uploader.upload(
      base64Image,
      options
    );

    console.log("Upload success:", JSON.stringify(result, null, 2));
    return result.url;
  } catch (error) {
    console.error("Upload error:", JSON.stringify(error, null, 2));
    throw error;
  }
};

export default uploadBase64Image;
