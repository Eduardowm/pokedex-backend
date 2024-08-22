import { type Request, type Response, Router } from "express";
import { findOneController, getAllController } from "../../PokemonFactory";
import AsyncHandler from "../../../../common/application/handlers/AsyncHandler";

const router = Router();

router.route('/pokemons').get(AsyncHandler.handle(async (req: Request, res: Response) => {
    const response = await getAllController.handle(req)
    res.status(response.statusCode).json(response.body)
}))

router.route('/pokemons/:id').get(AsyncHandler.handle(async (req: Request, res: Response) => {
    const response = await findOneController.handle(req)
    res.status(response.statusCode).json(response.body)
}))

export default router