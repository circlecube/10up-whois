import axios from 'axios';

export default axios.create({
	baseURL: "https://circlecube.com/uspresidents/wp-json/wp/v2",
	method: 'get',
	responseType: 'json',
});