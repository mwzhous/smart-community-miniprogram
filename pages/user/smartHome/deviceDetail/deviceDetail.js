// pages/user/smartHome/deviceDetail/deviceDetail.js
const index = require('../../../../api/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceSerial: '',
    socketInfo: [],
    isEnable: '',
    deviceName: ''
  },

  getDeviceSerial() {
    let params = {
      deviceSerial: this.data.deviceSerial
    }
    index.getSocketInfo(params).then(res => {
      console.log(res)
      this.setData({
        socketInfo: res.data.data,
        isEnable: res.data.data.isEnable,
        deviceName: res.data.data.deviceName
      })
    })
  },

  // 开关设备
  open() {
    let params = {
      deviceSerial: this.data.deviceSerial,
      cmd: this.data.isEnable
    }
    index.openSocketInfo(params).then(res => {
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.deviceSerial)
    this.setData({
      deviceSerial: options.deviceSerial
    })
    this.getDeviceSerial()
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