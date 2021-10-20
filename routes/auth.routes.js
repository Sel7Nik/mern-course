const { Router } = require('express')
const bcryptjs = require('bcryptjs')
const router = Router()

const User = require('../models/User')

router.post('/register', async (req, res) => {
  try {
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
})

router.post('/login', async (req, res) => {
  try {
  } catch (error) {
    res.status(500)
  }
})

module.exports = router
