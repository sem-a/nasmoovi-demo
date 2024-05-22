const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET /api/weeding
 * @desc Получить все свадьбы
 * @access Public
 */
const all = async (req, res) => {
    try {
        const weedings = await prisma.weeding.findMany();
        return res.status(200).json(weedings);
    } catch (err) {
        return res.status(500).json({
            message: "Возникла неизвестная ошибка на сервере!",
        });
    }
};

/**
 * @route GET /api/weeding/:id
 * @desc Получить одну свадьбу
 * @access Public
 */
const one = async (req, res) => {
    try {
        const id = req.params.id;
        const weeding = prisma.weeding.findFirst({
            where: {
                id,
            },
        });
        if (!weeding) {
            return res.status(404).json({
                message: "Страница не найдена!",
            });
        } else {
            return res.status(200).json(weeding);
        }
    } catch (err) {
        return res.status(500).json({
            message: "Возникла неизвестная ошибка на сервере!",
        });
    }
};

/**
 * @route POST /api/weeding/add
 * @desc Добавить свадьбу
 * @access Public
 */
const add = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({
            message: "Пожалуйста, заполните все обязательные поля",
        });
    }
    try {
        const weeding = await prisma.weeding.create({
            data: {
                name,
            },
        });
        return res.status(201).json(weeding);
    } catch (err) {
        return res.status(400).json({ message: "Возникла неизвестная ошибка" });
    }
};

/**
 * @route POST /api/weeding/del/:id
 * @desc Удалить свадьбу
 * @access Public
 */
const del = async (req, res) => {
    const id = req.params.id;
    try {
        await prisma.weeding.delete({
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
 * @route POST /api/weeding/edit/:id
 * @desc Редактировать свадьбу
 * @access Public
 */
const edit = async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    try {
        await prisma.weeding.update({
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
    one,
    add,
    del,
    edit,
};
