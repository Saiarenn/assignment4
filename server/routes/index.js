const Router = require('express')
const router = new Router()
const bookRouter = require('./bookRoutes')
const userRouter = require('./userRoutes')
const inventoryRouter = require('./inventoryRoutes')
const quizRouter = require('./quizRoutes')
const authMiddleware = require('../middleware/authMiddleware')


router.use('/user', userRouter)
router.use('/book', bookRouter)
router.use('/quiz', authMiddleware, quizRouter)
router.use('/inventory', authMiddleware, inventoryRouter)

module.exports = router