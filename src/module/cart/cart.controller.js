import { asyncHandler } from "../../utils/asyncHandler.js";
import {Cart} from "../../../DB/model/cart.model.js"
import {Product} from "../../../DB/model/product.model.js"

export const addToCart = asyncHandler(async(req,res,next)=>{
    const {productId,quantity} = req.body
    const user = req.payload.id
    const cart = await Cart.findOne({user})
    const product = await Product.findById(productId)
    if(!product) return next(new Error("Product not found"))    
    if(quantity > product.stock) return next(new Error(`Only ${product.stock} items left of this product!`))
    cart.products.push({productId, quantity})
    await cart.save()
    return res.json({sucess:true,result:cart})
    }
)

export const getUserCart = asyncHandler(async(req,res,next)=>{
    const user = req.payload.id
    const cart = await Cart.findOne({user}).populate('products.productId','name defaultImage.url price discount finalPrice')
    return res.json({success:true,cart})
})


export const deleteProductFromCart = asyncHandler(async(req,res,next)=>{
    const user = req.payload.id
    const {productId} = req.body
    const cart = await Cart.findOneAndUpdate(
        {user},
        {$pull: {products: {productId} } },
        {new:true})
    return res.json({sucess:true,message:"Product deleted successfully!"})
})

export const clearCart = asyncHandler(async(req,res,next)=>{
    const user = req.payload.id
    const cart = await Cart.findOneAndUpdate({user},{products:[]})
    return res.json({success:true,message:"Cart cleared successfully!"})
})