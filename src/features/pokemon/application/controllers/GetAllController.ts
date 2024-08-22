import { type Request } from "express";
import { OK } from "../../../../common/http";
import { type Controller } from "../../../../common/types";
import type GetAllUseCase from "../../domain/use-cases/GetAllUseCase";
import { GetAllDTO } from "../dtos/GetAllDTO";

class GetAllController implements Controller {
    constructor(
        private readonly getAllUseCase: GetAllUseCase,
    ) {}

    async handle(request: Request) {
        const data = new GetAllDTO(request.query).all();
        const pokemons = await this.getAllUseCase.execute(data);

        return OK({
            success: true,
            data: { pokemons },
        });
    }
}
export default GetAllController
