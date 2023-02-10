const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')


describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('pawsword', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('user created with valid user name', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'mina',
        name: 'Mina Itse',
        password: 'rawrxd',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('cant create user if username taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'root',
          name: 'groot',
          password: 'amgroot',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.error).toContain('expected `username` to be unique')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })
  })
