import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data //request.then(response => response.data)
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async (newObject, id) => {
  //this now returns the created blog fetched fresh from the db
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)

  id = response.data.id
  const response2 = await getOne(id)//await axios.get(`${baseUrl}/${id}`)
  return response2
}

const update = async (id, newObject) => {

  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${ baseUrl }/${id}`, newObject, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, getOne, create, update, setToken }