import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3001/api'
const instance = axios.create({
	baseURL,
	withCredentials: true,
	headers: {

	}
})

export default instance;
