import { Request, Response } from "express";
import multer from "multer";
import storage from "../../config/cloudinary";

// Create the multer upload instance
const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB file size limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed."));
    }
  },
});

// Handle the image uploads
const uploadImages = async (req: Request, res: Response) => {
  try {
    // Use the `upload` middleware to process the uploaded images
    upload.array("images", 5)(req, res, (err: any) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      const files = req.files as Express.Multer.File[];

      // Get the public URLs of the uploaded images
      const imageUrls = files.map((file) => file.path);

      // Return the image URLs in the response
      res.status(200).json({ imageUrls });
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { uploadImages };
