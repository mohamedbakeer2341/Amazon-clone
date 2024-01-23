import { Category } from "../../../DB/model/category.model.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import slugify from "slugify"

export const createCategory = asyncHandler(async(req,res,next)=>{
    const {name} = req.body
    const createdBy = req.payload.id
    const category = await Category.findOne({name})
    if(category) return next(new Error("category already exists!"));
    await Category.create({name,createdBy,slug:slugify(name)})
    return res.status(201).json({success:true,message:"Category created successfully!"})
})

export const updateCategory = asyncHandler(async(req,res,next)=>{
    const {categoryId} = req.params
    const {name} = req.body
    const category = await Category.findOne({_id:categoryId,createdBy:req.payload.id})
    if(!category) return next(new Error("Category not found!",{cause:404}))
    category.name = name
    category.slug = slugify(name)
    await category.save()
    return res.json({success:true,message:"Category updated successfully!"})
})

export const deleteCategory = asyncHandler(async(req,res,next)=>{
    const {id} = req.payload
    const category = await Category.findOne({_id:req.params.categoryId,createdBy:id})
    if(!category) return next(new Error("Category does not exist!",{cause:404}))
    await category.deleteOne()
    return res.json({success:true,message:"category deleted successfully"})
})

export const getAllCategories = asyncHandler(async(req,res,next)=>{
    const category = await Category.find()
    if(!category.length) return next(new Error("No categories found!"))
    return res.json({success:true,message:category})
})