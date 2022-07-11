import http from "../utils/http";
// 首页服务
const port = '8084/api/'
// 获取首页轮播图
export function getSwiper(type) {
    return http.get(port + "index/advertising/" + type);
}

// 获取首页咨询
export function getInfo(params) {
    return http.get(port + "index/news", params);
}

// 获取首页小区
export function getXiaoqu() {
    return http.get(port + 'index/community')
}

//获取咨询详情
export function getDetail(param) {
    return http.get(port + 'index/news/detail', param)
}
//获取评论的列表
export function getComment(newsid, param) {
    return http.get(port + 'index/news/comment/' + newsid, + param)
}
//发布评论的列表
export function posComment(param) {
    return http.post(port + 'index/news/comment', param, 'json')
}

//获取该用户拥有的智能设备
export function getSmartHome() {
    return http.get(port + 'smartHome/deviceList')
}

// 添加智能设备
export function addSmartHome(params) {
    return http.post(port + 'smartHome/add', params, 'json')
}

// 智能设备详情页
export function getSocketInfo(params) {
    return http.get(port + 'smartHome/getSocketInfo', params)
}
// 智能设备开关
export function openSocketInfo(params) {
    return http.post(port + 'smartHome/socket/enable', params, 'json')
}

//点赞评论的列表
export function postThump(param) {
    return http.post(port + 'index/news/comment/thumpUp', param, 'json')
}
//取消点赞评论的列表
export function postCancel(param) {
    return http.post(port + 'index/news/comment/cancelThumpUp', param, 'json')
}
//首页轮播详情
export function lunboDetail(id) {
    return http.get(port + 'index/ability/detail/' + id)
}