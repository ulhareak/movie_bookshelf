
const database = require('../db/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const req = require('express/lib/request')
const SECRET = "any_secret_you_want_to_use"
const dotenv = require('dotenv');
dotenv.config();


const verify = (request, response, next) => {
    const token = request.headers.authorization.split(" ")[1]
    jwt.verify(token, SECRET, (error, decodedToken) => {
       if(error){
          response.status(401).json({
             message: "Unauthorized Access!"
          })
       }else{
           req.user = { id: decodedToken.id,
            fname: decodedToken.first_name , 
            is_admin : decodedToken.is_admin }
        //   response.status(200).json({
        //      id: decodedToken.id,
        //      fname: decodedToken.fname , 
        //      role : decodedToken.role 
        //   })
       }
    })
    next();
 }


 module.exports = { verify}
