// pages/index/wisdom/visitors/visitors.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    TabCur: [{
      id: 1,
      name: "东门门禁"
    },
    {
      id: 2,
      name: "南门门禁"
    },
    {
      id: 3,
      name: "北门门禁"
    },
    {
      id: 4,
      name: "东门门禁"
    },
    {
      id: 5,
      name: "南门门禁"
    },
    {
      id: 6,
      name: "北门门禁"
    },
    ],
    currentId: 0,
    startTime: '请选择', //开始时间
    endTime: '请选择' //结束时间
  },

  // 开始时间的事件方法
  startTimeChange(e) {
    this.setData({
      startTime: e.detail.value
    })
  },

  // 结束时间的事件方法
  endTimeChange(e) {
    this.setData({
      endTime: e.detail.value
    })
  },

  // 切换门锁
  buttonSelect(e) {
    console.log(e.currentTarget.dataset)
    this.setData({
      currentId: e.currentTarget.dataset.id,
    })
  },

  // 发送
  memberAdd(e) {
    console.log(e.dataset)
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

  },
})