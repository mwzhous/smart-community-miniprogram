import http from '../utils/http'
// 社区服务
const port = '8087/api/'

// 获取社区服务首页
export function getFleaGoodsHot(params) {
	return http.get(port + "fleaMarket/hot", params);
}

//获取房产交易页面
export function getFangChan(params) {
	return http.get(port + "estate/", params);
}
//获取房产详情页面
export function getFangChanDetail(param) {
	return http.get(port + "estate/" + param);
}

// 获取我的房产收藏
export function getFangChanShouCang(param) {
	return http.get(port + "estate/marks/",param);
}

//房产收藏
export function fangChanShouCang(param) {
	return http.post(port + "estate/mark/" + param);
}

//房产取消收藏
export function quXiaoFangChanShouCang(param) {
	return http.delete(port + "estate/mark/" + param);
}
//获取社区服务的活动公告
export function getAnnouncement() {
  return http.get(port + 'fleaMarket/ads')
}
