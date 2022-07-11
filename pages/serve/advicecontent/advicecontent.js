// pages/serve/advicecontent/advicecontent.js
const estate = require('../../../api/estate')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    AdviceList: [],
    page: 1,
    size: 5,
    isRequest: false, //是否可以加载更多
    total: 0,
    isHideLoadMore: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.adviceInfo()
  },
  adviceInfo() {
    const param = {
      page: this.data.page,
      size: this.data.size
    }

    estate.getComplainList(param).then((res) => {
      console.log(res)
      this.setData({
        AdviceList: [...this.data.AdviceList, ...res.data.records],
        total: res.data.total
      })
      // let data = this.res.data.records
      // res.data.records.forEach((item) => {
      //   console.log(item.id)
      // })

      // console.log("advicelist" + this.data.records.id)
    })
    wx.hideLoading()
    //隐藏导航条加载动画
    wx.hideNavigationBarLoading()
    //停止下拉刷新
    wx.stopPullDownRefresh()
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
  getDetail(e) {
    // const id = this.data.AdviceList.records.id
    // const id = e.currentTarget.dataset.id
    let id = e.currentTarget.dataset.id;

    console.log(id)
    wx.navigateTo({
      url: './details/details?id=' + id
    })
    wx.setStorageSync('AdviceList[]')
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},
  onRefresh() {
    //在当前页面显示导航条加载动画
    wx.showNavigationBarLoading()
    //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
    wx.showLoading({
      title: '刷新中...'
    })
    this.adviceInfo()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    wx.showNavigationBarLoading()
    console.log('onPullDownRefresh')
    setTimeout(() => {
      // 标题栏隐藏刷新转圈圈图标
      wx.hideNavigationBarLoading()
      this.adviceInfo()
    }, 2000)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    //加载更多
    console.log('加载更多')
    setTimeout(() => {
      if (this.data.total > this.data.AdviceList.length) {
        this.setData({
          page: this.data.page + 1,
          isHideLoadMore: true
        })
        wx.showLoading({
          title: '加载中'
        })
        this.adviceInfo()
      }
    }, 1000)

    // if (this.data.total > this.data.ActiveList.length) {
    //   this.setData({
    //     page: this.data.page + 1,
    //     // ActiveList:[]

    //   })
    //   wx.showLoading({
    //     title: '加载中',
    //   })
    //   this.activeInfo()
    // }
    // console.log('onReachBottom')
    // console.log(this.data.page)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
  options: {
    addGlobalClass: true
  }
})
