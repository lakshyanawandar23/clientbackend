 const Signup=require('../models/signup')
 const OTP=require('../models/otpmodel');
 const otpGenerator=require('otp-generator');
 const nodemailer=require('nodemailer');
const BankDetails = require('../models/bankmodel');
 function ping(req,res){
   return  res.send("ping check");
}
async function signup(req,res){
    console.log(req.body);
     const {name,email,phone,adhaar,address}=req.body;
     const user=await Signup.findOne({email});
     if(user){
        return res.status(409).json("User already exist ");
     }
     try{
        const resp=await Signup.create({
            name,
            email,
            adhaar,
            phone,
            address
      })
      console.log(resp);
      return res.status(201).json({
         error:"",
         messsage:"User Successfullly registered",
         data:resp
      })
     }
      catch(error){
        return res.status(400).json("error");
      }
}
async function otpgene(req,res){
    const { email } = req.body;

    const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
  
    try {
        await OTP.create({ email, otp });

        // Send OTP via email (replace with your email sending logic)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'manishnehra352@gmail.com',
                pass: 'pkae owze htjn axzc'
            }
        });

        await transporter.sendMail({
            from: 'manishnehra352@gmail.com',
            to: email,
            subject: 'OTP Verification',
            text: `Hello,
You got a new message from xchange
Please verfiy your account by filling Otp: ${otp}
Best Wishes
EmailJS Team`
        });

        res.status(200).send({
            message:"otp sent successfully",
            otp,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending OTP');
    }
}
async function otpverify(req,res){
    const { email, otp } = req.body;
  console.log(email,otp);
    try {
        const otpRecord = await OTP.findOne({ email, otp });

        if (otpRecord) {
            res.status(200).json('OTP verified successfully');
        } else {
            res.status(400).json('Invalid OTP');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json('Error verifying OTP');
    }
}
async function getusers(req,res){
    const resp=await Signup.find({});
    res.status(200).json(resp);
}
async function bankdetails(req,res){
    console.log(req.body)
    const {accountHolder,accountNumber,bankName,ifscCode}=req.body;
    try{
    const resp=await BankDetails.create({
         accountHolder,
         accountNumber,
         ifscCode,
         bankName,
    })
    console.log(resp);
   return res.status(201).json("Bank Details added")
}
   catch(error){
    if (error.name === 'ValidationError') {
        // Send a list of validation errors
        const errors = Object.values(error.errors).map(el => el.message);
        return res.status(400).json({ errors });
    }
    res.status(500).json({ error: 'Something went wrong', details: error.message })
   }
}
 async function getbankdetils(req,res){
    try{
    const resp=await BankDetails.find({});
    return res.status(200).json({
        data:resp
    })    
}
    catch(error){
        return res.status(400).json("Try again");
    }
 }
module.exports={
    ping,
    signup,
    otpgene,
    otpverify,
    getusers,
    bankdetails,
    getbankdetils
}
