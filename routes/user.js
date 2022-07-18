


const router = require('express').Router()
const middleware = require('../middleware/middleware')

// router.use()
// router.use(middleware.verify)
router.get('/',middleware.verify, require('../controller/user').get)
router.get('/:id',middleware.verify,require('../controller/user').getById)
router.post('/', require('../controller/user').post)
// router.put('/:id', require('../controller/user').put)
router.patch('/:id', require('../controller/user').patch)
router.delete('/:id', require('../controller/user').delete_rec)


module.exports = {router}



