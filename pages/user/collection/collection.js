// pages/user/collection/collection.js
const user = require('../../../api/user')
const serve = require('../../../api/serve')
const bazaar = require('../../../api/bazaar')
const app = getApp();
Page({
  data: {
    TabCur: 0,
    scrollLeft: 0,
    currentData: 0,
    tab: 1,
    consulting: [],
    house: [],
    goods: []
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  // 获取当前索引值
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块Data赋值
  checkCurrent(e) {
    const that = this;
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentData: e.target.dataset.current,
        tab: e.target.dataset.current
      })
      this.getCollection(),
        console.log(e.target.dataset.current)
    }
  },
  getCollection() {
    const param = {
      page: '',
      size: '',
      tab: this.data.tab
    }
    console.log(param)
    // 咨询和社区交流
    user.getCollection(param).then(res => {
      console.log(res)
      this.setData({
        consulting: res.data
      })
    })
    // 获取房产收藏
    let param1 = {
      page: 1,
      size: 10
    }
    serve.getFangChanShouCang(param1).then(res => {
      this.setData({
        house: res.data
      })
    })
    // 获取跳蚤收藏
    let param2 = {
      page: 1,
      size: 10
    }
    bazaar.getCollection(param2).then(res => {
      this.setData({
        goods: res.data
      })
    })
  },

  //数据传值 传id
  tapToFangchan(e) {
    let id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '/pages/serve/propertyTransactions/propertyDetail/propertyDetail?id=' + id
    })
  },

  // 跳转到商品收藏详情页
  tapToPhoneDetail: function (e) {
    let id = e.currentTarget.dataset.id
    // console.log(e)
    wx.navigateTo({
      url:
        '/pages/serve/fleaMarket/shopDetail/shopDetail?id=' + id
    })
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function () {
    this.getCollection()
    // this.getFangChan()
  },
})