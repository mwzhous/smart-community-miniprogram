import http from "../utils/http";
// 社区商店
const port = '8083/api/'

//获取跳蚤市场页面
export function getAllTiaoZao(params){
  return http.get(port + "fleaMarket",params)
}
//获取跳蚤商品数据类型
export function getGoodsType(){
  return http.get(port + "fleaGoodsType")
}
//获取跳蚤市场手机页面
export function getAllPhone(params){
  return http.get(port + "fleaMarket/filter",params)
}
//获取手机价格降序排列
export function getDescendingOrderPhone(params){
  return http.get(port + "fleaMarket/filter",params)
}
//根据id获取跳蚤市场商品信息
export function getDetail(param){
  return http.get(port + "fleaMarket/"+param)
}

//获取商品类型
export function getFleaGoodsType(){
  return http.get(port + "fleaGoodsType")
}
//添加商品
export function pushFleaMarket(params,type){
  return http.postForm(port + "fleaMarket",params,type)
}

// 获取跳蚤市场收藏
export function getCollection(param){
  return http.get(port + "fleaMarket/mark",param)
}

//添加收藏
export function pushCollection(param){
  return http.post(port + "fleaMarket/mark/"+param)
}

//取消收藏
export function deleteCollection(param){
  return http.delete(port + "fleaMarket/mark/"+param)
}
//获取上架提交记录
export function getOnRecord(param){
  return http.get(port + "fleaMarket/myOrder/",param)
}
