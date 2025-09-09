import { NextFunction, Request, Response } from "express";
import { ProductService } from "../domain/product.service";
import { HttpStatusCode } from "../../../types";
import storage from "../../../libraries/multer";
import multer from "multer";

const upload = multer({ storage }).array("photos", 8);

const productService = new ProductService();

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        if (
          err instanceof multer.MulterError &&
          err.code === "LIMIT_UNEXPECTED_FILE"
        ) {
          return res.status(400).json({
            success: false,
            message: "You can upload up to 8 photos only",
          });
        }
        return next(err);
      }

      let productData = req.body;

      if (!productData.images) {
        productData.images = [];
      }

      (req.files as Express.Multer.File[]).forEach((file) => {
        productData.images.push(file.path);
      });

      const product = await productService.createProduct(productData);
      res.status(HttpStatusCode.OK).json({
        success: true,
        message: "Product created successfully",
        product,
      });
    });
  } catch (err) {
    next(err);
  }
};

export default { createProduct };
