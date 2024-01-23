import mongoose , {Schema,model,Types} from "mongoose"

const cartSchema = new Schema({
    user:{
        type:Types.ObjectId,
        ref:"User",
        required:true,
        unique:true,
    },
    products:[{
        productId:{type:Types.ObjectId,
        ref:"Product"
        },
        quantity:{
            type:Number,
            default:1
        }
    }]
},
{
    timestamps:true
}) 

export const Cart = mongoose.models.Cart || model("Cart",cartSchema)