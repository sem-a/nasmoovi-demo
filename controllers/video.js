const { prisma } = require("../prisma/prisma-client");
const fs = require("fs");
const util = require("util");

const unlinkAsync = util.promisify(fs.unlink);

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
        const filePath = req.file.path;

        // Создаем запись в базе данных для видео
        const video = await prisma.video.create({
            data: {
                videoPath: filePath,
                name: name,
            },
        });

        // Возвращаем ответ с успешным статусом
        // Предполагается, что переменная weedingId должна быть определена в вашем коде
        // Если она не определена, замените её на соответствующее значение
        return res.status(200).json({ video });
    } catch (err) {
        console.log(err)
        return res
            .status(400)
            .json({ message: "Возникла неизвестная ошибка", error: err });
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
            // Путь к файлу видео
            const videoPath = `${video.videoPath}`;

            // Удаляем файл видео с файловой системы
            await unlinkAsync(videoPath);

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