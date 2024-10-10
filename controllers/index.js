 const Signup=require('../models/signup')
 const OTP=require('../models/otpmodel');
 const otpGenerator=require('otp-generator');
 const nodemailer=require('nodemailer');
 function ping(req,res){
   return  res.send("ping check");
}
async function signup(req,res){
    console.log(req.body);
     const {name,email,phone,adhaar,address}=req.body;
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
            text: `Your OTP for verification is: ${otp}`
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
            res.status(200).send('OTP verified successfully');
        } else {
            res.status(400).send('Invalid OTP');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error verifying OTP');
    }
}

module.exports={
    ping,
    signup,
    otpgene,
    otpverify
}
