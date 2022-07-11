// pages/index/property-service/property-pay/property-pay.js
const tenement = require('../../../../api/tenement')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    record: [],
    rental: '',
    // 状态栏高度
    statusBarHeight: wx.getStorageSync('statusBarHeight') + 'px',
    // 导航栏高度
    navigationBarHeight: wx.getStorageSync('navigationBarHeight') + 'px',
  },
  back() {
    wx.navigateBack({
      delta: 0,
    })
  },
  getBill() {
    let param = {
      page: 1,
      size: 100,
      communityId: 1
    }
    tenement.getBill(param).then(res => {
      let arr = 0
      res.data.records.forEach(item => {
        if (item.status === 0) {
          item.status = "未支付"
          arr += parseInt(item.billAccount)
        }else {
          item.status = "已支付"
        }
        
      })
      this.setData({
        record: res.data.records,
        rental: arr
      })
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null,
    })
  },
  hideModal1(e) {
    this.setData({
      rental : 0
    })
  },
  RegionChange: function (e) {
    this.setData({
      region: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBill()
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

  },
  //引入全局样式
  options: {
    addGlobalClass: true
  }
})