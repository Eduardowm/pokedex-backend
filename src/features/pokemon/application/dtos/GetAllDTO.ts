import { z } from "zod";
import { AbstractDTO } from "../../../../common/application/dtos/AbstractDTO";

const findOneDTOSchema = z.object({
    page: z.string().regex(/^\d+$/).optional().transform((v) => (v && Number(v) > 0) ? Number(v) : 1),
})

export class GetAllDTO extends AbstractDTO<typeof findOneDTOSchema> {
    protected rules() {
        return findOneDTOSchema;
    }
}