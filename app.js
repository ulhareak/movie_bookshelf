



const express = require('express')
const port  = process.env.port  | '3000' ; 
const app = express() 
const bodyParser = require('body-parser')
const cors = require('cors')
// const router = require('./routes/web').router

// importing the routes

const people = require('./routes/people').router
const user = require('./routes/user').router
const movie = require('./routes/movie').router
const genre = require('./routes/genre').router
const auth = require('./routes/auth').router
const middleware = require('./middleware/middleware')
app.use(cors())

app.use(bodyParser.json())
// app.use('/' ,router)

// using the routes 

// auth routes 
app.use('/api',auth)
// Models routes 
app.use('/api/movie',movie)
app.use('/api/people', middleware.verify,people)
app.use('/api/user',user)
app.use('/api/genre',middleware.verify,genre)

app.listen(port , ()=>{
    console.log(`app is listening at http://localhost:${port}`);
})