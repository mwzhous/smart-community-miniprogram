// pages/serve/activity/activity.js
const estate = require('../../../api/estate')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ActiveList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.activeInfo()
  },
  activeInfo(){
    estate.getActive().then(res => {
      this.ActiveList = res.data
      res.data.forEach(item => {
        item.startTime = item.startTime.substring(0,10)
      })
      this.ActiveList = res.data
      res.data.forEach(item => {
        item.endTime = item.endTime.substring(0,10)
      })
      this.setData({
        ActiveList: this.ActiveList
      })
      console.log(this.ActiveList)
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
    wx.showNavigationBarLoading()
    console.log("onPullDownRefresh");
    setTimeout(() => {
      // 标题栏隐藏刷新转圈圈图标
      wx.hideNavigationBarLoading()
      this.activeInfo();
    }, 2000);
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

  },
 
  options: { addGlobalClass: true }
})