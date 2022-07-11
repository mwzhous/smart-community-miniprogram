const bazaar = require('../../../../api/bazaar')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    obj: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      id: options.id
    })
    console.log(options.id)
    bazaar.getDetail(options.id).then(res => {
      this.setData({
        obj: res.data
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
    console.log("onShow%%%" + this.data.id)
    bazaar.getDetail(this.data.id).then(res => {
      this.setData({
        obj: res.data
      })
    })
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
  //收藏按钮
  tapToShoucang(e) {
    const id = e.currentTarget.dataset.id
    console.log(id)
    bazaar.pushCollection(id).then(res => {
      let data = this.data.obj
      data.isMarked = true
      this.setData({
        obj: data
      })
    })
  },
  //取消收藏
  tapToQuxiaoshoucang(e) {
    const id = e.currentTarget.dataset.id
    bazaar.deleteCollection(id).then(res => {
      let data = this.data.obj
      data.isMarked = false
      this.setData({
        obj: data
      })
    })
  }

})