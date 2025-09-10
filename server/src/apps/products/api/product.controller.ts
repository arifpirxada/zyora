import { NextFunction, Request, Response } from "express";
import { ProductService } from "../domain/product.service";
import { HttpStatusCode } from "../../../types";
import storage from "../../../libraries/multer";
import multer from "multer";

const upload = multer({ storage }).array("photos", 8);

const productService = new ProductService();

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit =
      typeof req.query.limit === "string" ? parseInt(req.query.limit) : 10;
    const skip =
      typeof req.query.skip === "string" ? parseInt(req.query.skip) : 0;

    const products = await productService.getProducts(limit, skip);

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (err) {
    next(err);
  }
};

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

const likeProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productId = req.params.id;
    const userId = req.userId;

    if (!userId || userId === undefined) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "No user found",
      });
    }

    const like = await productService.likeProduct(productId, userId!);

    const message = like === 1 ? "Liked Product" : "Disliked Product";

    res.status(HttpStatusCode.OK).json({
      success: true,
      message,
    });
  } catch (err) {
    next(err);
  }
};

const addComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.userId;

    if (!userId || userId === undefined) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "No user found",
      });
    }

    const comment = req.body.comment;
    const productId = req.params.id;

    if (!comment || !productId) {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: "Invalid post data",
      });
    }

    const isCommentAdded: number = await productService.addComment(
      comment,
      userId!,
      productId
    );

    if (isCommentAdded !== 1) {
      res.status(HttpStatusCode.INTERNAL_SERVER).json({
        success: false,
        message: "Could not add comment",
      });
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: 'Added comment to product'
    });
  } catch (err) {
    next(err);
  }
};

export default { createProduct, getProducts, likeProduct, addComment };
