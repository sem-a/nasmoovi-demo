const { prisma } = require("../prisma/prisma-client");
const sizeOf = require("image-size");
const fs = require("fs");
const path = require("path");
const util = require("util");

const unlinkAsync = util.promisify(fs.unlink);

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
                weedingId: id,
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
 * @route POST /api/portfolio/:weeding
 * @desc Добавить в портфолио
 * @access Public
 */
const forId = async (req, res) => {
    const weeding = req.params.weeding;
    try {
        const portfolio = await prisma.portfolio.findMany({
            where: {
                weedingId: weeding,
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
        const { id: weedingId, preview } = req.params;
        const filePaths = req.files.map((file) => file.path);

        for (let i = 0; i < filePaths.length; i++) {
            const element = filePaths[i];
            const size = sizeOf(element);
            const portfolio = await prisma.portfolio.create({
                data: {
                    imgPath: element,
                    width: size.width,
                    height: size.height,
                    weedingId,
                    preview: false,
                },
            });
        }
        return res.status(200).json({ weedingId: weedingId });
    } catch (err) {
        return res
            .status(400)
            .json({ message: "Возникла неизвестная ошибка", error: err });
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
                weedingId: id,
            },
            select: {
                imgPath: true,
            },
        });

        for (const image of portfolio) {
            await unlinkAsync(image.imgPath);
        }

        await prisma.portfolio.deleteMany({
            where: {
                weedingId: id,
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
