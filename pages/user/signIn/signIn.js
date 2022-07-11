// pages/user/signIn/signIn.js
const user = require("../../../api/user")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dayList: [],
    isSignIn: '',
    day: '',
    integration: '',
    nextIntegration: '',
    // 状态栏高度
    statusBarHeight: wx.getStorageSync('statusBarHeight') + 'px',
    // 导航栏高度
    navigationBarHeight: wx.getStorageSync('navigationBarHeight') + 'px',
  },

  /**
  * 时间选择器列表点击监听
  * @param item 被点击的item对象，包含所有信息
  */
  clickItem: function (item) {
    // 列表点击事件
    console.log(item.currentTarget.dataset)
  },
  // 返回上一页
  back() {
    wx.navigateBack({
      delta: 0,
    })
  },

  // 获取签到数据
  getSignIn() {
    user.getSignIn().then(res => {
      this.setData({
        dayList: res.data.dayList,
        integration: res.data.integration,
        isSignIn: res.data.currentDay.isSignIn,
        day: res.data.day,
        nextIntegration: res.data.nextIntegration
      })
      if (res.data.day >= 7 || this.data.isSignIn === false) {
        this.setData({
          isSignIn: false
        })
      }
    })
  },

  // 点击签到
  signIn() {
    let params = {
      day: this.data.day + 1,
      integration: this.data.nextIntegration
    }
    user.signIn(params).then(res => {
      this.setData({
        isSignIn: false
      })
      if (res.code === 200) {
        wx.showToast({
          title: '签到成功',
        })
      }
      this.getSignIn()
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSignIn()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})