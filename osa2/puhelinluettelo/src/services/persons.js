import axios from "axios"

const baseUrl = 'http://localhost:3001/persons'

const getAllPersons = () => {
    return axios
    .get(baseUrl)
    .then(response => {return response.data})
}

  
const createPerson = newObject => {
    return axios
    .post(baseUrl, newObject)
    .then(response => {return response.data})
}

const deletePerson = id => {
    const url = `${baseUrl}/${id}`
    return axios
    .delete(url)
    .then(() => {return getAllPersons()})
}

const updatePerson = newObject => {
    const url = `${baseUrl}/${newObject.id}`
    return axios
    .put(url, newObject)
    .then(() => getAllPersons())
}

export default {getAllPersons, createPerson, deletePerson, updatePerson}