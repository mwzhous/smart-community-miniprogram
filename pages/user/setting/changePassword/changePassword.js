// pages/user/setting/changePassword/changePassword.js
const auth = require('../../../../api/auth')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    oldPassword: '',
    newPassword: '',
    againNewPassword: '',
    phone:''
  },
  newPassword(e) {
    this.setData({
      newPassword: e.detail.value
    })
  },
  againNewPassword(e) {
    this.setData({
      againNewPassword: e.detail.value
    })
  },
  oldPassword(e) {
    this.setData({
      oldPassword: e.detail.value
    })
  },

  submit() {
    let param = {
      phone:this.data.phone,
      password: this.data.newPassword,
      rePassword: this.data.againNewPassword
    }
    console.log(param)
    auth.ChangePassword(param).then(res => {
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