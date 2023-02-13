import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UsersRespository from "../typeorm/repositories/UsersRepository";
import UserTokensRepository from "../typeorm/repositories/UserTokensRepository";
import EtherealMail from "@config/mail/EtherealMail";

interface IRequest{
    email: string;
}

export default class SendForgotEmailPassword{
    public async execute({email} : IRequest) : Promise<void>{
        const userRepository = getCustomRepository(UsersRespository);
        const userTokensReposytory = getCustomRepository(UserTokensRepository);

        const user = await userRepository.findByEmail(email);
        if(!user){
            throw new AppError('User does not exists.');
        }

        const {token} = await userTokensReposytory.generate(user.id);
        console.log(token);
        await EtherealMail.sendMail({
            to: email,
            body: `Solicitação de redefinição de senha recebida: ${token}`
        });
    }
}