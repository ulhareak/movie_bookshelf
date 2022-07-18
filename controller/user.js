

const knex = require('../db/db')
const bcrypt = require('bcrypt')
const bookshelf = require('../db/db').bookshelf
const user = require('../models/user')

function get(req, res, next) {

    if (req.user.is_admin) {
        user.where({is_deleted:false}).fetchAll().then(result => {
            res.json(result)
        })
    }
}

function getById(req, res, next) {

    const { id } = req.params

    if (!id) {
        return res.json({ status: 'id is not passed' })
    }
    else if (req.user.is_admin) {

        user.where({ id: id }).fetch().then(op => {
            res.json(op)
        })

    }
}

function post(req, res, next) {
    const { first_name, last_name, email, mobile, password
        , is_admin } = req.body;

    if (!first_name | !email | !mobile | !is_admin in [true, false] | !password) {
        return res.json({ success: false, msg: 'all fields are mandatory ....' })
    }


    const user = bcrypt.hash(password, 10)
        .then(hashedPassword => {
            return knex('user').insert(
                {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    mobile: mobile,
                    password: hashedPassword,
                    is_admin: is_admin
                }).then(() => {
                    const user = knex.select().from('user')
                        .then((user) => {
                            const _user = user.pop()
                            knex('user_tokens').insert({ user_id: _user.id }).then();
                            return res.json(_user)

                        })


                })
          })

}

function patch(req, res, next) {
    const id = req.params.id
    if (req.body.password) {
        return res.json({ success: false, msg: 'update password via reset password link...' })
    }
    if (!id) {
        return res.json({ success: false, msg: 'id not present' })
    }

    if (req.user.is_admin) {
        return knex('user').where({ id: id }).
            update(req.body).then(() => {
                knex('user').select().where({ id: id }).then((user) => {
                    res.json(user)
                })
            })
    }
}

function delete_rec(req, res, next) {

    const id = req.params.id
    if (req.user.is_admin) {
        user.where({id:id}).save({is_deleted:true} ,{patch : true}).then(op=>{
            res.json(op)
        })
        // knex('user').select().where({ id: id }).update({ is_deleted: true }).then(() => {
        //     knex('user').select().where({ id: id }).then((user) => {
        //         res.json(user)
        //     })
        // })

    }
}

function put(req, res, next) {
    var id = req.params.id
    if (!id) {
        return res.json({ success: false, msg: 'id not present' })
    }


    if (!first_name | !email | !mobile | !is_admin in [true, false]) {
        return res.json({ success: false, msg: 'all fields are mandatory ....' })
    }


    user.where({id:id}).save(re.body , {patch : true }).then(op=>{
        res.json(op)
    })

}
module.exports = { get, post, getById, patch, delete_rec }

