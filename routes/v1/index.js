const express=require('express');
const v1router=express.Router();
const {ping, signup,getusers, bankdetails, getbankdetils, login}=require('../../controllers')
const validatemail=require('../../middleware/emailvalidate')
v1router.get('/ping',ping);
v1router.post('/signup',signup);
v1router.post('/login',login);
v1router.get('/users',getusers);
v1router.post('/bankdetails',bankdetails);
v1router.get('/bankdetails',getbankdetils)
module.exports=v1router;