const dotenv=require('dotenv');
dotenv.config();
 //console.log(process.env.PORT_DEV);

module.exports={PORT:process.env.PORT,URI:process.env.ATLAS_DB_URL};