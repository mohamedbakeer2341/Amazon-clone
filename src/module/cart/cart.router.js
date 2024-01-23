import {Router} from "express"
import {validate} from "../../middleware/validation.middleware.js"
import { authenticate } from "../../middleware/authentication.middleware.js"
import { addToCartSchema, deleteProductFromCartSchema } from "./cart.validation.js"
import { addToCart, deleteProductFromCart, getUserCart, clearCart } from "./cart.controller.js"

const router = Router()

router.post('/',authenticate,validate(addToCartSchema),addToCart)
router.get('/',authenticate,getUserCart)
router.patch('/',authenticate,validate(deleteProductFromCartSchema),deleteProductFromCart)
router.patch('/clearCart',authenticate,clearCart)

export default router