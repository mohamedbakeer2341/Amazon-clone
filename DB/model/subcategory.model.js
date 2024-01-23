import mongoose,{Schema,model,Types} from 'mongoose';

const subCategorySchema = new Schema({
    name: {
        type:String,
        required:true,
        min:3,
        max:30,
        unique:true,
    },
    slug:{
        type:String,
        required:true,
        min:3,
        max:30,
        unique:true,
    },
    categoryId:{
        type: Types.ObjectId,
        ref: "Category",
        required:true,
    },
},
{
    timestamps:true,
})

export const Subcategory = mongoose.models.Subcategory || model("Subcategory",subCategorySchema);