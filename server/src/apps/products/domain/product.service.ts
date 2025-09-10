import BaseError from "../../../libraries/errors/BaseError";
import { HttpStatusCode } from "../../../types";
import { ProductRepository } from "../data-access/product.repository";
import { AddProductInput } from "./dto";


export class ProductService {
  private prodRepo = new ProductRepository();

  async getProducts(limit: number, skip: number) {
    const products = await this.prodRepo.getProducts(limit, skip)

    return products;
  }

  async createProduct(productInput: AddProductInput) {

    const product = await this.prodRepo.insertProduct(productInput);

    if (!product) {
      throw new BaseError(
        "add product",
        HttpStatusCode.NOT_FOUND,
        "Product not found"
      );
    }

    return product;
  }

  async likeProduct(productId: string, userId: string) {
    const like = await this.prodRepo.likeProduct(productId, userId);

    return like;
  }

  async addComment(comment: string, userId: string, productId: string) {
    const isCommentAdded = await this.prodRepo.addComment(comment, userId, productId);

    return isCommentAdded;
  }

}
