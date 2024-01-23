import {Router} from "express";
import {validate} from "../../middleware/validation.middleware.js"
import {authenticate} from "../../middleware/authentication.middleware.js"
import {authorize} from "../../middleware/authorization.middleware.js"
import { createCategorySchema, deleteCategorySchema, updateCategorySchema } from "./category.validation.js";
import { createCategory, updateCategory , deleteCategory, getAllCategories } from "./category.controller.js";

const router = Router();

router.post('/',authenticate,authorize("admin"),validate(createCategorySchema),createCategory)
router.patch('/:categoryId',authenticate,authorize("admin"),validate(updateCategorySchema),updateCategory)
router.delete('/:categoryId',authenticate,authorize("admin"),validate(deleteCategorySchema),deleteCategory)
router.get('/',getAllCategories)

export default router