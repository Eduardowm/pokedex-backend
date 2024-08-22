import { type Request } from "express";
import { OK } from "../../../../common/http";
import { type Controller } from "../../../../common/types";
import type FindOneUseCase from "../../domain/use-cases/FindOneUseCase";
import { FindOneDTO } from "../dtos/FindOneDTO";

class FindOneController implements Controller {
    constructor(
        private readonly findOneUseCase: FindOneUseCase,
    ) {}

    async handle(request: Request) {
        const params = new FindOneDTO(request.params).all();
        const pokemon = await this.findOneUseCase.execute(params);

        return OK({
            success: true,
            data: { pokemon },
        });
    }
}
export default FindOneController
