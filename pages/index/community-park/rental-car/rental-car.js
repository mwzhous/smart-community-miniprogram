// pages/index/community-park/rental-car/rental-car.js
const park = require('../../../../api/park')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker: [],//整个
    picker1: [],// 停车场
    picker2: [],// 区位号
    picker3: [],// 车位号
    picker4: [],// 卡类
    price: '0',
    id: '',
    park: '',
    car: '',
    card: '',
    code: '',
    parkNum: []
  },

  goput() {
    let param = {
      "parkingId": this.data.id,
      "section": this.data.park,
      "carportNo": this.data.car,
      "cardName": this.data.card,
      "carNumber": this.data.code
    }
    if(this.data.code.length == 0) {
      wx.showToast({
        title: '请输入车牌号',
        icon: 'error'
      })
    }
    if(this.data.card.length == 0) {
      wx.showToast({
        title: '请选择卡类',
        icon: 'error'
      })
    }
    if(this.data.car.length == 0) {
      wx.showToast({
        title: '请选择车位号',
        icon: 'error'
      })
    }
    if(this.data.park.length == 0) {
      wx.showToast({
        title: '请选择区位号',
        icon: 'error'
      })
    }
    if(this.data.id.length == 0) {
      wx.showToast({
        title: '请选择停车场',
        icon: 'error'
      })
    }
    park.putPlain(param).then(res => {
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
  IdChange(e) {
    this.setData({
      id: e.detail.value
    })
    park.getAbleRental().then(res => {
      let num = parseInt(this.data.id) + 1
      let code = Object.getOwnPropertyNames(res.data.selectRentals[num]);
      this.setData({
        picker2: code,
      })
    })
  },
  ParkChange(e) {
    this.setData({
      park: e.detail.value
    })
    let num = parseInt(e.detail.value)
    console.log("picker"+this.data.picker2)
    switch (num) {
      case 0:
        var sum = this.data.picker2[0];
        break;
      case 1:
        var sum = this.data.picker2[1];
        break;
    }
    let count = parseInt(this.data.id) + 1;
    let stall = this.data.picker.selectRentals[count][sum];
    this.setData({
      picker3: stall
    })
  },

  CarChange(e) {
    this.setData({
      car: e.detail.value
    })
  },
  CardChange(e) {
    this.setData({
      card: e.detail.value
    })
    let sum = parseInt(e.detail.value)
    switch (sum) {
      case 0:
        this.setData({
          price: 200
        })
        break;
      case 1:
        this.setData({
          price: 400
        })
        break;
      case 2:
        this.setData({
          price: 40
        })
        break;
    }
  },
  codeValue(e) {
    this.setData({
      code: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let parkCard = []
    let parkName = []
    park.getAbleRental().then(res => {
      this.setData({
        picker: res.data
      })
    })
    park.getCard().then(res => {
      res.data.forEach(item => {
        parkCard.push(item.name)
      })
      this.setData({
        picker4: parkCard,
      })
    })
    park.getParkName().then(res => {
      res.data.forEach(item => {
        parkName.push(item.text)
      })
      this.setData({
        picker1: parkName
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