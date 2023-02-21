import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getOne = (id) => {
  const request = axios.get(baseUrl+'/'+id)
  return request.then(response => response.data)
}

const create = async (newObject, id) => {
  //this now returns the created blog fetched fresh from the db
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)

  id = response.data.id
  const response2 = await axios.get(`${baseUrl}/${id}`)
  return response2.data
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl } /${id}`, newObject)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, getOne, create, update, setToken }