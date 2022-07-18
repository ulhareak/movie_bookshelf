




const router = require('express').Router()

router.get('/', require('../controller/people').get)
// router.get('/:id', require('../controller/people').getbyId)
router.post('/', require('../controller/people').post)
// router.put('/:id', require('../controller/people').put)
router.patch('/:id', require('../controller/people').patch)
router.delete('/:id', require('../controller/people').delete_rec)


module.exports = {router}

