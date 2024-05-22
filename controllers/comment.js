const { prisma } = require("../prisma/prisma-client");

/**
 * @route POST /api/comment/
 * @desc Добавить в портфолио
 * @access Public
 */
const all = async (req, res) => {
    try {
        const comments = await prisma.comments.findMany();
        return res.status(200).json(comments);
    } catch (err) {
        return res.status(500).json({
            message: "Возникла неизвестная ошибка на сервере!",
        });
    }
};

/**
 * @route POST /api/comment/add
 * @desc Добавить свадьбу
 * @access Public
 */
const add = async (req, res) => {
    const { name, comment } = req.body;
    if (!name || !comment) {
        return res.status(400).json({
            message: "Пожалуйста, заполните все обязательные поля",
        });
    }
    try {
        const comments = await prisma.comments.create({
            data: {
                name,
                comment
            },
        });
        return res.status(201).json(comments);
    } catch (err) {
        console.log(err)
        return res.status(400).json({ message: "Возникла неизвестная ошибка" });
    }
};

module.exports = {
    all, 
    add
}