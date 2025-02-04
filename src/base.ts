import axios from 'axios'

const baseURL = process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:3001/api'
const instance = axios.create({
	baseURL,
	// withCredentials: true
	headers: {
		'Access-Control-Allow-Headers': "*",
		'Access-Control-Allow-Origin': "http://localhost:3001/api"
	},
})

export default instance;
