import http from "../utils/http";
import { posPc } from "./communication";
// 物业模块
const port = '8086/api/'
// 
export function getCommucation() {
	return http.get(port + "");
}

//社区活动列表
export function getActive() {
	return http.get(port + "household/active/list");
}
//投诉记录列表
export function getComplainList(params) {
	return http.get(port + "household/complain/list",params);
}

//提交在线报修
export function postRepair(params,type) {
	return http.postForm(port + "household/repair/add",params,type);
}

//提交投诉建议
export function postAdvise(params,type) {
	return http.postForm(port + "household/complain/add",params,type);
}

//投诉记录详情
export function getTsDetail(id) {
	return http.get(port + 'household/complain/' + id)
}