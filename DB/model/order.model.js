import mongoose , {Schema,model,Types} from "mongoose"

const orderSchema = new Schema(
    {
        user:{
            type:Types.ObjectId,
            ref:"User",
            required:true,
        },
        products:[{
            productId:{
                type:Types.ObjectId,
                ref:"Product"
            },
            quantity:{
                type:Number,
                min:1
            },
            name:String,
            itemPrice:Number,
            totalPrice:Number,
        }],
        address:{
            type:String,
            required:true,
        },
        phone:{
            type:String,
            required:true,
        },
        price:{
            type:Number,
            required:true,
        },
        coupon:{
            id:{
                type:Types.ObjectId,
                ref:"Coupon"
            },
            name:String,
            discount:{
                type:Number,
                min:1,
                max:100
            }
        },
        status:{
            type:String,
            enum:['placed','shipped','delivered','cancelled','refunded'],
            default:"placed"
        },
        payment:{
            type:String,
            enum:['visa','cash'],
            default:"cash"
        }
        
    },
    {timestamps:true}
)

orderSchema.virtual("finalPrice").get(function(){
    if(!this.coupon) return this.price
    const finalPrice = this.price*(100-this.discount) / 100
    return Number.parseFloat(finalPrice).toFixed(2);
})
export const Order = mongoose.models.Order || model("Order",orderSchema)