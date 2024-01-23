import mongoose , {Schema,model,Types} from "mongoose"

const productSchema = new Schema({
    name:{
        type:String,
        required:true,
        min:3,
        max:30
    },
    description:String,
    images: [{
        id:{type:String,required:true},
        url:{type:String,required:true}
    }],
    defaultImage:{
        id:{type:String,required:true},
        url:{type:String,required:true}
    },
    price:{
        type:Number,
        min:1,
        required:true
    },
    stock:{
        type:Number,
        min:1,
        required:true,
    },
    soldItems:{
        type:Number,
        default:0,
    },
    discount:{
        type:Number,
        min:1,
        max:100,
    },
    createdBy:{
        type:Types.ObjectId,
        ref:"User",
        required:true,
    },
    categoryId:{
        type:Types.ObjectId,
        ref:"Category",
    },
    subCategoryId:{
        type:Types.ObjectId,
        ref:"Subcategory"
    },
    cloudFolder:{
        type:String,
        unique:true,
    }
},
{
    timestamps:true,
    toJSON:{virtuals:true}
})

productSchema.virtual("finalPrice").get(function(){
    if(!this.discount) return this.price
    const finalPrice = this.price*(100-this.discount) / 100
    return Number.parseFloat(finalPrice).toFixed(2);
})

productSchema.methods.checkStock = function(requiredQuantity) {
    return this.stock >= requiredQuantity ? true : false;
}

export const Product = mongoose.models.Product || model("Product",productSchema)