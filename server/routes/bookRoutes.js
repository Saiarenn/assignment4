const Router = require('express')
const router = new Router()
const bookController = require('../controllers/bookController')
const checkRole = require('../middleware/checkRoleMiddleware')


router.post('/', checkRole('ADMIN'), bookController.create)
router.get('/', bookController.getAll)
router.get('/:bookId', bookController.getById)
router.put('/:bookId', checkRole('ADMIN'), bookController.updateById)
router.delete('/:bookId', checkRole('ADMIN'), bookController.deleteById)

module.exports = router