const cloudinary = require('cloudinary').v2;

exports.cloudinaryConnect = () => {
    try{
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.api_key ,
            api_secret: process.env.api_secret
        });

    }catch(err){
        console.log("Error connecting to cloudinary",err);
        process.exit(1);
    }
};
 

