import axios from "axios"

const baseUrl = "http://localhost:3003/api/blogs/:id/comments"

const getAll = () => {

  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (newObject) => {

  return axios.post(baseUrl, newObject)
}


// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create}