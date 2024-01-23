import {Router} from "express"
import {authenticate} from "../../middleware/authentication.middleware.js"
import {validate} from "../../middleware/validation.middleware.js"
import {cancelOrder, createOrder} from "./order.controller.js"
import {cancelOrderSchema, createOrderSchema} from "./order.validation.js"

const router = Router()

router.post('/',authenticate,validate(createOrderSchema),createOrder)
router.patch('/:orderId',authenticate,validate(cancelOrderSchema),cancelOrder)

export default router