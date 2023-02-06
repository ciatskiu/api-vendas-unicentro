import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export default class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    avatar: string;
    @CreateDateColumn()
    created_at: Date;
    @CreateDateColumn() 
    updated_at: Date;
}