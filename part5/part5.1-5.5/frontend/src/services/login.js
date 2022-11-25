import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

const login = async credentials => {
  console.log(baseUrl)
  const response = await axios.post(baseUrl, credentials)
  console.log(response)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login }