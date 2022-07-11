// pages/tabbar/tabbar.js
Page({
  data: {
    PageCur: 'index',
    value: '首页'
  },
  onLoad() {
  },
  publishChange() {
    wx.navigateTo({
      url: '/pages/communication/publish/publish',
    })
  },

  // 消息通知
  goMessage: function (e) {
    wx.navigateTo({
      url: '../user/home/alerts/alerts',
    })
  },
  NavChange(e) {
    this.setData({
      PageCur: e.currentTarget.dataset.cur
    })
    let value = "首页";
    switch (e.currentTarget.dataset.cur) {
      case 'index':
        value = '首页';
        break;
      case 'serve':
        value = '社区服务';
        break;
      case 'communication':
        value = '社区交流';
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#f5820f',
        })
        break;
      case 'user':
        value = '个人中心';
        break;
    }

    this.setData({
      value
    })
  },
})