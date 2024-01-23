import {Router} from "express"
import {fileUpload, filterObj} from "../../utils/multer.js"
import { validate } from "../../middleware/validation.middleware.js"
import {authenticate} from "../../middleware/authentication.middleware.js"
import {authorize} from "../../middleware/authorization.middleware.js"
import {createProduct, deleteProduct, getAllProducts} from "../../module/Product/product.controller.js"
import { createProductSchema , deleteProductSchema } from "./product.validation.js"

const router = Router()

router.post('/',authenticate,authorize("admin"),fileUpload(filterObj.image).fields([
    { name:"defaultImage", maxCount:1 },
    { name:"images", maxCount:5 }
]),validate(createProductSchema),createProduct)
router.get('/',authenticate,authorize("admin"),getAllProducts)
router.delete('/:id',authenticate,authorize("admin"),validate(deleteProductSchema),deleteProduct)


export default router