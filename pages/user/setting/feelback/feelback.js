// pages/user/setting/feelback/feelback.js
const user = require('../../../../api/user')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: '',
    phone: ''
  },

  // 输入意见内容
  bindContentInput: function (e) {
    this.setData({
      content: e.detail.value
    })
  },
  // code输入验证码
  bindTelInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 提交意见反馈
  feedBack() {
    let params = {
      content: this.data.content,
      phone: this.data.phone
    }
    user.feedBack(params).then(res => {
      if (res.code === 200) {
        wx.showToast({
          title: '提交成功',
        })
        this.setData({
          content: '',
          phone: ''
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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