import jwt, { decode } from 'jsonwebtoken'
import UsersService from '../service/users'
import {LocalStorage} from 'node-localstorage'

const auth = (listOfRoles) => {
    return function(req, res, next) {
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log('token ->', token)
        jwt.verify(token, 'token', (error, decodedToken) => {
            if(error){
                res.status(401).json({
                    message: "Unauthorized Access!"
                })
            }else{
                //console.log('decoded->', decodedToken)
                res.locals.user = decodedToken.user
                
                const userRole = UsersService.findUserRole(decodedToken.user.id)
                
                userRole.then(function(result) { 
                    const role = result.role_id
                    var isFound = false

                    for(let i = 0; i < listOfRoles.length; i++) {
                        if (role === parseInt(listOfRoles[i])){
                            isFound = true
                            break;
                        }
                    }
                    
                    if(!isFound) {
                        return res.status(401).json({message: 'User cannot access this route!' })
                    }

                    next()
                })
            }
        })
    }

}

export default auth