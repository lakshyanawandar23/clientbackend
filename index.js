const exprees= require('express');
const app=exprees();
const apirouter=require('./routes/index');
const connecttodb = require('./config/db.config');
const bodyparser=require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.text());
app.get('/',(req,res)=>{
    res.send('ping');
})
app.use('/api',apirouter);

app.listen(3001,(req,res)=>{
    console.log("server is running");
    connecttodb();
})
