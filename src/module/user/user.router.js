import Router from "express";
import {signUp,activateAccount, login, sendForgetCode, resetPassword,deleteAccount} from "./user.controller.js"
import { signUpSchema,activateAccountSchema, loginSchema, forgetPasswordSchema, resetPasswordSchema} from "./user.validation.js";
import {validate} from "../../middleware/validation.middleware.js"
import {authenticate} from "../../middleware/authentication.middleware.js"


const router = Router()

router.post('/signUp',validate(signUpSchema),signUp)
router.get('/confirmEmail/:activationCode',validate(activateAccountSchema),activateAccount)
router.post('/signIn',validate(loginSchema),login)
router.patch('/forgetPassword',validate(forgetPasswordSchema),sendForgetCode)
router.patch('/resetPassword',validate(resetPasswordSchema),resetPassword)
router.delete("/deleteAccount",authenticate,deleteAccount)

export default router
