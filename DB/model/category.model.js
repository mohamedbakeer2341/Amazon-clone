import mongoose, {Schema,model,Types} from "mongoose";

const categorySchema = new Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        min:3,
        max:30
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        min:3,
        max:30
    },
    createdBy:{
        type:Types.ObjectId,
        ref:"User",
        required:true,
    }
},
{timestamps:true})

export const Category = mongoose.models.Category || model("Category",categorySchema);