

const knex = require('../db/db')
const peopleModel = require('../models/people')

function get(req, res) {
    if (req.user.is_admin) {
        peopleModel.fetchAll().then(op=>{
            res.json(op)
        })
    }
}

function post(req, res, next) {
    const { name  } = req.body

    if (!name ) {
        return res.json({ success: false, msg: 'name req....' })
    }
    if (req.user.is_admin) {
        peopleModel.forge({
            name:name
        }).save().then(op=>{
            res.json(op)
        })
    }
}

const patch = (req, res, next) => {
    const id = req.params.id
    const name  = req.body.title
    if( !name ){
        return res.json({succsess : true , msg : "enter name"})
    }
    if (req.user.is_admin) {

        peopleModel.where({id : id}).save({name:name} , { patch : true}).then(op=>{
            res.json(op)
        })
    }
}

function delete_rec( req , res , next ){
    const id = req.params.id

    if( !id ){
        return res.json({succsess : true , msg : "give id "})
    }

    if (req.user.is_admin) {

        peopleModel.where({id : id }).destroy().then(()=>{
            res.send(1)
        })

    }

}

module.exports = { get, post , patch , delete_rec }