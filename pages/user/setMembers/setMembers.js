// pages/user/setMembers/setMembers.js
const user = require('../../../api/user')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
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

  memberEdit() {
    let param = {
      id: this.data.id,
      name: this.data.name,
      phone: this.data.phone
    }
    if (param.name.length === 0 || param.phone.length === 0) {
      wx.showToast({
        title: '数据不能为空',
        icon: 'success'
      })
    } else {
      user.memberEdit(param).then(res => {
        if (res.code === 200) {
          wx.showToast({
            title: '修改成功',
            icon: 'error'
          })
          wx.navigateTo({
            url: '../familyMember/familyMember',
          })
          this.onLoad()
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id,
      name: options.name,
      phone: options.phone
    })
    console.log(options.id)
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