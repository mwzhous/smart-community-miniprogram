import http from "../utils/http";
// 交流模块
const port = '8082/api/'

// 获取广场交流列表
export function getCommuntyGc(params) {
	return http.get(port + "community/Gc", params);
}
// 获取互助交流列表
export function getCommuntyHd(params) {
	return http.get(port + "community/interact/Hd", params);
}
// 获取二手交流列表
export function getCommuntyEs(params) {
	return http.get(port + "community/sechand/Es", params);
}
// 获取二手交流列表
export function getCommuntyPc(params) {
	return http.get(port + "community/car/Pc", params);
}
//获取广场详情
export function getCommuntyGcDetail(params) {
	return http.get(port + "community/" + params);
}
//获取互动详情
export function getCommuntyHdDetail(params) {
	return http.get(port + "community/interact/" + params);
}
//获取二手详情
export function getCommuntyEsDetail(params) {
	return http.get(port + "community/sechand/" + params);
}
//获取拼车详情
export function getCommuntyPcDetail(params) {
	return http.get(port + "community/car/" + params);
}

//获取评论
export function getComment(typeid, articleid,params) {
	return http.get(port + "community/comment/" + typeid + '/' + articleid, params);
}

//发布广场
export function postGc(params,type) {
	return http.postForm(port + "community/add",params,type);
}

//发布互助
export function postHz(params,type) {
	return http.postForm(port + "community/interact/add",params,type);
}
//发布二手
export function postEs(params,type) {
	return http.postForm(port + "community/sechand/add",params,type);
}
//发布拼车
export function posPc(params,type) {
	return http.postForm(port + "community/car/add",params,type);
}
//发布评论
export function posComment(params) {
	return http.post(port + "community/comment/add",params,'json');
}
//获取点赞
export function getCount(params) {
	return http.get(port + "praise/count/" , params);
}
//发布点赞
export function posCount(param) {
	return http.post(port + "praise/add" ,param,'json');
}
//获取收藏
export function getShouc(params) {
	return http.get(port + "collection/count/" , params);
}

//发布收藏
export function posShouc(params) {
	return http.post(port + "collection/add" ,params,'json');
}