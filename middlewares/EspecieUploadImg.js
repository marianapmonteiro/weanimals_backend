const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads/especies'));
    },
    filename: (req, file, cb) => {
        const fileName = Date.now().toString().replace(/:/g, '-') + file.originalname;
        cb(null, fileName);
    },
});

const uploadEspecie = multer({ storage });

module.exports = { uploadEspecie };
