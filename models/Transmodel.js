const mongoose=require('mongoose');

const Transchema=new mongoose.Schema({
    transactionid :{
        type:String,
        required:[true,"cannot be empty"]
    },
    rate:{
        type:String,
        required:[true,"cannot be empty"]
    },
    createdAt: {
    type: Date,
    default: Date.now  // Automatically sets the current date when a new document is created
  }
})

const Trans=mongoose.model("Transaction",Transchema);
module.exports=Trans;