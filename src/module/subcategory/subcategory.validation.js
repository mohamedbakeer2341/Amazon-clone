import joi from "joi"
import { isValidObjectId } from "../../middleware/validation.middleware.js"

export const createSubCategorySchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    categoryId : joi.string().custom(isValidObjectId).required(),
}).required()

export const updateSubCategorySchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    id : joi.string().custom(isValidObjectId).required(),
})

export const deleteSubCategorySchema = joi.object({
    id : joi.string().custom(isValidObjectId).required()
})