import joi from "joi"
import { isValidObjectId } from "../../middleware/validation.middleware.js"
export const createCategorySchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    createdBy: joi.string().custom(isValidObjectId)
}).required()

export const updateCategorySchema = joi.object({
    categoryId: joi.string().custom(isValidObjectId).required(),
    name:joi.string().min(3).max(30).required()
}).required()

export const deleteCategorySchema = joi.object({
    categoryId: joi.string().custom(isValidObjectId).required(),
    createdBy: joi.string().custom(isValidObjectId)
})