const multer = require('multer');
const path = require('path');
const { HOST } = require('../utils/constants')

const fileUploaderMiddleware = (fileType, fieldName, maxCount) => {

    var directory = `uploads/`;

    switch (fileType) {
        case "profileImage":
            directory = directory + `profileImages`;
            break;
        case "certificate":
            directory = directory + `certificates`;
            break;
        case "report":
            directory = directory + `reports`;
            break;
        default:
            break;
    }

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, directory);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now();
            const originalName = file.originalname;
            const fileExtension = path.extname(originalName);
            const filename = uniqueSuffix + '-' + req.user._id + fileExtension;
            cb(null, filename);
        }
    });

    const upload = multer({ storage });

    return (req, res, next) => {    

        console.log(directory + " " + req.user._id + "  " + fieldName);

        upload.array(fieldName, maxCount)(req, res, (err) => {
            if (err) {
                console.error("Error in middleware: " + err);
                return res.status(400).json({ success: false, message: 'File upload failed' });
            }

            if (!req.files || req.files.length === 0) {
                return res.status(400).json({ success: false, message: 'No files uploaded!!' });
            }

            if (req.files && req.files.length > 0) {
                const fileUrls = req.files.map(file => `${HOST}/${directory}/${file.filename}`);
                req.fileUrls = fileUrls;
            }
            next();
        });

    };


};

module.exports = fileUploaderMiddleware;