const multer = require("multer");
const path = require("path");

// Настройка multer для сохранения загружаемых видео
const storageVideo = multer.diskStorage({
    destination: (req, file, cb) => {
        // Измените путь на нужный вам
        cb(null, "uploads/video");
    },
    filename: (req, file, cb) => {
        // Генерация уникального имени файла
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        // Сохраняем оригинальное расширение файла
        const ext = path.extname(file.originalname);
        cb(null, `${uniqueSuffix}${ext}`);
    },
});

// Фильтр для проверки, что загружаемый файл является видео
const fileFilterVideo = (req, file, cb) => {
    // Регулярное выражение для проверки расширения файла
    const allowedExtensions = /\.(mp4|mov|avi|wmv|flv)$/i;
    // Список разрешённых MIME-типов
    const allowedMimeTypes = [
        'video/mp4',
        'video/quicktime', // Добавлен MIME-тип для файлов .mov
        'video/x-msvideo',
        'video/x-ms-wmv',
        'video/x-flv'
    ];

    // Проверяем расширение файла
    const isExtensionValid = allowedExtensions.test(
        path.extname(file.originalname).toLowerCase()
    );
    // Проверяем MIME-тип файла
    const isMimeTypeValid = allowedMimeTypes.includes(file.mimetype);

    if (isExtensionValid && isMimeTypeValid) {
        cb(null, true);
    } else {
        cb(new Error("Только видео форматы разрешены!"), false);
    }
};

const storagePhoto = multer.diskStorage({
    // Настройка multer для сохранения файлов картинок
    destination: (req, file, cb) => {
        cb(null, "uploads/portfolio");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + "-" + file.originalname);
    },
});

const uploadPhoto = multer({ storage: storagePhoto });

const uploadVideo = multer({
    storage: storageVideo,
    fileFilter: fileFilterVideo,
});

module.exports = {
    uploadPhoto,
    uploadVideo,
};
