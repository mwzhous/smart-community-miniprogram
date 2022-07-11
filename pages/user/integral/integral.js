// pages/user/integral/integral.js
const user = require('../../../api/user')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalIntegration: '',
    integral: [],
    // 状态栏高度
    statusBarHeight: wx.getStorageSync('statusBarHeight') + 'px',
    // 导航栏高度
    navigationBarHeight: wx.getStorageSync('navigationBarHeight') + 'px',
  },

  getIntegral() {
    user.getIntegral().then(res => {
      console.log(res)
      this.setData({
        integral: res.data.integrationList,
        totalIntegration: res.data.totalIntegration
      })
    })
  },
  back() {
    wx.navigateBack({
      delta: 0,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getIntegral()
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

  }
})