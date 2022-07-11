// pages/serve/fleaMarket/fleaMarket.js
const fleaMarket = require('../../../api/bazaar')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodStyleList: [],
    fleaMarketGoods: [
      // {
      //   id: 9,
      //   userId: 1,
      //   communityId: 44,
      //   typeId: 28,
      //   name: 'Apple iPhone X(A1865) 64GB',
      //   thumbnail:
      //     'https://wx-login.oss-cn-shanghai.aliyuncs.com/upload/%E5%9B%BE%E6%A0%87/%E6%89%8B%E6%9C%BA.png',
      //   content: 'Apple iPhone X(A1865) 64GB 深空灰色移动联通电信4G手机',
      //   price: 6499,
      //   address: '广西壮族自治区廊坊市玛纳斯县',
      //   phone: '',
      //   state: 0,
      //   reason: '',
      //   marks: 0,
      //   hot: 0,
      //   isSelled: 0,
      //   finishTime: null,
      //   deleteFlag: 0,
      //   createTime: '2022-05-15 13:01:30',
      //   updateTime: '2022-05-15 13:01:30'
      // },
      // {
      //   id: 2,
      //   thumbnail:
      //     'https://soft2176-use.oss-cn-hangzhou.aliyuncs.com/soft-training-2022-5/luggage.png',
      //     name: '日默瓦旅行箱26寸',
      //   content:
      //     '26寸德国RIMOWA日默瓦登机箱拉杆箱新款ESSENTIAL旅行箱原SALSA升级款',
      //   price: '4999.00'
      // },
      // {
      //   id: 3,
      //   thumbnail:
      //     'https://soft2176-use.oss-cn-hangzhou.aliyuncs.com/soft-training-2022-5/food.png',
      //     name: '康师傅泡面',
      //   content:
      //     '足味发酵，满足你味蕾的酸爽感，夹杂着烟草的薰味和老爷们的汗脚味道，这酸爽，不敢相信！',
      //   price: '4999.00'
      // },
      // {
      //   id: 4,
      //   thumbnail:
      //     'https://soft2176-use.oss-cn-hangzhou.aliyuncs.com/soft-training-2022-5/luggage.png',
      //     name: '日默瓦旅行箱26寸',
      //   content:
      //     '26寸德国RIMOWA日默瓦登机箱拉杆箱新款ESSENTIAL旅行箱原SALSA升级款',
      //   price: '4999.00'
      // },
    ],
    page: 1,
    size: 4
  },
  goDetail(e) {
    let id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: './shopDetail/shopDetail?id=' + id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.initData()
  },
  initData() {
    //设置传参
    const params = {
      page: this.data.page,
      size: this.data.size
    }
    fleaMarket.getAllTiaoZao(params).then((res) => {
      console.log('跳蚤市场首页' + res.data)
      this.setData({
        fleaMarketGoods: res.data
      })
    }),
      fleaMarket.getGoodsType().then((res) => {
        console.log('商品类型' + res.data)
        this.setData({
          goodStyleList: res.data
        })
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
  tapToPhone: function () {
    wx.navigateTo({
      url: '../fleaMarket/phone/phone'
    })
  },
  tapToPage(e) {
    console.log(e.currentTarget.dataset.title)
    // if (e.currentTarget.dataset.title == '手机') {
    //   wx.navigateTo({
    //     url: '/pages/serve/fleaMarket/phone/phone'
    //   })
    // }
    switch (e.currentTarget.dataset.title) {
      case '手机':
        wx.navigateTo({
          url: '/pages/serve/fleaMarket/phone/phone'
        })
        break
      case '电脑':
        wx.navigateTo({
          url: '/pages/serve/fleaMarket/computer/computer'
        })
        break
      case '游戏':
        wx.navigateTo({
          url: '/pages/serve/fleaMarket/game/game'
        })
        break
      case '数码':
        wx.navigateTo({
          url: '/pages/serve/fleaMarket/digital/digital'
        })
        break
      case '工具': {
        wx.navigateTo({
          url: '/pages/serve/fleaMarket/tool/tool'
        })
        break
      }
    }
  },
  //滚动到底部 上拉分页加载
  scrolltolower() {
    this.setData({ page: (this.data.page += 1) }, () => {
      //设置传参
      const params = {
        page: this.data.page,
        size: this.data.size
      }
      //获取数据
      fleaMarket.getAllTiaoZao(params).then((res) => {
        console.log('获取到数据' + res.data)
        let arr = []
        arr = [...this.data.fleaMarketGoods, ...res.data]
        setTimeout(() => {
          this.setData({
            fleaMarketGoods: arr
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
  //下拉刷新
  refresherrefresh() {
    this.setData(
      {
        page: 1
      },
      () => {
        //设置传参
        const params = {
          page: this.data.page,
          size: this.data.size
        }
        //获取数据
        fleaMarket.getAllTiaoZao(params).then((res) => {
          console.log('获取到数据' + res.data)
          setTimeout(() => {
            this.setData({
              triggered: false
            })
          }, 1500)
          let arr = []
          arr = [...res.data]
          this.setData({
            fleaMarketGoods: arr
          })
        })
      }
    )
    console.log('触发下拉刷新')
    wx.showToast({
      title: '刷新成功'
    })
  }
})
