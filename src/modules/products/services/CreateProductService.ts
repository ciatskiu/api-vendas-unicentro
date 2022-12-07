import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductRespository from "../typeorm/repositories/ProductRepository";

interface IRequest{
    name: string;
    price: number;
    quantity: number;
}

export default class CreateProductService{

    public async execute({name, price, quantity} : IRequest) :
    Promise<Product>{
        const productRepository = 
        getCustomRepository(ProductRespository);

        const productExists = await 
        productRepository.findByName(name);
        if(productExists){
            throw new AppError('There is already one product' +
            'with this name.');
        }

        const product = productRepository.create({
            name, price, quantity
        });
        await productRepository.save(product);
        return product;
    }

}