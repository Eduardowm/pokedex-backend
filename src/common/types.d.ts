import type { Request, Response } from "express"

interface HTTPRequest {
    headers?: any
    body?: any
}

interface HTTPResponse {
    statusCode: number
    body: {
        success: boolean,
        data?: any,
        errors?: ValidationError,
    }
}

interface UseCase<Request, Response> {
    execute: (payload: Request) => Promise<Response>
}

interface Controller {
    handle: (request: Request) => Promise<HTTPResponse>
}

interface Model {
    toJson: () => any
}