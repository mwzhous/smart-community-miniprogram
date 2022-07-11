// pages/user/addMembers/addMembers.js
const user = require('../../../api/user')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phone: '',
  },

  // 添加成员姓名
  bindNameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  // 添加成员手机号
  bindPhoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  memberAdd() {
    let param = {
      name: this.data.name,
      phone: this.data.phone
    }
    console.log(param)
    user.memberAdd(param).then(res => {
      console.log(res)
      if (res.code === 200) {
        wx.showToast({
          title: '添加成功',
          icon: 'success'
        })
      }
      wx.navigateTo({
        url: '../familyMember/familyMember',
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
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