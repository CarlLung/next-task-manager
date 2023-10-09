import { User } from './userSchema'

interface User {
    email: string
    password: string
}

export const build = ({ email, password }: User) => {
    return new User({
        email,
        password,
    })
}

new User({
    email: 'admin@abc.com',
    password: '123456',
})
