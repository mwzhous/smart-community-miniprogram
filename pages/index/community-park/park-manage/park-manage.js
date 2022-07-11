// pages/index/community-park/park-manage/park-manage.js
const park = require('../../../../api/park')
const util = require('../../../../utils/util')
Page({
  options: {
    addGlobalClass: true
  },
  /**
   * 页面的初始数据
   */
  data: {
    invited: [], //车位管理数值
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取apifox数据
    park.getStall().then(res => {
      // 计算到期时间天数
      res.data.forEach(item => {
        item.days = util.daysDistance(item.endTime.substring(0, 10), util.today())
      })
      this.setData({
        invited: res.data,
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
  tapToRental: function () {
    wx.navigateTo({
      url: '../rental-car/rental-car',
    })
  }
})