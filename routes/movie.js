


const router  = require('express').Router()
const middleware = require('../middleware/middleware')


router.get('/', require('../controller/movie').get)
// router.get('/:id', require('../controller/movie').getbyId)
router.post('/',middleware.verify ,require('../controller/movie').post)
// router.put('/:id',middleware.verify , require('../controller/movie').put)
router.patch('/:id',middleware.verify , require('../controller/movie').patch)
router.delete('/:id',middleware.verify , require('../controller/movie').deleteMovie)


module.exports = {router}

