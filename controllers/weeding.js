const { prisma } = require("../prisma/prisma-client");

/**
 * @route GET /api/weeding
 * @desc Получить все свадьбы
 * @access Public
 */
const all = async (req, res) => {
  try {
    const weddings = await prisma.wedding.findMany();
    return res.status(200).json(weddings);
  } catch (err) {
    return res.status(500).json({
      message: "Возникла неизвестная ошибка на сервере!",
    });
  }
};

/**
 * @route GET /api/wedding/:id
 * @desc Получить одну свадьбу
 * @access Public
 */
const one = async (req, res) => {
  try {
    const id = req.params.id;
    const wedding = prisma.wedding.findFirst({
      where: {
        id,
      },
    });
    if (!wedding) {
      return res.status(404).json({
        message: "Страница не найдена!",
      });
    } else {
      return res.status(200).json(wedding);
    }
  } catch (err) {
    return res.status(500).json({
      message: "Возникла неизвестная ошибка на сервере!",
    });
  }
};

/**
 * @route POST /api/wedding/add
 * @desc Добавить свадьбу
 * @access Public
 */
const add = async (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({
      message: "Пожалуйста, заполните все обязательные поля",
    });
  }
  try {
    const wedding = await prisma.wedding.create({
      data: {
        name,
        description,
      },
    });
    return res.status(201).json(wedding);
  } catch (err) {
    return res.status(400).json({ message: "Возникла неизвестная ошибка" });
  }
};

/**
 * @route POST /api/wedding/del/:id
 * @desc Удалить свадьбу
 * @access Public
 */
const del = async (req, res) => {
  const id = req.params.id;
  try {
    await prisma.wedding.delete({
      where: {
        id,
      },
    });
    return res.status(204).json({
      message: "OK",
    });
  } catch (err) {
    return res.status(400).json({ message: "Возникала неизвестная ошибка" });
  }
};

/**
 * @route POST /api/wedding/edit/:id
 * @desc Редактировать свадьбу
 * @access Public
 */
const edit = async (req, res) => {
  const data = req.body;
  const id = req.params.id;
  try {
    await prisma.wedding.update({
      where: {
        id,
      },
      data,
    });
    return res.status(204).json({
      message: "OK",
    });
  } catch (err) {
    return res.status(500).json({ message: "Не удалось изменить сотрудника" });
  }
};

/**
 * @route GET /api/wedding/name/:id
 * @desc Получить название свадьбы
 * @access Public
 */
const name = async (req, res) => {
  const id = req.params.id;
  try {
    const name = await prisma.wedding.findUnique({
      where: {
        id,
      },
      select: {
        name: true,
        description: true,
      },
    });
    return res.status(200).json(name);
  } catch (err) {
    return res.status(500).json({ message: "Не удалось получить данные" });
  }
};

module.exports = {
  all,
  one,
  add,
  del,
  edit,
  name,
};
