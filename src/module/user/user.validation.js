import joi from "joi";

export const signUpSchema = joi.object({
    userName : joi.string().min(3).max(30).required(),
    email : joi.string().email({minDomainSegments:2,tlds:{allow:["com","net"]}}).required(),
    password : joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    cPassword: joi.string().valid(joi.ref("password")).required(),
    role: joi.string().valid('admin','user').required()

}).required()

export const activateAccountSchema = joi.object({
    activationCode : joi.string().required(),
}).required()

export const loginSchema = joi.object({
    email: joi.string().email({minDomainSegments:2,tlds:{allow:["com","net"]}}).required(),
    password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
}).required()

export const forgetPasswordSchema = joi.object({
    email: joi.string().email({minDomainSegments:2,tlds:{allow:["com","net"]}}).required()
}).required()

export const resetPasswordSchema = joi.object({
    email: joi.string().email({minDomainSegments:2,tlds:{allow:["com","net"]}}).required(),
    nPassword: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirmNewPassword: joi.string().valid(joi.ref("nPassword")).required(),
    forgetCode: joi.string().required()
}).required()

