// pages/serve/merchants/placeOrder/placeOrder.js
const user = require('../../../../api/auth')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    communityList: [
      {
        id: '1',
        imgUrl:
          'https://soft2176-use.oss-cn-hangzhou.aliyuncs.com/soft-training-2022-5/icon-zfb.png',
        name: '支付宝充值'
      },
      {
        id: '2',
        imgUrl:
          'https://soft2176-use.oss-cn-hangzhou.aliyuncs.com/soft-training-2022-5/icon-wx.png',
        name: '微信充值'
      }
    ],
    userList: [],
    shopList: [],
    totalPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    wx.getStorage({
      key: 'shopList',
      success: function (res) {
        console.log(res)
        that.setData({
          shopList: res.data
        })
      }
    }),
    wx.getStorage({
      key: 'totalPrice',
      success: function (res) {
        console.log(res)
        that.setData({
          totalPrice: res.data
        })
      }
    })
    console.log('shopList是：' + this.data.shopList)
    user.getUser().then((res) => {
      this.setData({
        userList: res.data
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

  //跳转到切换地址
  tapToLocation() {
    wx.navigateTo({
      url: './location/location'
    })
  },
  //计算总价
  getTotalPrice() {
    let price = 0
    for (let i = 0; i < this.data.shopList.length; i++) {
      price += this.data.shopList[i].num * this.data.shopList[i].price
      this.setData({
        totalPrice: price
      })
      console.log('当前总价为' + this.data.price)
    }
  },
  //跳转到我的订单
  tapToMyOrder(){
    wx.navigateTo({
      url: '/pages/serve/merchants/placeOrder/location/myOrder/myOrder',
    })
  }
})
