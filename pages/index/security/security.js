Page({
  data: {
    TabCur: 0,
    scrollLeft: 0,
    currentData: 0,
    monitoring: [
      {
        id: 1,
        logo: 'https://cdn.jsdelivr.net/gh/Radicalfive/MK-image@master/image.6rjg4s49f200.webp',
        url: 'https://ossstored.oss-cn-shanghai.aliyuncs.com/avatar-boy/01.jpeg',
        content: '1号监控'

      },
      {
        id: 2,
        logo: 'https://ossstored.oss-cn-shanghai.aliyuncs.com/md-pic/20220514211718.png',
        url: 'https://ossstored.oss-cn-shanghai.aliyuncs.com/avatar-boy/03.jpg',
        content: '2号监控'
      },
      {
        id: 3,
        logo: 'https://ossstored.oss-cn-shanghai.aliyuncs.com/md-pic/20220514211928.png',
        url: 'https://ossstored.oss-cn-shanghai.aliyuncs.com/avatar-boy/04.jpeg',
        content: '3号监控'
      },
      {
        id: 4,
        logo: 'https://ossstored.oss-cn-shanghai.aliyuncs.com/md-pic/20220514211928.png',
        url: 'https://ossstored.oss-cn-shanghai.aliyuncs.com/avatar-boy/04.jpeg',
        content: '3号监控'
      },
      {
        id: 5,
        logo: 'https://ossstored.oss-cn-shanghai.aliyuncs.com/md-pic/20220514211928.png',
        url: 'https://ossstored.oss-cn-shanghai.aliyuncs.com/avatar-boy/04.jpeg',
        content: '3号监控'
      },

    ]
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
  // 监控详情页
  showModal:function() {
    wx.navigateTo({
      url: './monitoring/monitoring',
    })
  }
})