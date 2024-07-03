const File = require('../models/file');
const cloudinary = require('cloudinary').v2;

// localfileupload -> handler function
exports.localfileupload = async (req, res) => {
    try {
        // Fetch file from request
        const file = req.files.file;
        console.log("File received: ", file);

        // Define the server path (__dirname is the current working directory)
        //creaye path where file need to be stored
        let path = __dirname + '/files/' + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("Path -> ", path);

        // Move the file to the specified path
        //add path to the move function 
        file.mv(path, (err) => {
            if (err) {
                console.error("Error in file upload:", err);
                return res.status(500).json({ message: "Error uploading file" });
            }
            // File moved successfully
            res.status(200).json({
                success: true,
                message: "File uploaded successfully"
            });
        });

    } catch (error) {
        console.error("Error in localfileupload:", error);
        res.status(500).json({ message: "Error in localfileupload" });
    }
};

// image upload handler

async function uploadFileToCloudinary(file, folder) {
    try {
        const options = { folder };
        console.log("temp file path: ", file.tempFilePath);
        options.resource_type = 'auto';
        return await cloudinary.uploader.upload(file.tempFilePath, options);
    } catch (error) {
        console.error("Error in uploadFileToCloudinary:", error);
        return null;
    }

}
exports.imageUploadHandler = async (req, res) => {
    try {
        //data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.imageFile;
        console.log("Image File received: ", file);

        //validation
        const supportedTypes = ['png', 'jpeg', 'jpg'];
        const fileType = file.name.split('.')[1].toLowerCase();

        //check if the file type is supported or not 
        if (!supportedTypes.includes(fileType)) {
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            });
        }

        //file format supported so upload on cloudinary
        const response = await uploadFileToCloudinary(file, 'codeHelp');
        console.log("Cloudinary response: ", response);
        //db me entry save karna hai
        // Create a new document using the File model
        const fileData = await File.create({
            name,
            tags,
            email,
            imageurl: response.secure_url,
        });

        res.json({
            success: true,
            imageurl: response.secure_url,
            message: "Image uploaded successfully",
            // data: fileData
        })

    } catch (error) {
        console.error("Error in imageUploadHandler:", error);
        res.status(400).json({ message: "Error in imageUploadHandler" });
    }

};

//videos upload handler

exports.videoUploadHandler = async (req, res) => {
    try{
        //data fetch
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        const file = req.files.videoFile;

         //validation
         const supportedTypes = ['mkv','mp4'];
         const fileType = file.name.split('.')[1].toLowerCase();
 
         //check if the file type is supported or not 
         if (!supportedTypes.includes(fileType)) {
             return res.status(400).json({
                 success: false,
                 message: "File type not supported"
             });
        }
        //TODO: add an upper limit on the file size
        //file format supported so upload on cloudinary
        // console.log("uploading to cloud");
        const response = await uploadFileToCloudinary(file, 'codeHelp');
        console.log("Cloudinary response: ", response);


        //db me entry save karna hai
        // Create a new document using the File model
        const fileData = await File.create({
            name,
            tags,
            email,
            imageurl: response.secure_url,
        });

        res.json({
            success: true,
            videourl: response.secure_url,
            message: "Video uploaded successfully",
            // data: fileData
        })

    }catch(error){
        console.error("Error in videoUploadHandler:", error);
        res.status(500).json({
            message: "Error in videoUploadHandler"
        });
    }
};

