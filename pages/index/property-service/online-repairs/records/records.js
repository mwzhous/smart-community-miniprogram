// pages/index/property-service/online-repairs/records/records.js
const tenement = require('../../../../../api/tenement')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    records: [],
    page: 1,
    size: 2,
  },
  getMaintain() {
    //设置传参
    const param = {
      page: this.data.page,
      size: this.data.size
    }
    tenement.getMaintain(param).then((res) => {
      this.setData({
        records: res.data.records,
        page:res.data.pages,
        size:res.data.size
      })
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMaintain()
  },

  //滚动到底部 上拉分页加载
  scrolltolower() {
    this.setData({ page: (this.data.page += 1) }, () => {
      //设置传参
      const param = {
        page: this.data.page,
        size: this.data.size
      }
      //获取数据
      tenement.getMaintain(param).then(res => {
        console.log('获取到数据' + res.data.records)
        let arr = []
        arr = [...this.data.records, ...res.data.records]
        setTimeout(() => {
          this.setData({
            records: arr
          })
        }, 1000)
        if (res.data.records != '') {
          wx.showToast({
            title: '加载中',
            icon: 'loading'
          })
        } else {
          wx.showToast({
            title: '我是有底线的',
            icon: 'error'
          })
        }
      })
    })
    console.log('触发底部分页' + this.data.page)
  },
  //下拉刷新
  refresherrefresh() {
    this.setData({ page: 1 }, () => {
      //设置传参
      const param = {
        page: this.data.page,
        size: this.data.size
      }
      //获取数据
      tenement.getMaintain(param).then(res => {
        setTimeout(() => {
          this.setData({
            triggered: false
          })
        }, 1000)
        let arr = []
        arr = [...res.data.records]
        this.setData({
          records: arr
        })
      })
    }
    )
  },
  tapToDetail(e) {
    const id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: '../details/details?id=' + id,
    })
    wx.setStorageSync('records[]')
  },
  //数据传值 id
  tapToHotDetail(e) {
    const id = e.currentTarget.dataset.id
  },
  options: {
    addGlobalClass: true
  },
})