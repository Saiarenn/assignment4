const Router = require('express')
const router = new Router()
const bookController = require('../controllers/bookController')

router.post('/:userId', bookController.create)
router.get('/:userId', bookController.getAll)
router.get('/:userId/:bookId', bookController.getById)
router.put('/:userId/:bookId', bookController.updateById)
router.delete('/:userId/:bookId', bookController.deleteById)

module.exports = router