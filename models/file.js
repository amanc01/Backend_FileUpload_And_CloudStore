const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const fileSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    imageurl:{
        type: String,
    },
    tags:{
        type: String,
    },
    email:{
        type: String,
    },
    
}, {timestamps: true});

// post middleware
fileSchema.post('save', async function(doc){
    try{
        //jo bhi entry database me hogi uska doc print karega
        console.log("Doc -> ", doc);
        //transporter
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        });

        //send mail with defined transport object
        let info = await transporter.sendMail({
            from: `Aman`,
            to: doc.email,
            subject: 'New File Uploaded On cloudinary',
            hmtl: `<h2>File Uploaded</h2 > View here <a href="${doc.imageurl}">${doc.imageurl}</a>`,
        })
        console.log("Message sent: %s", info);

    }catch(err){
        console.log(`Error in post middleware in schema`,err);
    }
});


module.exports = mongoose.model('File', fileSchema);

