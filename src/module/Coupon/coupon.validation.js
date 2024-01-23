import joi from "joi"
import { isValidObjectId } from "../../middleware/validation.middleware.js"

export const createCouponSchema = joi.object({
    discount : joi.number().min(1).max(100).required(),
    expiresAt : joi.date().greater(Date.now()).required(),
}).required()

export const updateCouponSchema = joi.object({
    couponId: joi.string().custom(isValidObjectId).required(),
    discount: joi.number().min(1).max(100).required(),
    expiresAt : joi.date().greater(Date.now()).required(),
}).required()

export const deleteCouponSchema = joi.object({
    couponId: joi.string().custom(isValidObjectId).required()
})