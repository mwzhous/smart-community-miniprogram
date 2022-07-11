import http from "../utils/http";
// 社区商店
const port = '8088/api/'
//获取所有商店列表
export function getGoods(id, param) {
    return http.get(port + 'shop/list/' + id, param)
}
//获取商店介绍详情
export function getGoodsDetail(id) {
    return http.get(port + 'shop/' + id)
}
//获取商店商品详情
export function getShopGoods(id,param) {
    return http.get(port + 'shop/goodsList/' + id,param)
}
//获取分类商品详情
export function  getCategoryGoods(shopid,tabid,params) {
  return http.get(port + 'shop/goodsList/'+shopid+'/'+tabid,params) 
}
//获取商店首页轮播图
export function getPhoto() {
  return http.get(port+'photo/list')
}
//获取收货地址列表
export function getAddressList(params) {
    return http.get(port+'address/list',params)
}

//新增收货地址
export function  addNewLocation(params) {
  return http.post(port+'address/add',params,'json')
}

//查询全部订单
export function getAllOrder() {
  return http.get(port + 'order/list')
}
