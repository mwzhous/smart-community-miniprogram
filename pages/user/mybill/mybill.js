// pages/user/mybill/mybill.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pay: [{
      id: 1,
      name: "物业费",
      number: 222,
      money: "0.01",
      state: "已支付"
    },
    {
      id: 2,
      name: "物业费",
      number: "221",
      money: "0.01",
      state: "已支付"
    },
    {
      id: 2,
      name: "物业费",
      number: "217",
      money: "0.01",
      state: "已支付"
    },
    {
      id: 3,
      name: "物业费",
      number: "216",
      money: "0.01",
      state: "已支付"
    },
    {
      id: 4,
      name: "物业费",
      number: "215",
      money: "0.01",
      state: "已支付"
    },
    {
      id: 5,
      name: "物业费",
      number: "214",
      money: "0.01",
      state: "已支付"
    },
    ],
    // 状态栏高度
    statusBarHeight: wx.getStorageSync('statusBarHeight') + 'px',
    // 导航栏高度
    navigationBarHeight: wx.getStorageSync('navigationBarHeight') + 'px',
  },
  back() {
    wx.navigateBack({
      delta: 0,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
})