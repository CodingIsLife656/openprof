import mongoose from "mongoose";
import validator from "validator";

export const User = new mongoose.Schema({

    firstName:{
        type:String,
        required: true,
        minLength:[3,"min 3 characters required"],
    },
    lastName:{
        type:String,
        required:true,
        minLength:[1,"min 1 character required"]
    },
    email: {
        type:String,
        required:[true,"enter email"],
        validate:[validator.isEmail,"invalid email"],
    },
    age:{
        type:String,
        required:[true,"please enter age"]
    },
    phone:{
        type:String,
        required:true,
        minLength:[10,"invalid number"],
        maxLength:[10,"invalid number"],
    },
    dob:{
        type:Date,
        required:true,
    }

})


export const user = mongoose.model("User",User);

