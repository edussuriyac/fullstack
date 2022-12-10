import axios from "axios"
const baseUrl = "http://localhost:3003/api/users"

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll }
