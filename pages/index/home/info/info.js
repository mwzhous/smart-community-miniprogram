// pages/index/home/info/info.js
const index = require('../../../../api/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoList: [],
    pageNum: 0,
    pageSize: 20,
    isRequest: true, //是否可以加载更多
    total: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initInfo()
  },
  initInfo() {
    let param = {
      'page_number': this.data.pageNum,
      'size': this.data.pageSize
    }
    index.getInfo(param).then(res => {
      console.log(res)
      wx.hideLoading()
      let arr = [...this.data.infoList,...res.data.records]
      this.setData({
        infoList: arr,
        total: res.data.total
      })
    })
  },

  goDetail(e) {
    wx.navigateTo({
      url: '/pages/index/zixunabout/zixunabout?id=' + e.currentTarget.dataset.id,
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
  // onRefresh(){
  //   //在当前页面显示导航条加载动画
  //   wx.showNavigationBarLoading(); 
  //   //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
  //   wx.showLoading({
  //     title: '刷新中...',
  //   })
    
  // },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()
    console.log("onPullDownRefresh");
    setTimeout(() => {
      // 标题栏隐藏刷新转圈圈图标
      wx.hideNavigationBarLoading()
      this.initInfo();
    }, 2000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.total > this.data.infoList.length) {
      this.setData({
        pageNum: this.data.pageNum + 1
      })
      wx.showLoading({
        title: '加载中',
      })
      this.initInfo()
    } 
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})