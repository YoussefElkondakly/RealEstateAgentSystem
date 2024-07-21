import {default as multer}from 'multer'
import { AppError } from "./appError";
import { Request } from 'express';
// FIXME I Have A problem while validating inputs the photo is saved on the server
export const uploadPhoto = function (category:string,) {
    const multerStorage = multer.diskStorage({
      destination: (req, file, cb) => {
       
        req.category = category;
        cb(null, `uploads/${category}`);
      },
      filename: (req, file, cb) => {
        console.log(file);
        const ext = file.mimetype.split("/")[1];
        cb(null, `${category}-${Date.now()}.${ext}`);
      },
    });
    const fileFilter = (
      req: Request,
      file: Express.Multer.File,
      cb: multer.FileFilterCallback
    ) => {
      if (file.mimetype.startsWith("image")) {
        cb(null, true);
      } else {
        cb(null , false);
      }
    };
    const upload = multer({
      storage: multerStorage,
      fileFilter: fileFilter,
    });

    return upload.single("photo");
};
