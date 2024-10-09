const mongoose=require('mongoose');

const otpmodel=mongoose.Schema({
    email:{
        type:String,
        required:[true,"cannot be empty"]
    },
    otp:{
        type:String,
        required:[true,"cannot be empty"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 2, // The document will be automatically deleted after 5 minutes of its creation time
      },
})

const OTP=mongoose.model('otps',otpmodel);
module.exports=OTP;