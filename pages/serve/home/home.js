const serve = require('../../../api/serve')
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 页面的初始数据
   */
  data: {
    commList: [],
    page: 1,
    size: 4,
    swiperList: []
  },
  attached() {
    this.initData()
  },
  methods: {
    initData() {
      const params = {
        page: this.data.page,
        size: this.data.size
      }
      serve.getFleaGoodsHot(params).then((res) => {
        res.data.forEach((item) => {
          item.isShow = true
        })
        console.log(res.data)
        this.setData({
          commList: res.data
        })
      }),
        serve.getAnnouncement().then((res) => {
          this.setData({
            swiperList: res.data
          })
        })
    },
    searchIcon(e) {
      let key = e.detail.value
      let list = this.data.commList
      for (let i = 0; i < list.length; i++) {
        let a = key
        let b = list[i].name
        let c = list[i].content
        let d = list[i].price
        if (b.search(a) != -1 || c.search(a) != -1 || d.search(a) != -1) {
          list[i].isShow = true
        } else {
          list[i].isShow = false
        }
      }
      this.setData({
        commList: list
      })
    },
    //跳转到房产交易
    tapToFangChanJiaoYi: function () {
      wx.navigateTo({
        url: '/pages/serve/propertyTransactions/propertyTransactions'
      })
    },
    //跳转到跳蚤市场
    tapToTiaoZaoShiChang: function () {
      wx.navigateTo({
        url: '/pages/serve/fleaMarket/fleaMarket'
      })
    },
    //跳转到小区商家
    tapToXiaoQuShangJia: function () {
      wx.navigateTo({
        url: '/pages/serve/merchants/merchants'
      })
    },
    //数据传值 id
    tapToHotDetail(e) {
      const id = e.currentTarget.dataset.id
      console.log(id)
      wx.navigateTo({
        url: '/pages/serve/home/hotRecommended/hotRecommended?id=' + id
      })
    },
    //下拉刷新
    refresherrefresh() {
      this.setData(
        {
          page: 1
        },
        () => {
          const params = {
            page: this.data.page,
            size: this.data.size
          }
          serve.getFleaGoodsHot(params).then((res) => {
            res.data.forEach((item) => {
              item.isShow = true
            })
            setTimeout(() => {
              this.setData({
                triggered: false
              })
            }, 1500)
            console.log(res.data)
            this.setData({
              commList: res.data
            })
          })
        }
      )
      console.log('触发下拉刷新')
      wx.showToast({
        title: '刷新成功'
      })
    },
    //滚动到底部 上拉分页加载
    scrolltolower() {
      this.setData({ page: (this.data.page += 1) }, () => {
        const params = {
          page: this.data.page,
          size: this.data.size
        }
        serve.getFleaGoodsHot(params).then((res) => {
          res.data.forEach((item) => {
            item.isShow = true
          })
          console.log(res.data.length)
          console.log('res.data是' + res.data)
          setTimeout(() => {
            this.setData({
              commList: [...this.data.commList, ...res.data]
            })
          }, 1000)
          if (res.data != '') {
            wx.showToast({
              title: '加载中',
              icon: 'loading'
            })
          } else {
            wx.showToast({
              title: '已经到底啦',
              icon: 'error'
            })
          }
        })
      })
      console.log(this.data.page)
      console.log('触发底部分页')
    },
    //点击跳转
    tapToLink(e) {
      const linkUrl = e.currentTarget.dataset.linkurl
      console.log(linkUrl)
      wx.navigateTo({
        url: '/pages/serve/home/out/out?linkUrl='+linkUrl
      })
    }
  }
})
