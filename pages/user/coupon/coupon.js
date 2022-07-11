const user = require('../../../api/user')
const app = getApp();
Page({
  data: {
    TabCur: 0,
    scrollLeft: 0,
    currentData: 0,
    available: [],
    overdue: [],
    page: '1',
    size: '6',
    isExpired: 'true',
    isExpired1: 'false'
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
        currentData: e.target.dataset.current
      })
    }
  },
  getCoupon() {
    // 获取可用的优惠卷
    const params = {
      page: this.data.page,
      size: this.data.size,
      isExpired: this.data.isExpired
    }
    user.getCoupon(params).then(res => {
      this.available = res.data
      res.data.forEach(item => {
        item.startTime = item.startTime.substring(0, 10)
        item.endTime = item.endTime.substring(0, 10)
      })
      this.setData({
        available: this.available
      })
    })
    // 获取过期的优惠卷
    const params1 = {
      page: this.data.page,
      size: this.data.size,
      isExpired: this.data.isExpired1
    }
    user.getCoupon(params1).then(res => {
      this.overdue = res.data
      res.data.forEach(item => {
        item.startTime = item.startTime.substring(0, 10)
        item.endTime = item.endTime.substring(0, 10)
      })
      this.setData({
        overdue: this.overdue
      })
    })
  },
  /**
 * 生命周期函数--监听页面加载
 */
  onLoad: function () {
    this.getCoupon()
  },
})