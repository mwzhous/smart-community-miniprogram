import http from "../utils/http";
// 账户模块
const port = '8081/api/'

// 修改个人信息
export function personEdit(params) {
  return http.put(port + "/personal", params, 'json');
}

// 小区列表
export function getSwitch(params) {
  return http.get(port + "personal/community", params);
}

// 切换小区
export function changeCommunity(params) {
  return http.put(port + "/personal/community", params, 'json');
}

// 获取家庭成员列表
export function getFamily(params) {
  return http.get(port + "personal/family", params);
}

// 修改家庭成员
export function memberEdit(params) {
  return http.put(port + "/personal/family", params, 'json');
}

// 新增家庭成员
export function memberAdd(params) {
  return http.post(port + "/personal/family", params, 'json');
}

// 获取收藏列表
export function getCollection(params) {
  return http.get(port + "personal/collection", params);
}

// 获取我的钱包
export function getPurse(params) {
  return http.get(port + "personal/purse", params);
}

// 获取我的积分
export function getIntegral() {
  return http.get(port + "personal/integration");
}
// 上传头像
export function upload(params, type) {
  return http.postForm(port + "avatar/upload", params, type);
}

// 获取优惠卷
export function getCoupon(params) {
  return http.get(port + "personal/coupon", params);
}

// 设置-意见反馈
export function feedBack(params) {
  return http.post(port + "personal/feedback", params, 'json');
}

// 获取签到签到
export function getSignIn() {
  return http.get(port + "personal/sign/in");
}

// 签到
export function signIn(params) {
  return http.post(port + "personal/sign/in", params, 'json');
}








