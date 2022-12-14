import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
   
  const response = await axios.get(baseUrl)
  console.log(response.data)
  return response.data
}

  //     content: anecdote,
    //     id: getId(),
    //     votes: 0

const createNew = async (anecdote) => {
  const object = { content: anecdote, votes:0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
  }


export default {
  getAll,
  createNew,
  update
}