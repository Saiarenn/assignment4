const Router = require('express')
const router = new Router()
const quizController = require('../controllers/quizController')


router.get('/', quizController.getAll)
router.post('/', quizController.getAll)

module.exports = router