// pages/user/kaipiao/kaipiao.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    invoice: [
      {
        id:1,
        data:'2019.06.25',
        week: '星期一',
        time:'18:12',
        phone:'19908324671',
        money:'0.01元'
      },
      {
        id:2,
        data:'2019.06.25',
        week: '星期一',
        time:'18:12',
        phone:'19908324671',
        money:'0.01元'
      },
      {
        id:3,
        data:'2019.06.25',
        week: '星期一',
        time:'18:12',
        phone:'19908324671',
        money:'0.01元'
      },
      {
        id:4,
        data:'2019.06.25',
        week: '星期一',
        time:'18:12',
        phone:'19908324671',
        money:'0.01元'
      },
      {
        id:5,
        data:'2019.06.25',
        week: '星期一',
        time:'18:12',
        phone:'19908324671',
        money:'0.01元'
      },
      {
        id:5,
        data:'2019.06.25',
        week: '星期一',
        time:'18:12',
        phone:'19908324671',
        money:'0.01元'
      },
      {
        id:5,
        data:'2019.06.25',
        week: '星期一',
        time:'18:12',
        phone:'19908324671',
        money:'0.01元'
      },
      {
        id:5,
        data:'2019.06.25',
        week: '星期一',
        time:'18:12',
        phone:'19908324671',
        money:'0.01元'
      },
    ]

  },

  goRecords() {
    wx.navigateTo({
      url: '../kaipiaocontent/kaipiaocontent',
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