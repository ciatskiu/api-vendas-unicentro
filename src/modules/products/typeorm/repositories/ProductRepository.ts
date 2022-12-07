import { Repository } from "typeorm";
import Product from "../entities/Product";

export default class ProductRespository extends 
    Repository<Product>{
        public async findByName(name: string) 
        : Promise<Product | undefined>{
            const product = await this.findOne({
                where: { name }
            })
            return product;
        }

}