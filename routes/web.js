

const express = require('express')
const router = express.Router()
const dotenv = require('dotenv');
dotenv.config();

const user = require('../controller/user')
const genre = require('../controller/genre')
const people = require('../controller/people')
const movie = require('../controller/movie')
const auth  = require('../controller/authController')
const middleware = require('../middleware/middleware')

// Globally setting up the middleware
// router.use(middleware.verify)

// user end requests 
router.get('/user',middleware.verify, user.get);
router.post('/user',user.post );

//genre requests

router.get('/genre', genre.get); 
router.post('/genre',middleware.verify,genre.post); 

//people requests
router.get('/people',people.get )
router.post('/people',middleware.verify,people.post)

//movie req..

router.get('/movie' , movie.get)
router.post('/movie',middleware.verify , movie.post)

//authentication  and  authrorization 

router.post('/login',auth.login )
// router.get('/verify' , auth.verify)


module.exports = { router }