import axios from 'axios'

const api = axios.create({
  baseURL: "https://api-ask-demo.herokuapp.com/api"
})

export default api