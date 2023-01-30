import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/User";
import UsersRespository from "../typeorm/repositories/UsersRepository";
import authConfig from "@config/auth";

interface IRequest{
    email: string;
    password: string;
}

interface IResponse{
    user: User;
    token: string;
}

export default class CreateSessionsService{
    public async execute({email, password}: IRequest): 
    Promise<IResponse>{
       const usersRespository = getCustomRepository(UsersRespository);
       const user = await usersRespository.findByEmail(email);
       if(!user){
        throw new AppError('Incorrect email/passowrd combination.', 401);
       } 
       const passowrdConfirmed = await compare(password, user.password);
       if(!passowrdConfirmed){
        throw new AppError('Incorrect email/passowrd combination.', 401);
       }
       const token = sign({}, authConfig.jwt.secret,
       {
        subject: user.id,
        expiresIn: authConfig.jwt.expiresIn
       });
       return {user, token}; 
    }
}