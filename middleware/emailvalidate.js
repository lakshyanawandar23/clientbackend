const Signup=require('../models/signup');

async function validatemail(req,res,next){
    try {
        const resp=await Signup.findOne(req.body);
        if(resp){
            next();
        }
       else {
        res.status(401).json("Invalid Email");
       }
    } catch (error) {
         res.send("Error Please try again");
    }
}

module.exports=validatemail;