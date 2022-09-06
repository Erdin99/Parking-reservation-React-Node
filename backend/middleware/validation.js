import { body } from 'express-validator'

const v = [
    //body('first_name').isString().isLength({ min: 3}),
    //body('last_name').isString().isLength({ min: 3}),
    body('username').isString().isLength({ min: 3}),
    body('email').isEmail(),
    body('password').isLength({ min: 8})
]

export const validation = v