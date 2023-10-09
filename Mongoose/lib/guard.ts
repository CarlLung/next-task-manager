import { Bearer } from 'permit'
import jwtSimple from 'jwt-simple'
import express from 'express'
import jwt from './jwt'
import { JWTPayload } from '../interface/models'
import '../interface/models'

const permit = new Bearer({
    query: 'access_token',
})

export function requireLogin(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) {
    if (!jwt.jwtSecret) {
        res.status(500).json({ error: 'missing JWT_SECRET in env' })
        return
    }

    let token: string
    try {
        token = permit.check(req)
    } catch (error) {
        res.status(400).json({ error: 'invalid Bearer token in req' })
        return
    }
    if (!token) {
        res.status(401).json({ error: 'empty Bearer token in req' })
        return
    }

    let payload: JWTPayload
    try {
        payload = jwtSimple.decode(token, jwt.jwtSecret)
    } catch (error) {
        res.status(401).json({ error: 'invalid JWT in req' })
        return
    }

    req.jwtPayload = payload
    next()
}
