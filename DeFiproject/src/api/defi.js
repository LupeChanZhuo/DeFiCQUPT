import request from '@/utils/newRequest'

export function getDataFunction() {
	window.console.log("api/getDataFunction")
	return request({
		url: '/getData',
		method: 'get',
		baseURL:'http://loaclhost:8080'
	})
}