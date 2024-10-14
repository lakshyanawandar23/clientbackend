const dotenv=require('dotenv');
dotenv.config();
 //console.log(process.env.PORT_DEV);

module.exports={PORT:process.env.PORT,URI:process.env.ATLAS_DB_URL,API_KEY:process.env.API_KEY,API_SECRET:process.env.API_SECRET,CLOUD_NAME:process.env.CLOUD_NAME};