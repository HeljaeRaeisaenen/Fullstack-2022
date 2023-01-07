import axios from "axios"

const baseUrl = '/api/persons'

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
    .then((response) => {return getAllPersons()})
}

const updatePerson = newObject => {
    const url = `${baseUrl}/${newObject.id}`
    return axios
    .put(url, newObject)
    .then((response) => getAllPersons())
}

export default {getAllPersons, createPerson, deletePerson, updatePerson}