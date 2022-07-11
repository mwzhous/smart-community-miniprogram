// pages/index/community-park/vip-invitation/invited-record/invited-record.js
const park = require('../../../../../api/park')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    invited: [],
    triggered: false,
    page: 1,
    size: 5,
  },

  getRecord() {
    //设置传参
    const param = {
      page: this.data.page,
      size: this.data.size
    }
    park.getRecord(param).then((res) => {
      console.log(res)
      this.setData({
        invited: res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getRecord()
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
      park.getRecord(param).then(res => {
        console.log('获取到数据' + res.data)
        let arr = []
        arr = [...this.data.invited, ...res.data]
        setTimeout(() => {
          this.setData({
            invited: arr
          })
        }, 1000)
        if (res.data != '') {
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
    this.setData(
      {
        page: 1
      },
      () => {
        //设置传参
        const param = {
          page: this.data.page,
          size: this.data.size
        }
        //获取数据
        park.getRecord(param).then(res => {
          setTimeout(() => {
            this.setData({
              triggered: false
            })
          }, 1000)
          let arr = []
          arr = [...res.data]
          this.setData({
            invited: arr
          })
        })
      }
    )
  },

  //引入全局样式
  options: { addGlobalClass: true }
})

