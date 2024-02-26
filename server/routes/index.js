const Router = require('express')
const router = new Router()
const bookRouter = require('./bookRoutes')
const userRouter = require('./userRoutes')
const authMiddleware = require('../middleware/authMiddleware')

router.use('/user', userRouter)
router.use('/book', authMiddleware, bookRouter)

module.exports = router