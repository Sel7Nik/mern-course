const { Router } = require('express')
const bcryptjs = require('bcryptjs')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()

//!-----------------
//!--- register ---|
//!-----------------
router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при регистрации',
        })
      }

      const { email, password } = req.body

      const candidat = await User.findOne({ emai: email }) //? можно просто {email}

      if (candidat) {
        return res
          .status(400)
          .json({ message: 'Такой пользователь уже существует' })
      }

      const hashedPass = await bcryptjs.hash(password, 12)

      const user = new User({ email: email, password: hashedPass })

      await user.save()

      res.status(201).json({ message: 'Пользователь создан' })
    } catch (error) {
      res.status(500).json({ message: 'Что-то пощло не так, попробуйте снова' })
    }
  }
)
//!--------------
//!--- login ---|
//!--------------
router.post(
  '/login',
  [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректные данные при входе в систему',
        })
      }

      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' })
      }

      const isMatch = await bcryptjs.compare(password, user.password)

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: 'Неверный пароль, попробуйте снова' })
      }
    } catch (error) {
      res.status(500).json({ message: 'Что-то пощло не так, попробуйте снова' })
    }
  }
)

module.exports = router
