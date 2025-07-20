import { Router } from 'express'
import { signup, login, refreshAccessToken } from '../controllers/auth.controller'
import { asyncHandler } from '../middlewares/async-handler.middleware'
import { validateLogin, validateSignup } from '../validators/auth.validator'

const router = Router()

router.post('/signup', validateSignup, asyncHandler(signup))
router.post('/login', validateLogin, asyncHandler(login))
router.post('/refresh-token', asyncHandler(refreshAccessToken))

export default router
