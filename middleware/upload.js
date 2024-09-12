const multer = require("multer");
const path = require("path");

const storagePhoto = multer.memoryStorage();
const uploadPhoto = multer({ storage: storagePhoto });

const storageVideo = multer.memoryStorage();

const fileFilterVideo = (req, file, cb) => {
    const allowedExtensions = /\.(mp4|mov|avi|wmv|flv)$/i;
    const allowedMimeTypes = [
        'video/mp4',
        'video/quicktime',
        'video/x-msvideo',
        'video/x-ms-wmv',
        'video/x-flv'
    ];

    const isExtensionValid = allowedExtensions.test(
        path.extname(file.originalname).toLowerCase()
    );
    const isMimeTypeValid = allowedMimeTypes.includes(file.mimetype);

    if (isExtensionValid && isMimeTypeValid) {
        cb(null, true);
    } else {
        cb(new Error("Только видео форматы разрешены!"), false);
    }
};

const uploadVideo = multer({
    storage: storageVideo,
    fileFilter: fileFilterVideo,
    limits: {
        fileSize: 1 * 1024 * 1024 * 1024
    }
});

module.exports = {
    uploadPhoto,
    uploadVideo,
};
