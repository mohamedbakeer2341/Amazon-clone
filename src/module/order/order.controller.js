import {asyncHandler} from "../../utils/asyncHandler.js"
import {Coupon} from "../../../DB/model/coupon.model.js"
import {Cart} from "../../../DB/model/cart.model.js"
import {Product} from "../../../DB/model/product.model.js"
import {Order} from "../../../DB/model/order.model.js"
import { updateStock , clearCart } from "./order.service.js"

export const createOrder = asyncHandler(async(req,res,next)=>{
    const {payment,address,phone,coupon} = req.body
    const user = req.payload
    let checkCoupon;
    let orderProducts = []
    let orderPrice = 0
    if(coupon){
        checkCoupon = await Coupon.findOne({name:coupon,expiresAt:{$gt:Date.now()}})
    }
    if(!coupon) return next(new Error("Coupon not found!"))
    const cart = await Cart.findOne({user:user.id})
    const products = cart.products
    if(!products.length) return next(new Error("No products found in the cart!"))
    for(let i = 0; i < products.length; i++){
        const product = await Product.findById(products[i].productId)
        if(!product) return next(new Error(`Product ${products[i].productId} not found!`))
    
    if(!product.checkStock(products[i].quantity)) {
        return next(new Error(`${product.name} is out of stock, only ${product.stock} items are left!`))
    }
    orderProducts.push({
        productId: product._id,
        quantity: products[i].quantity,
        name: products.name,
        itemPrice: products.finalPrice,
        totalPrice: products[i].quantity * product.finalPrice
    })
    orderPrice += products[i].quantity * product.finalPrice
    }
    const order = await Order.create({
        user:user.id,
        payment,
        products: orderProducts,
        address,
        phone,
        coupon : {
            id: checkCoupon?._id,
            name: checkCoupon?.name,
            discount: checkCoupon?.discount
        },
        price: orderPrice
    })
    updateStock(order.products)
    clearCart(user.id)
    return res.json({success:true,order})
})

export const cancelOrder = asyncHandler(async(req,res,next)=>{
    const {orderId} = req.params
    const order = await Order.findById(orderId)
    if(!order) return next(new Error('Order not found',{cause:404}))
    if(order.status === 'shipped' || order.status ==='delivered'){
        return next(new Error("Can not cancel order after being shipped or delivered"))
    }
    order.status = 'cancelled'
    order.save()
    return res.json({success:true,message:'Order cancelled successfully'})
})