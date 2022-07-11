// pages/user/smartHome/addEquipment/addEquipment.js
const index = require('../../../../api/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker: ['门锁', '猫眼', '空调', '窗帘', '插座', '照明', '网关'],
    index: '',
    facility: '',
    serial: '',
    code: ''
  },

  // 选择设备
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  // 设备名称
  facilityChange(e) {
    this.setData({
      facility: e.detail.value
    })
  },

  // 设备序列号
  serialChange(e) {
    this.setData({
      serial: e.detail.value
    })
  },

  // 设备验证码
  codeChange(e) {
    this.setData({
      code: e.detail.value
    })
  },

  submit(e) {
    let params = {
      type: Number(this.data.index),
      deviceName: this.data.facility,
      deviceSerial: this.data.serial,
      validateCode: this.data.code
    }
    console.log(params)
    index.addSmartHome(params).then(res => {
      console.log(res)
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

  }
})