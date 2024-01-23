import {Router} from "express"
import { validate } from "../../middleware/validation.middleware.js"
import {authenticate} from "../../middleware/authentication.middleware.js"
import {authorize} from "../../middleware/authorization.middleware.js"
import {createCouponSchema, deleteCouponSchema, updateCouponSchema } from "./coupon.validation.js"
import {createCoupon, deleteCoupon, getAllCoupons, updateCoupon} from "./coupon.controller.js"


const router = Router()

router.post('/',authenticate,authorize("admin"),validate(createCouponSchema),createCoupon)
router.patch('/:couponId',authenticate,authorize("admin"),validate(updateCouponSchema),updateCoupon)
router.delete('/:couponId',authenticate,authorize("admin"),validate(deleteCouponSchema),deleteCoupon)
router.get('/',authenticate,authorize("admin"),getAllCoupons)

export default router