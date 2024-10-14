const exprees= require('express');
const app=exprees();
const apirouter=require('./routes/index');
const connecttodb = require('./config/db.config');
const bodyparser=require('body-parser');
const {PORT}=require('./config/server.config');
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(bodyparser.text());
app.use('/api',apirouter);
// cloudinary.config({ 
//   cloud_name: 'dbqvv3vvb',
//   api_key: '388497641457646',
//   api_secret: 'v8byKNRGD1LMQ9gRV7RIkC0QT4M'// Click 'View API Keys' above to copy your API secret
// });
// const storage = new CloudinaryStorage({
//       cloudinary,
//       params: {
//           folder: 'CloudinaryDemo',
//           allowedFormats: ['jpeg', 'png', 'jpg'],
//       }
//   });
//   const upload=multer({storage});
//   app.post('/upload', upload.single('image'), (req, res) => {
//     console.log(req.file)
//     if (!req.file) {
//         return res.status(400).send('No file uploaded.');
//     }
//     // Send back the URL of the uploaded image
//     try{
//     res.json({
//         message: 'Image uploaded successfully!',
//         url: req.file.path, // The Cloudinary URL for the uploaded image
//     });
//   }
//     catch(error){
//       console.error(err);
//       res.status(500).json({ error: 'Something went wrong', details: err.message });
//     }
// });

app.listen(PORT,(req,res)=>{
    console.log("server is running");
    connecttodb();
})
