const Router = require('express')
const router = new Router()
const inventoryController = require('../controllers/inventoryController')


router.get('/:userId', inventoryController.getAll)
router.post('/:userId/:bookId', inventoryController.addBook)
router.get('/:userId/:bookId', inventoryController.getById)
router.put('/:userId/:bookId', inventoryController.removeById)

module.exports = router