import mongoose,{Schema,model,Types} from "mongoose";

const tokenSchema = new Schema({
    token:{
        type:String,
        required:true,
    },
    userId:{
        type:Types.ObjectId,
        ref:"User",
    },
    agent:String,
    isValid:{
        type:Boolean,
        default:true,
    }
},
{
    timestamps:true
})

export const Token = mongoose.models.Token || model("Token",tokenSchema)