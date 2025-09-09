import BaseError from "../../../libraries/errors/BaseError";
import { HttpStatusCode } from "../../../types";
import { ProductRepository } from "../data-access/product.repository";
import { AddProductInput } from "./dto";


export class ProductService {
  private prodRepo = new ProductRepository();

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
}
