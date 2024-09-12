const { prisma } = require("../prisma/prisma-client");
const fs = require("fs");
const util = require("util");
const { s3 } = require("../cloud-s3/cloud");

/**
 * @route POST /api/video/
 * @desc Добавить в портфолио
 * @access Public
 */
const all = async (req, res) => {
    try {
        const video = await prisma.video.findMany();
        return res.status(200).json(video);
    } catch (err) {
        return res.status(500).json({
            message: "Возникла неизвестная ошибка на сервере!",
        });
    }
};

/**
 * @route POST /api/video/add
 * @desc Добавить в портфолио
 * @access Public
 */
const add = async (req, res) => {
    try {
        const { name } = req.body;
        // Поскольку загружается один файл, используем req.file, а не req.files

        // Загрузка файла в Yandex Cloud Storage
        let upload = await s3.Upload(
            {
                buffer: req.file.buffer, // Используем buffer из объекта файла
            },
            "/video/"
        );

        // Создаем запись в базе данных для видео
        const video = await prisma.video.create({
            data: {
                videoPath: `https://nasmoovi-backet.storage.yandexcloud.net/${upload.Key}`,
                name: name,
            },
        });

        // Возвращаем ответ с успешным статусом
        return res.status(200).json({ video });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: "Возникла ошибка при загрузке видео файла", error: err });
    }
};
/**
 * @route POST /api/video/del/:id
 * @desc Удалить из портфолио
 * @access Public
 */

const del = async (req, res) => {
    const id = req.params.id;
    try {
        const video = await prisma.video.findFirst({
            where: {
                id,
            },
            select: {
                videoPath: true,
            },
        });

         // Проверяем, существует ли информация о видео
         if (video) {

            const pathParts = video.videoPath.split("/");
            const filePath = pathParts[pathParts.length - 1];
            await s3.Remove(`/video/${filePath}`);

            // Удаляем запись о видео из базы данных
            await prisma.video.deleteMany({
                where: {
                    id,
                },
            });

            return res.status(204).json({
                message: "OK",
            });
        } else {
            return res.status(404).json({
                message: "Видео не найдено",
            });
        }
    } catch (err) {
        return res
            .status(400)
            .json({ message: "Возникала неизвестная ошибка", error: err });
    }
};

module.exports = {
    all,
    del,
    add
}