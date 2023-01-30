import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRespository from "../typeorm/repositories/UsersRepository";

interface IRequest{
    name : string;
    email : string;
    password : string;
}

export default class CreateUserService{

    public async execute({name, email, password} : IRequest) : 
    Promise<User>{
        const usersRespository = getCustomRepository(UsersRespository);
        const emailExists = await usersRespository.findByEmail(email);
        if(emailExists){
            throw new AppError('Email address already used');
        }
        const hashedPassword = await hash(password, 8);
        const user = usersRespository.create({
            name, 
            email, 
            password : hashedPassword});
        await usersRespository.save(user);
        return user;
    }

}