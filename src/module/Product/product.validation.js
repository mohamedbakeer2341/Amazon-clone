import joi from "joi"
import { isValidObjectId } from "../../middleware/validation.middleware.js"

export const createProductSchema = joi.object({
    name: joi.string().min(3).max(30),
    decritpion : joi.string().min(10).max(150),
    stock: joi.number().min(1).required(),
    price: joi.number().min(1).required(),
    discount: joi.number().min(1).max(100),
    categoryId: joi.string().custom(isValidObjectId).required(),
    subCategoryId: joi.string().custom(isValidObjectId).required()
}).required()

export const deleteProductSchema = joi.object({
    id : joi.string().custom(isValidObjectId).required()
}).required()