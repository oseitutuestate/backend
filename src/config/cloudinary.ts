import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { Configs } from "./config";

// Cloudinary configuration
cloudinary.config({
  cloud_name: Configs.CLOUDINARY_CLOUD_NAME,
  api_key: Configs.CLOUDINARY_API_KEY,
  api_secret: Configs.CLOUDINARY_API_SECRET,
});

// Define the storage engine for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    // folder: "YOUR_FOLDER_NAME", // Specify the folder where images will be stored in Cloudinary
    // format: async (req: Request, file: Express.Multer.File) => ["jpg", "jpeg", "png"], // You can specify the format of the uploaded images (e.g., jpg, png, etc.)
  },
});

export default storage;
