import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Product from "../typeorm/entities/Product";
import ProductRespository from "../typeorm/repositories/ProductRepository";

interface IRequest{
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export default class UpdateProductService{

    public async execute({id, name, price, quantity} : IRequest) :
     Promise<Product>{
        const productRepository = 
        getCustomRepository(ProductRespository);

        const product = await productRepository.findOne(id);
        if(!product){
            throw new AppError('Product not found.');
        }

        const productExists = await 
        productRepository.findByName(name);
        if(productExists && name != product.name){
            throw new AppError('There is already one product' +
            'with this name.');
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productRepository.save(product);

        return product;
    }

}