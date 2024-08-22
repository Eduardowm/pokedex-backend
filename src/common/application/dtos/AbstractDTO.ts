import { z, ZodError, type ZodType } from "zod";
import UnprocessableError, { ValidationError } from "../exceptions/UnprocessableError";
import UnexpectedError from "../exceptions/UnexpectedError";

export abstract class AbstractDTO<Schema extends ZodType> {
    protected data: z.infer<Schema>;

    public constructor(data: Record<string, unknown>) {
        this.data = this.validate(data);
    }

    protected abstract rules(): Schema;

    public all(): z.infer<Schema> {
        return this.data;
    }

    public get<Key extends keyof z.infer<Schema>>(key: Key) {
        return this.data[key];
    }

    private validate(data: Record<string, unknown>) {
        try {
            return this.rules().parse(data);
        } catch (e) {
            if (e instanceof ZodError) {
                const { issues } = e
                const errorMessage = issues[0].message

                const errors = issues.reduce((acc: ValidationError[], issue) => {
                    acc.push({
                        field: issue.path.join('.'),
                        message: issue.message
                    })
                    return acc
                } , [])

                throw new UnprocessableError(errorMessage, errors);
            }

            throw new UnexpectedError('Internal server error.');
        }
    }

}