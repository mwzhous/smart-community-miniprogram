import http from "../utils/http";
// 账户模块
const port = '8086/api/'

// 查看物业账单
export function getBill(param) {
  return http.get(port + "household/bill/list",param);
}

// 查看报修记录
export function getMaintain(params) {
  return http.get(port + "household/repair/list", params);
}
// 查看报修记录详情
export function getDetail(params) {
  return http.get(port + "household/repair/" + params);
}

// 获取报修详情页面
export function getDetails(params) {
  return http.get(port + "household/repair/" + params);
}
// 发布报修评价
export function posAdvice(param) {
  return http.post(port + "household/repair/assess",param,'json');
}
