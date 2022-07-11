// pages/user/myWallet/myWallet.js
const user = require('../../../api/user')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    expense: [],
    // 状态栏高度
    statusBarHeight: wx.getStorageSync('statusBarHeight') + 'px',
    // 导航栏高度
    navigationBarHeight: wx.getStorageSync('navigationBarHeight') + 'px',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const param = {
      page: '',
      size: '',
    }
    user.getPurse(param).then(res => {
      console.log(res)
      this.setData({
        expense: res.data.purseList
      })
    })
  },
  back() {
    wx.navigateBack({
      delta: 0,
    })
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