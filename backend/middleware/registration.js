import {validationResult } from 'express-validator'

const r = (req, res, next) => {
        const errors =  validationResult(req);
        if (!errors.isEmpty()) {
            console.log('usao u error')
            console.log(errors.array());
            return res.status(400).json({ errors: errors.array() });
        }
        
        //console.log(req.body)   
        next()
}


export const registration = r