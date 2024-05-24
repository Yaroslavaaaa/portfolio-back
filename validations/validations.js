import { body } from 'express-validator'



export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 8 символов').isLength({ min: 8 }),
  ];


export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум восемь символов').isLength({min: 8}),
    body('name', 'Укажите имя').isLength({min: 3}),
]


export const projectCreateValidation = [
    body('title', 'Введите заголовок проекта').isLength({ min: 3 }).isString(),
    body('description', 'Введите описание проекта').isLength({ min: 3 }).isString(),
    body('link', 'Неверная ссылка на проект').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
  ];