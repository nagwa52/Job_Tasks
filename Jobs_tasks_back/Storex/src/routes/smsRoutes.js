const express = require("express")
const catchAsync = require("../utils/catchAsync")
const AppError = require("../utils/AppError")
const smsService = require("../services/smsService")

const router = express.Router()

router.post("/sendOTP",catchAsync(async (req,res,next)=>{
    const mobileNumber = req.body.mobileNumber
    const response = await smsService.sendOtp(mobileNumber)
    console.log(response);
    if(response.statusCode){
        res.status(response.statusCode).json({
            "msg":response.message
        })
    }
    
    res.status(200).json(
        response
    )
}))

router.post("/verifyOTP",catchAsync(async(req,res,next)=>{
    const response = await smsService.verifyOtp(req.body)
    if(response.statusCode){
        res.status(response.statusCode).json({
            "msg":response.message
        })
    }    
    res.status(200).json({
        message:response
    })
}))

router.post("/sendSms", catchAsync(async (req,res,next)=>{
    const mobile = req.body.mobileNumber
    const message = req.body.message
    console.log(req.body);
    const response = await smsService.sendSms({mobile,message})
    if(response.statusCode){
        res.status(response.statusCode).json({
            "msg":response.message
        })
    }    
    res.status(200).json({
        message:response
    })
    
}))


module.exports = router