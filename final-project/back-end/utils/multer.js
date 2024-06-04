const multer = require('multer');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = '../React-Final-Project/public/'; // Base upload path
        const email = req.body.email;
        const productName = req.body.title;
        const category = req.body.category;
        // Create a dynamic folder name based on current date
        const folderName = (email ? email : (productName ? productName : category)) + new Date().toISOString().split('T')[0];
        const fullPath = path.join(uploadPath, (email ? folderName : folderName.split(' ').join('-')));
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
        }

        cb(null, fullPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    }
});

const upload = multer({ storage: storage }).array('images', 5); // Up to 5 images

exports.uploadImage = (req, res, next) => {
    return new Promise((resolve, reject) => {
        upload(req, res, (err) => {
            if (err) {
                reject(err);
            } else {
                // Files uploaded successfully
                console.log('Files uploaded successfully');
                resolve();
            }
        });
    });
};


