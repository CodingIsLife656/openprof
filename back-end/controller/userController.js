import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { User, user } from "../model/User.js";


export const register = catchAsyncErrors(async (req, res, next) => {

    const { firstName, lastName, email, age, phone,dob } = req.body;

    if (!firstName || !lastName || !email || !age || !phone) {
        return next(new ErrorHandler("please complete the form", 400))
    }

    let use = await user.findOne({ email });
    if (use) {
        return next(new ErrorHandler("user already exist", 400))
    }

    await user.create({
        firstName, lastName, email, age, phone,dob
    })
    res.status(200).json({
        success: true,
        message: "registered",
    })

})

export const getAllRegister = catchAsyncErrors(async (req, res, next) => {

    const User = await user.find()
    res.status(200).json({
        success: true,
        User
    })
})

export const getByid = catchAsyncErrors(async(req,res,next)=>{

    const {id}=req.params;
     const userId =await user.findById(id)
     res.status(200).json({
        success:true,
        userId
     })
})
export const updateRegister = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

   const updateUser = await user.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    })
    res.status(200).json({
        success: true,
        message:"updated",
        updateUser
    })
})

export const deleteUser = catchAsyncErrors(async(req,res,next)=>{

    const{id}=req.params;
    const User = await user.findById(id)

    if(!User){
        return next(new ErrorHandler("user not found"))
    }

    await user.findByIdAndDelete(id)

    res.status(200).json({
        success:true,
        message:"deleted successfully"
    })
})