import dotenv from 'dotenv'

dotenv.config()

let jwt = {
    jwtSecret: process.env.JWT_SECRET,
    jwtSession: {
        session: false,
    },
}

export default jwt
