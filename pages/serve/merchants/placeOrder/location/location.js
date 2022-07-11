// pages/serve/merchants/placeOrder/location/location.js
const user = require('../../../../../api/auth')
const address = require('../../../../../api/goods')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    Index: 1,
    size: 20,
    userList:[],
    addressList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const params = {
      Index: this.data.Index,
      size: this.data.size
    }
    user.getUser().then((res) => {
      this.setData({
        userList: res.data
      })
    });
    address.getAddressList(params).then((res) => {
        this.setData({
            addressList: res.data
        })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
  //跳转到新增收获地址
  tapToNewLocation(e) {
    console.log(e.currentTarget.dataset.id)
    const id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: './newLocation/newLocation?user_id='+id
    })
  }
})
