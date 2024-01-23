import {asyncHandler} from "../../utils/asyncHandler.js";
import {Coupon} from "../../../DB/model/coupon.model.js"
import voucher_codes from "voucher-code-generator";


export const createCoupon = asyncHandler(async (req,res,next)=>{
    const {discount,expiresAt} = req.body
    const createdBy = req.payload.id
    const code = voucher_codes.generate({
        length:5
    })[0]
    const coupon = await Coupon.create({name:code,discount,expiresAt:new Date(expiresAt).getTime(),createdBy})
    return res.status(201).json({success:true,message:"Coupon created successfully!"})
})

export const updateCoupon = asyncHandler(async (req,res,next)=>{
    const {discount,expiresAt} = req.body
    const {couponId} = req.params
    const createdBy = req.payload.id
    const coupon = await Coupon.findById(couponId)
    if(!coupon) return next(new Error('Coupon not found!',{cause:404}))
    if(coupon.createdBy != createdBy) return next(new Error("User not authorized!"))
    coupon.discount = discount
    coupon.expiresAt = new Date(expiresAt).getTime()
    await coupon.save()
    return res.json({sucess:true,message:"Coupon updated successfully!"})
})

export const deleteCoupon = asyncHandler(async (req,res,next)=>{
    const {couponId} = req.params
    const createdBy = req.payload.id
    const coupon = await Coupon.findById(couponId)
    if(!coupon) return next(new Error("Coupon not found!",{cause:404}))
    if(coupon.createdBy != createdBy) return next(new Error("User not authorized!"))
    await coupon.deleteOne()
    return res.json({sucess:true,message:"Coupon deleted successfully!"})

})

export const getAllCoupons = asyncHandler(async(req,res,next)=>{
    const coupon = await Coupon.find()
    if(!coupon.length) return next(new Error("No coupons found!",{cause:404}))
    return res.json({sucess:true,message:coupon})
})