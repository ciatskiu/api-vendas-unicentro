import Customer from "@modules/customers/typeorm/entities/Customer";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import OrderProducts from "./OrderProducts";

@Entity('orders')
export default class Order{
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @ManyToOne(()=> Customer)
    @JoinColumn({name: 'customer_id'})
    customer: Customer;
    @OneToMany(()=> OrderProducts, order_products => 
        order_products.order,{cascade:true})
    order_products: OrderProducts[];
    @Column()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}