import joi from "joi"
import { isValidObjectId } from "../../middleware/validation.middleware.js"

export const createOrderSchema = joi.object({
    address: joi.string().min(10).max(100).required(),
    coupon: joi.string().length(5),
    phone: joi.string().length(11).required(),
    payment : joi.string().valid('visa','cash').required()
}).required()

export const cancelOrderSchema = joi.object({
    orderId : joi.string().custom(isValidObjectId).required()
})