# File Upload Service

This Node.js application allows users to upload images and videos to a server using the `express-fileupload` middleware. The files are stored on Cloudinary, an image and video management service. The application uses MongoDB to store file details in the database and sends an email to the user with the link to the uploaded file using Nodemailer.

## Features
- Upload images and videos to the server
- Store uploaded files on Cloudinary
- Save file information in a MongoDB database
- Send email notifications with the file link upon successful upload

## Prerequisites
Before you begin, ensure you have met the following requirements:
- You have installed Node.js and npm
- You have a MongoDB database set up
- You have a Cloudinary account
- You have an email service provider for sending notifications

## Installation

1. Clone the repository
    ```bash
    git clone <repository-url>
    ```
2. Navigate to the project directory
    ```bash
    cd file-upload-service
    ```
3. Install the dependencies
    ```bash
    npm install
    ```
4. Create a `.env` file in the root directory and add your environment variables
    ```env
    PORT=3000
    MONGO_URI=<your-mongodb-uri>
    CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
    CLOUDINARY_API_KEY=<your-cloudinary-api-key>
    CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
    MAIL_HOST=<your-email-host>
    MAIL_USER=<your-email-user>
    MAIL_PASS=<your-email-password>
    ```

## Usage

1. Start the server
    ```bash
    npm start
    ```
2. The server will be running on `http://localhost:3000`

## API Endpoints

- `POST /api/v1/upload/localfileupload`
    - Upload a local file to the server
- `POST /api/v1/upload/imageUpload`
    - Upload an image to the server and store it on Cloudinary
- `POST /api/v1/upload/videoUpload`
    - Upload a video to the server and store it on Cloudinary

## Project Structure

- `index.js`: Main server file
- `routes/fileupload.js`: Defines API routes for file uploads
- `models/file.js`: Mongoose schema and model for file documents
- `config/database.js`: MongoDB connection setup
- `config/cloudinary.js`: Cloudinary configuration

## Dependencies

- `cloudinary`: ^2.2.0
- `dotenv`: ^16.4.5
- `express`: ^4.19.2
- `express-fileupload`: ^1.5.0
- `mongoose`: ^8.4.4
- `multer`: ^1.4.5-lts.1
- `nodemailer`: ^6.9.14

## Dev Dependencies

- `nodemon`: ^3.1.4

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgements

- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Cloudinary](https://cloudinary.com/)
- [Nodemailer](https://nodemailer.com/)


