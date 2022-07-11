import http from "../utils/http";
// 停车模块
const port = '8085/api/'

// 查看附件停车场
export function getPark(longitude,latitude) {
  return http.post(port + `park/parkingList?longitude=${longitude}&latitude=${latitude}`)
}

// 贵宾邀请
export function putValide(params) {
  return http.post(port + "invitation/add", params, 'json');
}

// 查看车位管理
export function getStall(params) {
  return http.get(port + "park/manageCarport", params);
}

// 租赁车位
export function putPlain(params) {
  return http.post(port + "invitation/add", params, 'json');
}

//查看停车卡信息
export function getCard() {
  return http.get(port + 'park/card')
}

// 查看可租赁车位
export function getAbleRental() {
  return http.get(port + 'park/ableRental')
}

// 查看贵宾邀请记录
export function getRecord(params) {
  return http.get(port + "invitation/record", params);
}

//查看社区名信息
export function getParkName() {
  return http.get(port + 'park/parkName')
}

//获取临时停车收费规则
export function getChargeRule() {
  return http.get(port + 'parkingRule/select')
}

//计算停车费用
export function putParkFee(params) {
  return http.post(port + 'parkingRule/totalPrice',params)
}

//停车结束
export function putParkEnd(params) {
  return http.post(port + 'parkingRule/parking',params)
}

//查看可停车车位信息
export function getParkMessage() {
  return http.post(port + 'parkingRule/ableParking')
}

//获取可租赁车位
export function getRentalCar() {
  return http.get(port + 'park/selectCarRental')
}

//开始停车
export function putParkStart(params) {
  return http.post(port + 'parkingRule/firstParking',params, 'json')
}

//获取停车状态
export function getParkState() {
  return http.get(port + 'parkingRule/isExisting')
}



