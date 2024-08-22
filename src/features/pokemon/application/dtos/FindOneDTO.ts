import { z } from "zod";
import { AbstractDTO } from "../../../../common/application/dtos/AbstractDTO";

const findOneDTOSchema = z.object({
    id: z.string().regex(/^\d+$/).transform(Number),
})

export class FindOneDTO extends AbstractDTO<typeof findOneDTOSchema> {
    protected rules() {
        return findOneDTOSchema;
    }
}