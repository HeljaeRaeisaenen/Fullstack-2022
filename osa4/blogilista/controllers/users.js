const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

function passwordValidation (password) {
  if (password.length < 4) {
    return false
  }
  return true
}


usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const valid = passwordValidation(password)
  if (!valid) {
    response.status(400).send(
      {error: 'Password must be more than 3 characters long'}
    )
    
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
        .populate('blogs', {title: 1, author: 1, url: 1, likes: 1})

  response.json(users)
})

module.exports = usersRouter