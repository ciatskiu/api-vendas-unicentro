import CustomersRepository from "@modules/customers/typeorm/repositories/CustomersRepository";
import ProductRespository from "@modules/products/typeorm/repositories/ProductRepository";
import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/Order";
import OrderRepository from "../typeorm/repositories/OrderRepository";

interface IProduct{
    id: string;
    quantity: number;
}

interface IRequest{
    customer_id: string;
    products: IProduct[];
}

export default class CreateOrderService{
    
    public async execute({customer_id, products}: IRequest): Promise<Order>{
        const ordersRepository = getCustomRepository(OrderRepository);
        const customerRepository = getCustomRepository(CustomersRepository);
        const productRepository = getCustomRepository(ProductRespository);

        const customerExists = await customerRepository.findById(customer_id);
        if(!customerExists){
            throw new AppError('Could not find any customer with the given ids.');
        }

        const existsProducts = await productRepository.findAllByIds(products);
        if(!existsProducts.length){
            throw new AppError('Could not find any products with the given ids.');
        }
        
        const existsProductsIds = existsProducts.map((product) => product.id);
        const checkInexistentProducts = products.filter(
            product => !existsProductsIds.includes(product.id)
        )
        if(!existsProductsIds.length){
            throw new AppError(`Could not 
            find product ${checkInexistentProducts[0].id}`);
        }

        const quantityAvailable = products.filter(
            product => existsProducts.filter(
                prod => prod.id === product.id
            )[0].quantity < product.quantity
        );
        if(quantityAvailable.length){
            throw new AppError(`The quantity ${quantityAvailable[0].quantity}
            is not available for ${quantityAvailable[0].id}`)
        }

        const serializerProducts = products.map(product => ({
            product_id : product.id,
            quantity: product.quantity,
            price: existsProducts.filter(prod => 
                prod.id === product.id)[0].price
        }))

        const order = await ordersRepository.createOrder({
            customer: customerExists,
            products: serializerProducts
        });

        const {order_products} = order;
        const updateProductQuantity = order_products.map(product=>({
          id: product.product_id,
          quantity: existsProducts.filter(p =>
            p.id === product.product_id)[0].quantity - product.quantity
        }));

        await productRepository.save(updateProductQuantity);
        return order;


    }


}