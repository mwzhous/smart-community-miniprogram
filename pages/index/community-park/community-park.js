// pages/index/community-park/community-park.js
const park = require('../../../api/park')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    parkList: [],
    stallList: [],
    park: '',
    id: '',
    parkingId: [],
    stallid: [],
    triggered: false,
    page: 1,
    size: 4,
    kilometre: [],
    longitude: wx.getStorageSync('longitude'),
    latitude: wx.getStorageSync('latitude'),
  },
  showModal1(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
    let id = parseInt(e.currentTarget.id)
    let arr = this.data.stallid
    this.setData({
      park: arr.includes(id),
      id: id
    })
    if(this.data.park){
      console.log(id)
      wx.navigateTo({
        url: './park-interface/park-interface?id=' + id,
      })
      wx.setStorageSync('parkList')
    }
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  getPark() {
    //设置传参
    park.getPark(this.data.longitude, this.data.latitude).then(res => {
      res.data.forEach(item => {
        item.distant = Math.floor(item.distant) / 1000
      })
      let arr = []
      for (let i = 0; i < res.data.length; i++) {
        arr[i] = res.data[i].parkingId
      }
      this.setData({
        parkList: res.data,
        parkingId: arr
      })
    })

  },
  getStall() {
    park.getStall().then(res => {
      let arr = []
      for (let i = 0; i < res.data.length; i++) {
        arr[i] = res.data[i].parkingId
      }
      this.setData({
        stallList: res.data,
        stallid: arr
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getPark()
    this.getStall()
  },
  showModal(e) {
    wx.navigateTo({
      url: '/pages/index/community-park/map/map?latitude=' + Number(e.currentTarget.dataset.latitude) + '&longitude=' + Number(e.currentTarget.dataset.longitude)
    })
    // wx.openLocation({
    //   latitude: Number(e.currentTarget.dataset.latitude),
    //   longitude: Number(e.currentTarget.dataset.longitude),
    //   scale: 18
    // })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  //滚动到底部 上拉分页加载
  scrolltolower() {
    this.setData({
      page: (this.data.page += 1)
    }, () => {
      //获取数据
      park.getPark(this.data.longitude, this.data.latitude).then(res => {
        console.log('获取到数据' + res.data)
        let arr = []
        arr = [...this.data.parkList, ...res.data]
        setTimeout(() => {
          this.setData({
            parkList: arr
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
    this.setData({
      page: 1
    },
      () => {
        //获取数据
        park.getPark(this.data.longitude, this.data.latitude).then(res => {
          setTimeout(() => {
            this.setData({
              triggered: false
            })
          }, 1000)
          let arr = []
          arr = [...res.data]
          this.setData({
            parkList: arr
          })
        })
      }
    )
  },
  //跳转页面
  tpToCommunity: function () {
    wx.navigateTo({
      url: './park-manage/park-manage',
    })
  },
  tapToVIP: function () {
    wx.navigateTo({
      url: '../community-park/vip-invitation/vip-invitation',
    })
  },
  tapToMap: function () {
    wx.navigateTo({
      url: './map/map',
    })
  },
  tapToRental: function () {
    wx.navigateTo({
      url: './rental-car/rental-car',
    })
  },
  tapToPark: function () {
    let id = parseInt(this.data.id)
    console.log(id)
    wx.navigateTo({
      url: './park-interface/park-interface?id=' + id,
    })
    wx.setStorageSync('parkList')
  }
})