import { Router } from "express";
import ProductsController from "../controllers/ProductsController";

const productRouter = Router();
const productsController = new ProductsController();

productRouter.get('/', productsController.index);
productRouter.get('/:id', productsController.show);
productRouter.post('/', productsController.create);
productRouter.put('/:id', productsController.update);
productRouter.delete('/:id', productsController.delete);

export default productRouter;

//lembrar de importar na routes->index