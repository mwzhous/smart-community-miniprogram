// pages/serve/fleaMarket/computer/computer.js
const Phone = require('../../../../api/bazaar')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    size: 6,
    typeId: 2,
    computerList: []
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
  //跳转
  tapToPhoneDetail: function (e) {
    console.log(e)
    wx.navigateTo({
      url:
        '/pages/serve/fleaMarket/shopDetail/shopDetail?id=' +
        e.currentTarget.dataset.id
    })
  },
  onLoad() {
    this.initData()
  },
  initData() {
    //设置传参
    const params = {
      page: this.data.page,
      size: this.data.size,
      typeId: this.data.typeId
    }
    Phone.getAllPhone(params).then((res) => {
      console.log('全部电脑页面' + res.data)
      this.setData({
        computerList: res.data
      })
    })
  },
  //滚动到底部 上拉分页加载
  scrolltolower() {
    this.setData({ page: (this.data.page += 1) }, () => {
      // //设置传参
      if (this.data.selectTab == '降序') {
        var params = {
          page: this.data.page,
          size: this.data.size,
          typeId: this.data.typeId,
          price: this.data.price
        }
      } else {
        var params = {
          page: this.data.page,
          size: this.data.size,
          typeId: this.data.typeId
        }
      }
      //获取数据
      Phone.getAllPhone(params).then((res) => {
        console.log('获取到数据' + res.data)
        let arr = []
        arr = [...this.data.computerList, ...res.data]
        setTimeout(() => {
          this.setData({
            computerList: arr
          })
        }, 1000)
        if (res.data != '') {
          wx.showToast({
            title: '加载中',
            icon: 'loading'
          })
        } else {
          wx.showToast({
            title: '已经到底啦',
            icon: 'error'
          })
        }
      })
    })
    console.log(this.data.page)
    console.log('触发底部分页')
  },
  //下拉刷新
  refresherrefresh(params) {
    this.setData(
      {
        page: 1
      },
      () => {
        console.log(this.data.selectTab)
        //设置传参
        if (this.data.selectTab == '降序') {
          var params = {
            page: this.data.page,
            size: this.data.size,
            typeId: this.data.typeId,
            price: this.data.price
          }
        } else {
          var params = {
            page: this.data.page,
            size: this.data.size,
            typeId: this.data.typeId
          }
        }
        //获取数据
        Phone.getAllPhone(params).then((res) => {
          console.log('获取到数据' + res.data)
          setTimeout(() => {
            this.setData({
              triggered: false
            })
          }, 1500)
          let arr = []
          arr = [...res.data]
          this.setData({
            computerList: arr
          })
        })
      }
    )
    console.log('触发下拉刷新')
    wx.showToast({
      title: '刷新成功'
    })
  }
})