import {User} from "../../../DB/model/user.model.js"
import { Token } from "../../../DB/model/token.model.js";
import bcrypt from "bcryptjs";
import { asyncHandler } from "../../utils/asyncHandler.js";
import {sendEmail} from "../../utils/sendEmail.js"
import jwt from "jsonwebtoken";
import randomstring from "randomstring"
import crypto from "crypto-js"
import {nanoid} from "nanoid"
import { Cart } from "../../../DB/model/cart.model.js";

export const signUp = asyncHandler(async (req,res,next)=>{
    const {userName,email,password,role} = req.body
    const user = await User.findOne({email})
    if (user) return next(new Error("user already exists"))
    const hashedPassword = bcrypt.hashSync(password,Number(process.env.SALT))
    const activationCode = nanoid()
    const activationLink = `http://localhost:3000/auth/confirmEmail/${activationCode}`
    const isSent = await sendEmail({to:email,subject:'Activation Mail',html:`<a href="${activationLink}">Activate account</a>`})
    const result = await User.create({userName,email,password:hashedPassword,activationCode,role})
    return isSent ? res.status(201).json({success:true,message:"Please check your email"}) : next(new Error('Invalid email'))
})

export const activateAccount = asyncHandler(async (req,res,next)=>{
    const {activationCode} = req.params
    const user = await User.findOneAndUpdate({activationCode},{isConfirmed:true,$unset:{activationCode:1}})
    await Cart.create({user:user._id})
    return !user ? next(new Error('User not found',{cause:404}))
    : res.json("Account is now confirmed")
})

export const login = asyncHandler(async (req,res,next)=>{
    const {email,password} = req.body
    const user = await User.findOneAndUpdate({email})
    if(!user) return next(new Error("User not found"))
    if(!user.isConfirmed) return next (new Error("Please verify your email!"))
    const isMatched = bcrypt.compareSync(password,user.password)
    if(!isMatched) return next(new Error("Invalid password"))
    user.status = "online"
    await user.save()
    const token = jwt.sign({id:user._id,email:user.email,role:user.role},process.env.SECRET_KEY,{expiresIn:"2d"})
    await Token.create({token,userId:user._id})
    return res.json({success:true,message:token})
})


export const sendForgetCode = asyncHandler(async (req,res,next)=>{
    const {email} = req.body
    const user = await User.findOne({email})
    if(!user) return next(new Error("User not found"))
    const code = randomstring.generate({
        length: 6,
        charSet: "numeric"
    })
    user.forgetCode = code
    await user.save()
    return sendEmail({to:email,subject:"Reset password",html:`<p>Your forget code is : ${code}</P>`})
    ? res.json({success:true,message:"Forget code sent to your email"})
    : next(new Error("Email not found"))
})

export const resetPassword = asyncHandler(async (req,res,next)=>{
    const {email,forgetCode,nPassword} = req.body
    const user = await User.findOne({email})
    if(!user) return next(new Error("User not found!"))
    if(user.forgetCode !== forgetCode) return next(new Error("Invalid forget code!"))
    const hashedPassword = bcrypt.hashSync(nPassword,Number(process.env.SALT))
    await User.findOneAndUpdate({email},{password:hashedPassword,$unset:{forgetCode:1}})
    const tokens = await Token.find({user:user.userId})
    tokens.forEach(async (token)=>{
        token.isValid = false,
        await token.save()
    })
    return res.json({success:true,message:"Password changed successfully!"})
})

export const deleteAccount = asyncHandler(async(req, res, next)=>{
    const { id } = req.payload
    const user = await User.findById(id)
    if(!user) return next(new Error("User does not exist!",{cause:404}))
    const tokens = await Token.find({userId:id})
    tokens.forEach(async (token)=>{
        token.isValid = false
        await token.save()
    })
    await User.findByIdAndDelete(id)
    return res.json({success:true,message:"User deleted successfully"})
})