import mongoose, {Schema , model} from "mongoose";

const userSchema = new Schema({
        userName:{
            type:String,
            required:true,
            unique:true,
            min:3,
            max:30
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
        },
        password:{
            type:String,
            required:true,
            min:3,
            max:30
        },
        isConfirmed:{
            type:Boolean,
            default:false,
        },
        phone:{
            type:String,
            min:5,
            max:30

        },
        gender:{
            type:String,
            enum:['male','female'],
        },
        isConfirmed:{
            type:Boolean,
            default:false,
        },
        status:{
            type:String,
            enum:['online','offline'],
            default:"offline"
        },
        role:{
            type:String,
            enum:['admin','user'],
            default:"user"
        },
        forgetCode:String,
        activationCode:String,

},
{
    timestamps:true,
})

export const User = mongoose.models.User || model("User",userSchema)