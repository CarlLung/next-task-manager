//other
declare global {
    namespace Express {
        interface Request {
            jwtPayload?: JWTPayload
        }
    }
}

export type JWTPayload = {
    user_id: number
    username: string
    email: string
}

export type NativeLoginInput = {
    username: string
    password: string
}

export type NativeLoginOutput = {
    jwt_token: string
}
