// pages/serve/merchants/merchants.js
const goods = require('../../../api/goods')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList: [],
    photoList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let param = {
      Index: 1,
      size: 10
    }
    goods.getGoods(1,param).then(res => {
      this.setData({
        goodsList: res.data
      })
    }),
    goods.getPhoto().then(res => {
      this.setData({
        photoList: res.data
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
   //引入全局样式
   options: { addGlobalClass: true },

   //跳转到手机页面
   tapToPhone:function(){
       wx.navigateTo({
         url: '../fleaMarket/phone/phone',
       })
   },
   //跳转到超市详情页面
   tapToShop:function(e){
       wx.navigateTo({
         url: '../merchants/merchantsDetails/merchantsDetails?id=' + e.currentTarget.dataset.id,
       })
   },

   //跳转到我的店铺
   tapToMyShop(){
       wx.navigateTo({
         url: './myshop/myshop',
       })
   }

})