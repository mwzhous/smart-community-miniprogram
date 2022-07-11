// pages/user/switch/switch.js
const user = require('../../../api/user')
const index = require('../../../api/index')
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    current: '',
    communityList: [],
    triggered: false,
    page: 1,
    size: 9,
  },

  // 获取数据
  getSwitch() {
    const param = {
      page: this.data.page,
      size: this.data.size
    } 
    user.getSwitch(param).then(res => {
      let arr = []
      arr = [...res.data.communityList]
      console.log(res.data)
      this.setData({
        communityList: arr,
        current: res.data.currentCommunity.name
      })
    })
  },
  // 切换小区
  changeCommunity: function (e) {
    let param = {
      "communityId": e.currentTarget.id,
      "name": e.currentTarget.dataset.name
    }
    this.setData({
      current: e.currentTarget.dataset.name
    })
    user.changeCommunity(param).then(res => {
      if (res.code === 200) {
        wx.showToast({
          title: '切换成功',
          icon: 'success'
        })
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  },
  // 获取当前小区的方法
  getXiaoqu() {
    index.getXiaoqu().then(res => {
      console.log("xiaoqu" + res.data.name)
      this.setData({
        current: res.data.name
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取小区列表
    this.getSwitch()
    this.getXiaoqu()
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
      user.getSwitch(param).then(res => {
        console.log('获取到数据' + res.data.communityList)
        let arr = []
        arr = [...this.data.communityList, ...res.data.communityList]
        setTimeout(() => {
          this.setData({
            communityList: arr
          })
        }, 1000)
        if (res.data.communityList != '') {
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
    console.log(this.data.page)
    console.log('触发底部分页')
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
        user.getSwitch(param).then(res => {
          // console.log('获取到数据' + res.data)
          setTimeout(() => {
            this.setData({
              triggered: false
            })
          }, 1000)
          let arr = []
          arr = [...res.data.communityList]
          this.setData({
            communityList: arr
          })
        })
      }
    )
  }
})