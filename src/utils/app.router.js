import authRouter from "../module/user/user.router.js"
import categoryRouter from "../module/category/category.router.js"
import subCategoryRouter from "../module/subcategory/subcategory.router.js"
import productRouter from "../module/Product/product.router.js"
import couponRouter from "../module/Coupon/coupon.router.js"
import cartRouter from "../module/cart/cart.router.js"
import orderRouter from "../module/order/order.router.js"


export const appRouter = (app,express)=>{
    app.use(express.json())
    app.use('/auth',authRouter)
    app.use('/category',categoryRouter)
    app.use('/subcategory',subCategoryRouter)
    app.use('/product',productRouter)
    app.use('/coupon', couponRouter)
    app.use('/cart',cartRouter)
    app.use('/order',orderRouter)
    app.all('*',(req,res,next)=>{
        return next(new Error('Page not found',{cause:404}));
    })
    app.use((error,req, res, next)=>{
        res.status(error.cause || 500).json({success:false,message:error.message,stack:error.stack})
    })
}