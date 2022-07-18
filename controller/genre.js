



const knex = require('../db/db')
const genre = require('../models/genre')
const genreModel = require('../models/genre')

function get(req, res, next) {

    if (req.user.is_admin) {

        genreModel.fetchAll().then((op)=>{
            return res.json(op)
        })
        // knex('genre').select().where({is_deleted : false}).then((genre) => {
        //     return res.json(genre)
        // })
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
        // knex('genre').insert(
        //     {
        //         name: name
        //     }
        // ).then(() => {
        //     knex.select().from('genre')
        //         .then((genre) => {
        //             res.send(genre.pop())
        //         })
        // })

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
        // knex('genre').update(
        //     {
        //         name: name
        //     }
        // ).where({id : id }).then((genre ) => {
        //     res.json(genre)
        // })

    }
}

function delete_rec(req , res ,next ){
    const id = req.params.id

    if( !id ){
        return res.json({succsess : true , msg : "give id "})
    }

    if (req.user.is_admin) {
        genreModel.where({id : id }).distroy().then(()=>{
            res.send(1)
        })
        // knex('genre').update(
        //     {
        //         is_deleted : true
        //     }
        // ).where({id : id }).then((genre ) => {
        //     res.json(genre)
        // })

    }

}

module.exports = { get, post , patch , delete_rec}


