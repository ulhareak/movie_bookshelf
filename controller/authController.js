const knex = require('../db/db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = "any_secret_you_want_to_use"

const randtoken = require("rand-token")

function login(request, response, next) {
   return knex('user').where({ email: request.body.username }).
      orWhere({ mobile: request.body.username }).
      first().
      then((user) => {
         if (!user) {
            response.status(401).json({
               error: "No user by that name"
            })
         } else {
            return bcrypt
               .compare(request.body.password, user.password)
               .then(isAuthenticated => {
                  if (!isAuthenticated) {
                     response.status(401).json({
                        error: "Unauthorized Access!"
                     })
                  } else {
                     const gen_token = jwt.sign(user, SECRET, (error, token) => {
                        // // req.user = user
                        return response.status(200).json({ token })
                     })

                     // console.log(user.last_name);
                     // console.log(user.id);
                     knex('user').update({
                        last_seen: knex.fn.now(),
                        // last_name: "salunke"
                     }).where({ id: user.id }).then(() => { })

                     return gen_token;
                  }
               })
         }
      })
}


function reset_password(req, res, next) {
   const username = req.body.username

   if (!username) {
      return res.json({ status: false, msg: "enter valid data.." })
   }
   // console.log(username);
   const user = knex('user').select().where({ email: username }).orWhere({ mobile: username }).first()
      .then((user) => {
         // console.log(user.id, user.email);
         // console.log(user.email);
         var token = randtoken.generate(15)
         knex('user_tokens').update({ token: token }).where({ user_id: user.id }).then(ut => {
            console.log(ut)
         })
         const resString = `update your passsword at http://localhost:3000/api/update_password/${token}`
         return res.json({ res: resString })
      })

}

function update_password(req, res, next) {

   const token = req.params.token
   const password = req.body.password

   if (!token | !password) {
      return res.json({ status: false, msg: "invalid data.." })
   }
   // console.log(token , password);

   knex('user_tokens').where({ token: token }).first()
      .then((user_t) => {
         // console.log("user_t",user_t.user_id);
         bcrypt.hash(password, 10)
            .then(hashedPassword => {
               return knex('user').update(
                  {
                     password: hashedPassword,
                  }).where({ "id": user_t.user_id }).then(() => {
                     // console.log("user_t",user_t);
                     return res.json({ succsess: true, msg: "password updated successfully" })
                  })
            })
      })

}

module.exports = { login, reset_password, update_password }
