import axios from 'axios';
import { BACKEND_URL } from '../backend';

export makeUrl = (url) =>{
	return BACKEND_URL+url
}

export const sign_in = (data) =>{
	let formData = new FormData();
	for(const name in data){
		formData.append(name,data[name]);
	}

	return axios.post(
		makeUrl('/user/sign_in')
	)
}

export const sign_up = (data) =>{
	let formData = new FormData();
	for(const name in data){
		formData.append(name,data[name]);
	}

	return axios.post(
		makeUrl('/user/sign_up')
	)
}