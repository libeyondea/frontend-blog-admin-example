import axios from 'axios';
import config from 'config';

const httpRequest = {
	get: ({ baseUrl = process.env.REACT_APP_API_URL, url, token, params }) => {
		return axios({
			timeout: config.REQUEST.TIMEOUT,
			method: 'get',
			baseURL: baseUrl,
			url: url,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token || ''
			},
			params: params
		});
	},
	post: ({ baseUrl = process.env.REACT_APP_API_URL, url, token, data }) => {
		return axios({
			timeout: config.REQUEST.TIMEOUT,
			method: 'post',
			baseURL: baseUrl,
			url: url,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token || ''
			},
			data: data
		});
	},
	put: ({ baseUrl = process.env.REACT_APP_API_URL, url, token, data }) => {
		return axios({
			timeout: config.REQUEST.TIMEOUT,
			method: 'put',
			baseURL: baseUrl,
			url: url,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token || ''
			},
			data: data
		});
	},
	delete: ({ baseUrl = process.env.REACT_APP_API_URL, url, token, params }) => {
		return axios({
			timeout: config.REQUEST.TIMEOUT,
			method: 'delete',
			baseURL: baseUrl,
			url: url,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				Authorization: 'Bearer ' + token || ''
			},
			params: params
		});
	},
	formDataPost: ({ baseUrl = process.env.REACT_APP_API_URL, url, token, data, files }) => {
		const formData = new FormData();
		if (data) {
			for (let field in data) {
				formData.set(field, data[field]);
			}
		}
		if (files) {
			for (let field in files) {
				if (files[field]) {
					formData.append(field, files[field], files[field].name);
				}
			}
		}
		return axios({
			timeout: config.REQUEST.TIMEOUT,
			method: 'post',
			baseURL: baseUrl,
			url: url,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
				Authorization: 'Bearer ' + token || ''
			},
			data: formData
		});
	},
	formDataPut: ({ baseUrl = process.env.REACT_APP_API_URL, url, token, data, files }) => {
		const formData = new FormData();
		if (data) {
			for (let field in data) {
				formData.set(field, data[field]);
			}
		}
		if (files) {
			for (let field in files) {
				if (files[field]) {
					formData.append(field, files[field], files[field].name);
				}
			}
		}
		formData.append('_method', 'PUT');
		return axios({
			timeout: config.REQUEST.TIMEOUT,
			method: 'post',
			baseURL: baseUrl,
			url: url,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'multipart/form-data',
				Authorization: 'Bearer ' + token || ''
			},
			data: formData
		});
	}
};

export default httpRequest;
