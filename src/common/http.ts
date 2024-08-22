import type { HTTPResponse } from "./types"

export const OK = (data: HTTPResponse['body']): HTTPResponse => ({
    statusCode: 200,
    body: data
})

export const CREATED = (data: HTTPResponse['body']): HTTPResponse => ({
    statusCode: 201,
    body: data
})

export const NO_CONTENT = (): HTTPResponse => ({
    statusCode: 204,
    body: { success: true }
})
