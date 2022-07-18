
const knex = require('../db/db')

const movieModel = require('../models/movie')
const directorModel = require('../models/director')
const castModel = require('../models/cast')
var bookshelf = require('../db/db')
const { user } = require('pg/lib/defaults')



function get(req, res, next) {

    movieModel.fetchAll({ withRelated: ['director', 'cast'], required: true }).then(result => {
        res.json(result)
    })

}
 function post(req, res) {
    const { genre_id, title, director_ids, actor_ids, duration, info } = req.body

    const arr = []

    if (!title) {
        return res.json({ success: false, msg: 'title is required...' })
    }
    if (req.user.is_admin) {
        var res_data = {};

        movieModel.forge({
            genre_id: genre_id,
            title: title,
            duration: duration,
            info: info
        }).save()
            .then(async function movie(movie){
                m_id = movie.id
                var actor = []
                var director = []

                for (let i = 0; i < actor_ids.length; i++) {
                    actor.push({
                        movie: m_id,
                        actor: actor_ids[i]
                    })
                }

                for (let i = 0; i < director_ids.length; i++) {
                    director.push({
                        movie: m_id,
                        director_id: director_ids[i]
                    })
                }
                console.log('actor', actor);
                console.log('director' , director);
                const dirs = bookshelf.Collection.extend({model : directorModel})
                const act = bookshelf.Collection.extend({model : castModel})
                await dirs.forge(director).bulkSave();
                await act.forge(actor).bulkSave();

            }).then(movie=>{
                return movieModel.where({id: m_id}).fetch({withRelated : ['director' , 'cast'], required : true})
                .then(result=>{
                    res.json(result)
                })
            })

    }
}

function patch(req, res, next) {

    const id = req.params.id

    if (!id) {
        return res.json({ succsess: true, msg: "give id " })
    }

    var data = req.body
    var director_ids = data['director_ids']
    var actor_ids = data['actor_ids']
    delete data['director_ids']
    delete data['actor_ids']
    if (req.user.is_admin) {
        return knex('movie').where({ id: id }).
            update(data).then(() => {

                if (director_ids) {
                    knex('director').where({ movie: id }).del().then(() => { })
                    var director = []
                    for (let i = 0; i < director_ids.length; i++) {
                        director.push({
                            movie: id,
                            director_id: director_ids[i]
                        })
                    }

                    knex('director').insert(
                        director
                    ).then(() => { })
                }

                if (actor_ids) {
                    knex('cast').where({ movie: id }).del().then(() => { })
                    var actor = []
                    for (let i = 0; i < actor_ids.length; i++) {
                        actor.push({
                            movie: id,
                            actor: actor_ids[i]
                        })
                    }


                    knex('cast').insert(
                        actor
                    ).then(() => { })
                }
                knex('movie').select('movie.id',
                    'title', 'director.director_id', 'cast.actor').where({ 'movie.id': id })
                    .innerJoin('director', 'movie.id', '=', 'director.movie')
                    .innerJoin('cast', 'movie.id', '=', 'cast.movie')
                    .then((response) => {
                        const resultMap = response.reduce((result, row) => {
                            result[row.id] = result[row.id] || {
                                ...row,
                                director_id: [],
                                actor: []
                            };

                            if (!result[row.id].director_id.includes(row.director_id)) {
                                result[row.id].director_id.push(row.director_id)
                            }
                            if (!result[row.id].actor.includes(row.actor)) {
                                result[row.id].actor.push(row.actor)
                            }

                            return result;
                        }, {});

                        res.json(Object.values(resultMap))
                    })


            })

    }
    res.json(director)

}

function deleteMovie(req, res, next) {

    const id = req.params.id

    if (!id) {
        return res.json({ succsess: true, msg: "give id " })
    }

    if (req.user.is_admin) {


        user.where({id:id}).save({is_deleted:true},{patch : true}).then(op=>{
            res.json(op)
        })
        // knex('movie').update(
        //     {
        //         is_deleted: true
        //     }
        // ).where({ id: id }).then((movie) => {
        //     res.json(movie)
        // })

    }
}

module.exports = { get, post, patch, deleteMovie }

