import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductRespository from "../typeorm/repositories/ProductRepository";

export default class ListProductService{

    public async execute() : Promise<Product[]>{
        const productRepository = 
        getCustomRepository(ProductRespository);

        const products = await productRepository.find();
        return products;
    }

}