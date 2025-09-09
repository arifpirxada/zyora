import mongoose from "mongoose";
import BaseError from '../../../libraries/errors/BaseError';
import { AddProductInput } from '../domain/dto';
import ProductModal from './product.modal';
import { HttpStatusCode } from '../../../types';


export const toObjectId = (id: string | mongoose.Types.ObjectId) => {
  if (id instanceof mongoose.Types.ObjectId) {
    return id;
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error('Invalid ObjectId');
  }
  return new mongoose.Types.ObjectId(id);
};

export class ProductRepository {
  async insertProduct(input: AddProductInput) {

    input.userId = toObjectId(input.userId);

    const newProduct = new ProductModal(input)

    try {
      return await newProduct.save();
    } catch (err: any) {

      throw new BaseError(
        'Error',
        HttpStatusCode.INTERNAL_SERVER,
        'Could not insert product'
      );
    }
  }

}