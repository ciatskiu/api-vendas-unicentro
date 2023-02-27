import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('customers')
export default class Customer{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    email: string;
    @CreateDateColumn()
    created_at: Date;
    @CreateDateColumn() 
    updated_at: Date;
}