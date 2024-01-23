import {Router} from "express";
import {authenticate} from "../../middleware/authentication.middleware.js"
import {authorize} from "../../middleware/authorization.middleware.js"
import {validate} from "../../middleware/validation.middleware.js"
import { createSubCategorySchema, deleteSubCategorySchema, updateSubCategorySchema } from "./subcategory.validation.js";
import { createSubCategory, deleteSubCategory, getAllSubCategories, updateSubCategory } from "./subcategory.controller.js";

const router = Router()
router.post('/',authenticate,authorize("admin"),validate(createSubCategorySchema),createSubCategory)
router.get('/',authenticate,authorize("admin"),getAllSubCategories)
router.patch('/:id',authenticate,authorize("admin"),validate(updateSubCategorySchema),updateSubCategory)
router.delete('/:id',authenticate,authorize("admin"),validate(deleteSubCategorySchema),deleteSubCategory)


export default router