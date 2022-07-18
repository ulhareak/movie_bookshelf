



const knex = require('../db/db')
const genre = require('../models/genre')
const genreModel = require('../models/genre')

function get(req, res, next) {

    if (req.user.is_admin) {

        genreModel.where({is_deleted: false}).fetchAll().then((op)=>{
            return res.json(op)
        })
    }
}


function post(req, res, next) {
    const { name } = req.body
    if (!name) {
        return res.json({ success: false, msg: 'name is req.' })
    }

    if (req.user.is_admin) {

        genreModel.forge({
            name:name
        }).save().then((genre)=>{
            res.json(genre)
        })

    }


}

function patch(req , res ,next ){
    const id = req.params.id
    const name  = req.body.title

    if( !name ){
        return res.json({succsess : true , msg : "enter name"})
    }

    if (req.user.is_admin) {
        genreModel.where({id:id}).save({name:name},{patch:true}).then(op=>{
            res.json(op)
        })

    }
}

function delete_rec(req , res ,next ){
    const id = req.params.id

    if( !id ){
        return res.json({succsess : true , msg : "give id "})
    }

    if (req.user.is_admin) {
        genreModel.where({id : id }).save({is_deleted : true},{patch : true}).then((genre)=>{
            res.json(genre)
        })
    }
}
module.exports = { get, post , patch , delete_rec}


