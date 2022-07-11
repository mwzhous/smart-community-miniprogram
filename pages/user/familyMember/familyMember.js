// pages/user/familyMember/familyMember.js
const user = require('../../../api/user')
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    family: []
  },
  addMembers: function (e) {
    wx.navigateTo({
      url: '/pages/user/addMembers/addMembers',
    })
  },
  setMembers: function (e) {
    let param = {
      id: e.currentTarget.dataset.id,
      name: e.currentTarget.dataset.name,
      phone: e.currentTarget.dataset.phone
    }
    console.log(e.currentTarget.dataset)
    wx.navigateTo({
      url: '/pages/user/setMembers/setMembers?id=' + param.id + '&name=' + param.name + '&phone=' + param.phone,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const param = {
      page: '',
      size: ''
    }
    user.getFamily(param).then(res => {
      console.log(res.data)
      this.setData({
        family: res.data
      })
    })
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