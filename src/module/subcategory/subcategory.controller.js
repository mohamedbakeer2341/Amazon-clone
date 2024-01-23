import { asyncHandler } from "../../utils/asyncHandler.js"
import { Subcategory } from "../../../DB/model/subcategory.model.js"
import slugify from "slugify"

export const createSubCategory = asyncHandler(async(req,res,next)=>{
    const {name,categoryId} = req.body
    const subcategory = await Subcategory.findOne({name,categoryId})
    if(subcategory) return next(new Error("Subcategory already exists!"))
    const slug = slugify(name)
    await Subcategory.create({name,categoryId,slug})
    return res.json({success:true,message:"Subcategory created successfully!"})
})

export const updateSubCategory = asyncHandler(async(req,res,next)=>{
    const {name} = req.body
    const {id} = req.params
    const subCategory = await Subcategory.findById(id)
    if(!subCategory) return next(new Error("Subcategory not found!",{cause:404}))
    const slug = slugify(name)
    subCategory.name = name
    subCategory.slug = slug
    await subCategory.save()
    return res.json({success:true,messaeg:"Subcategory updated successfully"})
})

export const deleteSubCategory = asyncHandler(async(req,res,next)=>{
    const {id} = req.params
    const subcategory = await Subcategory.findById(id)
    if(!subcategory) return next(new Error("Subcategory not found!",{cause:404}))
    await subcategory.deleteOne()
    return res.json({success:true,message:"Subcategory deleted successfully"})
})

export const getAllSubCategories = asyncHandler(async(req,res,next)=>{
    const subCategory = await Subcategory.find().populate('categoryId')
    if(!subCategory.length) return next(new Error("No subcategories found!",{cause:404}))
    return res.json({success:true,message:subCategory})
})