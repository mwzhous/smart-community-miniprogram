// pages/index/community-park/vip-invitation/vip-invitation.js
const park = require('../../../../api/park')
const util = require('../../../../utils/util')
const FormData = require('../../../../utils/formData')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    index: null,
    picker: ['碧桂园', '万科家园', '吾悦华府'],
    time: '请选择',
    time1: '请选择',
    date: '2018-12-25',
    name: '',
    phone: '',
    carNumber: '',
    remark: ''
  },
  textareaAInput(e) {
    this.setData({
      remark: e.detail.value
    })
  },
  bindcard(e) {
    this.setData({
      carNumber: e.detail.value
    })
  },
  bindPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  changeName(e) {
    this.setData({
      name: e.detail.value
    })
  },
  PickerChange(e) {
    this.setData({
      index: e.detail.value
    })
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  TimeChange1(e) {
    console.log(e)
    this.setData({
      time1: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  putInvate() {
    let params = {
      "contact": this.data.name,
      "phone": this.data.phone,
      "carNumber": this.data.carNumber,
      "communityId": 1,
      "startTime": util.getYearYueDay() +' '+ this.data.time + ':00',
      "endTime": util.getYearYueDay() +' '+ this.data.time1 + ':00',
      "remark": this.data.remark
    }
    if(this.data.carNumber.length == 0) {
      wx.showToast({
        title: '请输入车牌',
        icon: 'error'
      })
    }
    if(this.data.phone.length != 11) {
      wx.showToast({
        title: '请确认联系电话',
        icon: 'error'
      })
    }
    if(this.data.name.length == 0)  {
      wx.showToast({
        title: '请输入联系人',
        icon: 'error'
      })
    }
    park.putValide(params).then(res => {
      console.log(res)
      if(res.code == 200) {
        wx.showToast({
          title: '提交成功',
          icon: 'suuccess',
          duration: 1500
        })
        wx.navigateBack()
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
  onShareAppMessage() {},
  tapToRecord: function () {
    wx.navigateTo({
      url: './invited-record/invited-record',
    })
  }
})