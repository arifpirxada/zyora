import mongoose from "mongoose";
import BaseError from "../../../libraries/errors/BaseError";
import { AddProductInput } from "../domain/dto";
import ProductModal from "./product.modal";
import { HttpStatusCode } from "../../../types";

export const toObjectId = (id: string | mongoose.Types.ObjectId) => {
  if (id instanceof mongoose.Types.ObjectId) {
    return id;
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ObjectId");
  }
  return new mongoose.Types.ObjectId(id);
};

export class ProductRepository {
  async getProducts(limit: number, skip: number) {
    try {
      if (limit < 0 || skip < 0)
        throw new BaseError(
          "Get Product",
          HttpStatusCode.BAD_REQUEST,
          "Invalid query parameters, limit and skip"
        );

      const products = await ProductModal.find()
        .populate("likes.user", 'name email profilePic')
        .populate('comments.userId', 'name email profilePic')
        .sort({ createdAt: -1 }) // newest first
        .limit(limit)
        .skip(skip);

      return products;
    } catch (err: any) {
      throw new BaseError(
        "Get Product",
        HttpStatusCode.INTERNAL_SERVER,
        "Could not get products"
      );
    }
  }

  async insertProduct(input: AddProductInput) {
    input.userId = toObjectId(input.userId);

    const newProduct = new ProductModal(input);

    try {
      return await newProduct.save();
    } catch (err: any) {
      throw new BaseError(
        "Error",
        HttpStatusCode.INTERNAL_SERVER,
        "Could not insert product"
      );
    }
  }

  async likeProduct(prodId: string, user: string) {
    const productId = toObjectId(prodId);
    const userId = toObjectId(user);

    const product = await ProductModal.findOne({
      _id: productId,
      "likes.user": userId,
    });

    let updateQuery;
    if (product) {
      // Already liked → remove (dislike)
      updateQuery = { $pull: { likes: { user: userId } } };
    } else {
      // Not liked yet → add (like)
      updateQuery = { $push: { likes: { user: userId } } };
    }

    const updated = await ProductModal.updateOne(
      { _id: productId },
      updateQuery
    );

    return updated.modifiedCount;
  }

  async addComment(comment: string, user: string, productId: string) {
    const userId = toObjectId(user);
    const id = toObjectId(productId);

    const updateProduct = await ProductModal.updateOne(
      { _id: id },
      { $push: { comments: { userId, content: comment } } }
    );

    return updateProduct.modifiedCount;
  }
}
