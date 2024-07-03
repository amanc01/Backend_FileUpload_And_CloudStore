const express = require('express');
const router = express.Router();

//saare handlers import karlo
const {videoUploadHandler,imageUploadHandler, localfileupload} = require('../controllers/fileupload');

// api routes

router.post('/localfileupload', localfileupload);
router.post('/imageUpload', imageUploadHandler);
router.post('/videoUpload', videoUploadHandler);

//export route
module.exports = router;
