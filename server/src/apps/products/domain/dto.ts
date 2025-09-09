import mongoose from "mongoose";

export type AddProductInput = {
    name: string;
    description: string;
    price: number;
    images: [string],
    userId: string | mongoose.Types.ObjectId
}