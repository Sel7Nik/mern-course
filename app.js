const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth.routes')

const app = express()

// app.use(express.json())
app.use(express.json({ extended: true }))

app.use('/api/auth', authRoutes)
// app.use('/api/auth', require('./routes/auth.routes'))
/* или так, */ //? что бы не создавать отдельную переменную
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

const PORT = config.get('port') || 5000

const start = async () => {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    )
  } catch (error) {
    console.log('Server Error', error.message)
    process.exit(1)
  }
}

start()
