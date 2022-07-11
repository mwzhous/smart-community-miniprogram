// pages/index/property-service/online-repairs/details/details.js
const tenement = require('../../../../../api/tenement')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    record: [],
    id: '',
    repairAssess: '',
    satisfaction:''
  },
  bindcontent(e) {
    this.setData({
      repairAssess: e.detail.value
    })
  },
  submit(){
    let param = {
      'repairAssess': this.data.repairAssess,
      'repairId': Number(this.data.record.id),
      'satisfaction': this.data.record.satisfaction
    }
    console.log(param)
    tenement.posAdvice(param).then(res => {
      if (res.code == 200) {
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
    // var record = wx.getStorageSync('username')
    // this.setData({
    //   username: username
    // })
    this.setData({
      id: options.id
    })
    let id = options.id
    console.log(id)
    tenement.getDetail(id).then(res => {
      this.setData({
        record: res.data
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
  change(e){
    this.setData({
      satisfaction: e.detail
    })
     this.data.record.satisfaction = this.data.satisfaction
    console.log(this.data.record.satisfaction)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})