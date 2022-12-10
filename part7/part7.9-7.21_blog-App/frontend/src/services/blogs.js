import axios from "axios"

const baseUrl = "http://localhost:3003/api/blogs"
let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}
const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.get(baseUrl, config)
  return request.then((response) => response.data)
}

const create = (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  return axios.post(baseUrl, newObject, config)
}

const update = (newObject) => {
  const id = newObject.id
  const config = {
    headers: { Authorization: token },
  }
  return axios.put(`${baseUrl}/${id}`, newObject, config)
}

const deleteBlog = (id) => {
  console.log(id)
  const config = {
    headers: { Authorization: token },
  }
  console.log(`${baseUrl}/${id}`)
  return axios.delete(`${baseUrl}/${id}`, config)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, deleteBlog, setToken }
