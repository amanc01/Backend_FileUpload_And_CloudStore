const express = require('express');
const fileUpload = require('express-fileupload');



const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// for uploading files on server
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
})); 

//db se connect karna hai
const db = require('./config/database');
db.connect();

//cloudenary se connect karna hai
const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();

//api routes mount karna hai
const Upload = require('./routes/fileupload');
app.use('/api/v1/upload', Upload);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
