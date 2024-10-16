 const Signup=require('../models/signup')
 const bcrypt=require('bcryptjs');
const BankDetails = require('../models/bankmodel');
 function ping(req,res){
   return  res.send("ping check");
}
async function signup(req,res){
    console.log(req.body);
     const {name,email,phone,address,password}=req.body;
     const user=await Signup.findOne({email});
     if(user){
        return res.status(409).json("User already exist ");
     }
     try{
        const hashpassword=await bcrypt.hash(password,10);
        console.log(hashpassword);
        const resp=await Signup.create({
            name,
            email,
            phone,
            address,
            password:hashpassword
      })
      console.log(resp);
      return res.status(201).json({
         error:"",
         messsage:"User Successfullly registered",
         data:resp
      })
     }
      catch(error){
        console.log(error)
        return res.status(400).json("error");
      }
}

async function login(req,res){
    console.log(req.body);
    const {email,password}=req.body;
    const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  
    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  
    // Create a JWT token
   // const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  
    res.status(200).json({ message: 'Login successful', token:user.generateAuthToken(),role:user.role });
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
    getusers,
    bankdetails,
    getbankdetils,
    login
}
