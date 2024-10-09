const express=require('express');
const v1router=express.Router();
const {ping, signup, otpgene, otpverify}=require('../../controllers')
const validatemail=require('../../middleware/emailvalidate')
v1router.get('/ping',ping);
v1router.post('/signup',signup);
v1router.post('/generate-otp',validatemail,otpgene);
v1router.post('/verify-otp',otpverify);

module.exports=v1router;