let EasyYandexS3 = require('easy-yandex-s3').default;
require('dotenv').config();

// Инициализация
let s3 = new EasyYandexS3({
  auth: {
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
  Bucket: 'nasmoovi-backet', // например, "my-storage",
  debug: true, // Дебаг в консоли, потом можете удалить в релизе
});

module.exports = {
    s3,
}