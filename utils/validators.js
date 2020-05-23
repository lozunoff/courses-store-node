const { body } = require('express-validator');

const User = require('../models/user');

exports.registerValidators = [
  body('email')
    .isEmail().withMessage('Введите корректный email')
    .custom(async (value) => {
      try {
        const user = await User.findOne({
          email: value,
        });

        if (user) {
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject('Пользователь с таким email уже существует');
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
      }
    })
    .normalizeEmail(),
  body('password', 'Допустимая длина пароля от 6 до 56 символов')
    .isLength({ min: 6, max: 56 }).isAlphanumeric()
    .trim(),
  body('confirm')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Пароли должны совпадать');
      }

      return true;
    })
    .trim(),
  body('name')
    .isLength({ min: 3 }).withMessage('Имя должно быть минимум 3 символа')
    .trim(),
];

exports.courseValidators = [
  body('title')
    .isLength({ min: 3 }).withMessage('Минимальная длина названия 3 символа')
    .trim(),
  body('price')
    .isNumeric().withMessage('Введите корректную цену'),
  body('img', 'Введите корректный URL картинки')
    .isURL(),
];
