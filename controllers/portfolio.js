const { prisma } = require("../prisma/prisma-client");
const sizeOf = require("image-size");
const { s3 } = require("../cloud-s3/cloud");

/**
 * @route POST /api/portfolio/
 * @desc Добавить в портфолио
 * @access Public
 */
const all = async (req, res) => {
    try {
        const portfolio = await prisma.portfolio.findMany();
        return res.status(200).json(portfolio);
    } catch (err) {
        return res.status(500).json({
            message: "Возникла неизвестная ошибка на сервере!",
        });
    }
};

const editPreview = async (req, res) => {
    const { id, preview } = req.body;
    try {
        await prisma.portfolio.update({
            where: {
                id,
            },
            data: {
                preview,
            },
        });
    } catch (err) {
        return res.status(500).json({
            message: "Произошла неизвестная ошибка!",
        });
    }
};

const forPreview = async (req, res) => {
    const { id } = req.params;
    try {
        const portfolio = await prisma.portfolio.findMany({
            where: {
                weddingId: id,
                preview: true,
            },
        });
        return res.status(200).json(portfolio);
    } catch (err) {
        return res.status(500).json({
            message: "Возникла неизвестная ошибка на сервере!",
        });
    }
};

/**
 * @route POST /api/portfolio/:wedding
 * @desc Добавить в портфолио
 * @access Public
 */
const forId = async (req, res) => {
    const wedding = req.params.wedding;
    try {
        const portfolio = await prisma.portfolio.findMany({
            where: {
                weddingId: wedding,
            },
        });
        return res.status(200).json(portfolio);
    } catch (err) {
        return res.status(500).json({
            message: "Возникла неизвестная ошибка на сервере!",
        });
    }
};

/**
 * @route POST /api/portfolio/add/:id
 * @desc Добавить в портфолио
 * @access Public
 */
const add = async (req, res) => {
    try {
        const { id: weddingId, preview } = req.params;
        const files = req.files;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const size = sizeOf(file.buffer);

            // Загрузка файла в Yandex Cloud Storage
            let upload = await s3.Upload(
                {
                    buffer: file.buffer, // Используем buffer из объекта файла
                },
                "/portfolio/"
            );
            await prisma.portfolio.create({
                data: {
                    imgPath: `https://nasmoovi-backet.storage.yandexcloud.net/${upload.Key}`,
                    width: size.width,
                    height: size.height,
                    weddingId,
                    preview: false,
                },
            });
        }

        return res.status(200).json({ weddingId });
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            message: "Возникла ошибка при загрузке файлов",
            error: err,
        });
    }
};

/**
 * @route POST /api/portfolio/del/:id
 * @desc Удалить из портфолио
 * @access Public
 */
const del = async (req, res) => {
    const id = req.params.id;
    try {
        await prisma.portfolio.delete({
            where: {
                id,
            },
        });
        return res.status(204).json({
            message: "OK",
        });
    } catch (err) {
        return res
            .status(400)
            .json({ message: "Возникала неизвестная ошибка" });
    }
};

/**
 * @route POST /api/portfolio/alldel/:id
 * @desc Удалить из портфолио целую свадьбу
 * @access Public
 */
const alldel = async (req, res) => {
    const id = req.params.id;
    try {
        const portfolio = await prisma.portfolio.findMany({
            where: {
                weddingId: id,
            },
            select: {
                imgPath: true,
            },
        });

        for (const image of portfolio) {
            // Извлечение пути из ссылки
            const pathParts = image.imgPath.split("/");
            const filePath = pathParts[pathParts.length - 1];
            await s3.Remove(`/portfolio/${filePath}`);
        }

        // Удаление записей из базы данных
        await prisma.portfolio.deleteMany({
            where: {
                weddingId: id,
            },
        });

        return res.status(204).json({
            message: "OK",
        });
    } catch (err) {
        return res
            .status(400)
            .json({
                message: "Возникла ошибка при удалении файлов",
                error: err,
            });
    }
};
/**
 * @route POST /api/portfolio/edit/:id
 * @desc изменить портфолио
 * @access Public
 */
const edit = async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    try {
        await prisma.portfolio.update({
            where: {
                id,
            },
            data,
        });
        return res.status(204).json({
            message: "OK",
        });
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Не удалось изменить сотрудника" });
    }
};

module.exports = {
    all,
    editPreview,
    forPreview,
    forId,
    add,
    del,
    edit,
    alldel,
};
