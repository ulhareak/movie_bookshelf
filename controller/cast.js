





const knex = require('../db/db')


function get( req  , res , next ){

    
 knex('cast').select().then((cast)=>{
        return res.json(cast)
    })
}   


function post( req , res , next ){
    if (req.user.is_admin){

        const { movie , actor } = req.body

        if ( !movie | !actor){
            return res.json({ success: false, msg: 'all fields are mandatory ....' })
        }

     knex('cast').insert({
            movie : movie , 
            actor : actor
        }).then(()=>{
         knex.select().from("cast").
            then((cast)=>{
                res.send(cast.pop())
            })
        })

    }
}

