const app = getApp();
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    iconList: [{
      id: 1001,
      name: '东门门禁'
    }, {
      id: 1002,
      name: '南门门禁'
    }, {
      id: 1003,
      name: '北门门禁'
    }, {
      id: 1004,
      name: '401'
    }, {
      id: 1005,
      name: '607'
    }, {
      id: 1006,
      name: '502'
    },],
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  gorecord: function () {
    wx.navigateTo({
      url: '/pages/index/wisdom/record/record',
    })
  },
  govisitors: function () {
    wx.navigateTo({
      url: '/pages/index/wisdom/visitors/visitors',
    })
  }
})