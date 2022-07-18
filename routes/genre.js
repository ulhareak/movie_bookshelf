





const router  = require('express').Router()


router.get('/', require('../controller/genre').get)
// router.get('/:id', require('../controller/genre').getbyId)
router.post('/', require('../controller/genre').post)
// // router.put('/:id', require('../controller/genre').put)
// router.patch('/:id', require('../controller/genre').patch)
router.delete('/:id', require('../controller/genre').delete_rec)



module.exports = {router}


