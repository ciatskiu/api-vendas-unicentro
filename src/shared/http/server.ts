import 'reflect-metadata'; //primeira linha sempre!
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use((error: Error, request: Request, 
    response: Response, next: NextFunction) =>{
        if(error instanceof AppError){
            return response.status(error.statusCode).json({
                status: 'error',
                message: error.message
            });
        }
        return response.status(500).json({
            status: 'error',
            message: 'Internal Server Error'
        });
    });

app.listen(3333, () => {
    console.log('Server Started on Port 3333!');
})

