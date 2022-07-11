const auth = require('../../../api/auth')
const app = getApp();
Component({
  data: {
    loginStatus: 0,
    triggered: false,
    module: [
      {
        id: '1',
        icon: '/images/icon/icon_xiaoqu.png',
        title: '切换小区'
      },
      {
        id: '2',
        icon: '/images/icon/icon_jtcy.png',
        title: '家庭成员'
      },
      {
        id: '3',
        icon: '/images/icon/icon_wdsc.png',
        title: '我的收藏'
      },
      {
        id: '4',
        icon: '/images/icon/icon_zaixianbaoxiu.png',
        title: '智能家居'
      },
    ],
    module1: [
      {
        id: '5',
        icon: '/images/icon/icon_wdqb.png',
        title: '我的钱包'
      },
      {
        id: '6',
        icon: '/images/icon/icon_jifen.png',
        title: '我的账单'
      },
      {
        id: '7',
        icon: '/images/icon/icon_jifen.png',
        title: '积分'
      },
      {
        id: '8',
        icon: '/images/icon/icon_yhq.png',
        title: '优惠卷'
      },
      {
        id: '9',
        icon: '/images/icon/icon_zhaf.png',
        title: '开票'
      },
    ],
    grList: []
  },
  methods: {
    goDetails: function (e) {
      var idx = e.currentTarget.dataset.moduleid;
      console.log(idx)
      if (idx === 0) {
        wx.navigateTo({
          url: '/pages/user/switch/switch',
        })
      } else if (idx === 1) {
        wx.navigateTo({
          url: '/pages/user/familyMember/familyMember',
        })
      } else if (idx === 2) {
        wx.navigateTo({
          url: '/pages/user/collection/collection',
        })
      }
      else if (idx === 3) {
        wx.navigateTo({
          url: '/pages/user/smartHome/smartHome',
        })
      }
    },
    goDetails1: function (e) {
      var idx = e.currentTarget.dataset.moduleid;
      console.log(idx)
      if (idx === 0) {
        wx.navigateTo({
          url: '/pages/user/myWallet/myWallet',
        })
      }
      else if (idx === 1) {
        wx.navigateTo({
          url: '/pages/user/mybill/mybill',
        })
      }
      else if (idx === 2) {
        wx.navigateTo({
          url: '/pages/user/integral/integral',
        })
      } else if (idx === 3) {
        wx.navigateTo({
          url: '/pages/user/coupon/coupon',
        })
      } else if (idx === 4) {
        wx.navigateTo({
          url: '/pages/user/mybill/kaipiao/kaipiao',
        })
      }
    },
    goSetting: function (e) {
      wx.navigateTo({
        url: '/pages/user/setting/setting',
      })
    },
    goData: function (e) {
      wx.navigateTo({
        url: '/pages/user/home/personalData/personalData',
      })
    },
    goLogin: function (e) {
      wx.navigateTo({
        url: '/pages/user/login/login',
      })
    },
    goSignIn: function (e) {
      wx.navigateTo({
        url: '/pages/user/signIn/signIn',
      })

    }
  },

  // 获取用户信息
  attached: function (e) {
    console.log(app.globalData.token)
    if (wx.getStorageSync('token') === undefined) {
      this.setData({
        loginStatus: 0
      })
    } else {
      this.setData({
        loginStatus: 1
      })
    }
    console.log(this.loginStatus)
    auth.getUser().then(res => {
      // console.log(res.data)
      this.setData({
        grList: res.data
      })
      wx.setStorageSync('userInfo', JSON.stringify(res.data))
    })
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
        auth.getUser(param).then(res => {
          setTimeout(() => {
            this.setData({
              triggered: false
            })
          }, 1000)
          let arr = []
          arr = [...res.data]
          this.setData({
            grList: arr
          })
        })
      }
    )
  },
  //引入全局样式
  options: { addGlobalClass: true }
})