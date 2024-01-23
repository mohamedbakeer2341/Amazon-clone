import { asyncHandler } from "../../utils/asyncHandler.js";
import {nanoid} from "nanoid"
import {Product} from "../../../DB/model/product.model.js"
import cloudinary from "../../utils/cloud.js"

export const createProduct = asyncHandler(async(req,res,next)=>{
    const {name, description,stock,discount,price,categoryId,subCategoryId} = req.body
    const createdBy = req.payload.id
    let images = []
    if(!req.files) return next(new Error("Images required!"))
    const cloudFolder = nanoid()
    for(const file of req.files.images){
        const {secure_url,public_id} = await cloudinary.uploader.upload(
            file.path,{folder:`ecommerce/products/${cloudFolder}`}
        )
        images.push({url:secure_url,id:public_id})
    }
    const {secure_url,public_id} = await cloudinary.uploader.upload(
        req.files.defaultImage[0].path,
        {folder:`ecommerce/products/${cloudFolder}`}
    )
    const product = await Product.create({
        name,description,stock,discount,price,categoryId,subCategoryId,cloudFolder,createdBy,
        defaultImage:{url:secure_url,id:public_id},
        images
    })
    return res.status(201).json({sucess:true,message:"Product created successfully!"})
})

export const deleteProduct = asyncHandler(async(req, res, next) => {
    const createdBy = req.payload.id
    const {id} = req.params
    const product = await Product.findById(id)
    if(!product) return next(new Error("Product not found!",{cause:404}))
    if(createdBy != product.createdBy) return next(new Error("User not authorized"))
    const publicIds = product.images.map((image)=>image.id)
    publicIds.push(product.defaultImage.id)
    const result = await cloudinary.api.delete_resources(publicIds)
    await cloudinary.api.delete_folder(`ecommerce/products/${product.cloudFolder}`)
    await product.deleteOne()
    return res.json({success:true,message:"Product deleted successfully!"})
})

export const getAllProducts = asyncHandler(async(req, res, next) => {
    const {name} = req.query
    const products = await Product.find({name:{$regex:name}})
    if(!products.length) return next(new Error("No products found!",{cause:404}))
    return res.json({success:true,message:products})
})