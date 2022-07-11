// pages/user/setPassword/setPassword.js
const auth = require('../../../../api/auth')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    code: '',
    password: '',
    rePassword: ''
  },
  // 新密码
  bindPassInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 再次输入新密码
  bindPassInputs: function (e) {
    this.setData({
      rePassword: e.detail.value
    })
  },

  // 设置密码
  ChangePassword() {
    let param = {
      phone: this.data.phone,
      verifyCode: this.data.code,
      password: this.data.password,
      rePassword: this.data.rePassword
    }
    if (param.password != param.rePassword) {
      wx.showToast({
        title: '输入的密码不同',
        icon: 'error'
      })
    } else {
      auth.ChangePassword(param).then(res => {
        console.log(res)
      })
      wx.showToast({
        title: '登录成功',
        icon: 'success'
      })
      wx.navigateTo({
        url: '../../../tabbar/tabbar',
      })
    }
    console.log(param)

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.phone)
    console.log(options.code)
    this.setData({
      phone: options.phone,
      code: options.code
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