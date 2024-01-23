import jwt from "jsonwebtoken";
import { Token } from "../../DB/model/token.model.js";
import { User } from "../../DB/model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const authenticate = asyncHandler(async(req,res,next)=>{
    let token = req.headers.token
    if(!token || !token.startsWith(process.env.BEARER_TOKEN)) return next(new Error("Invalid token"))
    token = token.split(process.env.BEARER_TOKEN)[1]
    const tokenDB = await Token.findOne({token,isValid:true})
    if(!tokenDB) return next(new Error("Invalid or expired token"))
    const decoded = jwt.verify(token,process.env.SECRET_KEY)
    if(!decoded) return next(new Error("Invalid token"))
    const user = await User.findById(decoded.id)
    if(!user) return next(new Error("User not found",{cause:404}))
    req.payload = decoded
    return next()
})