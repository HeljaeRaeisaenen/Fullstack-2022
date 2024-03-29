const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) => {
    console.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError') {
      return response.status(400).send({ error: error.message })
    }
    else if (error.name == 'JsonWebTokenError') {
      return response.status(400).json({ error: 'token missing or invalid' })
    }
    else if (error.name === 'TokenExpiredError') {
      return response.status(401).json({
        error: 'token expired'})
    }
  
    next(error)
  }

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  }

  next()
}

const userExtractor = (request, response, next) => {
  if (!['DELETE','POST','PUT'].includes(request.method)) {
    return next()
  } 
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }
  request.userId = decodedToken.id
  next()
}

module.exports = {errorHandler, tokenExtractor, userExtractor}