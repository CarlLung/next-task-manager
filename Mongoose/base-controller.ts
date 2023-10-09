import { Request, Response } from 'express'

export class HttpException {
    constructor(public statusCode: number, public reason: string) {}
}

export class BaseController {
    handleRequest<T>(fn: (req: Request, res: Response) => T | Promise<T>) {
        return async (req: Request, res: Response) => {
            try {
                let data = await fn(req, res)
                res.json({ data })
            } catch (error: any) {
                if (error instanceof HttpException) {
                    res.status(error.statusCode).json({ error: error.reason })
                } else {
                    if (typeof error === 'string') {
                        res.status(500).json({ error: error })
                    }
                    res.status(500).json({ error: error.message })
                }
            }
        }
    }
}
