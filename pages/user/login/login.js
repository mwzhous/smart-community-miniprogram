const auth = require('../../../api/auth')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    phone: '18018384983', // 手机号
    code: '', // 验证码
    account: 'xiaoli', // 账号
    password: '123123', // 密码
    currentData: 0, // 初始为短信验证码登录
    countDownNum: 60, // 倒计时初始值
  },
  // code输入手机号
  bindTelInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  // code输入验证码
  bindCodeInput: function (e) {
    this.setData({
      code: e.detail.value
    })
  },

  // 账密输入手机号
  bindInput: function (e) {
    this.setData({
      account: e.detail.value
    })
  },

  // 账密输入密码
  bindAccountInput: function (e) {
    this.setData({
      password: e.detail.value
    })
  },

  // 发送手机验证码
  sendCode() {
    console.log(typeof this.data.phone)
    if (!!this.data.phone) {
      if (!!(/^1[345789]\d{9}$/.test(this.data.phone))) {
        wx.showToast({
          title: "发送成功",
          icon: "success",
          duration: 1500
        })
        this.countDown()
        let param = {
          phone: this.data.phone
        }
        auth.getCode(param).then((res) => {
          console.log(res.data)

        })
      } else {
        wx.showToast({
          title: "请输入正确的手机号",
          icon: "error",
          duration: 1500
        })
      }
    } else {
      wx.showToast({
        title: "请输入手机号",
        icon: "error",
        duration: 1500
      })
    }
  },


  /**
   * 验证码倒计时
   */
  countDown: function () {
    var _this = this
    var countDownNum = _this.data.countDownNum // 获取倒计时初始值
    var timer = setInterval(function () {
      countDownNum -= 1
      _this.setData({
        countDownNum: countDownNum
      })
      if (countDownNum <= -1) {
        clearInterval(timer)
        // 取消置顶的setInterval函数将要执行的代码
        _this.setData({
          countDownNum: 60
        })
      }
    }, 1000)
  },

  // 验证码登录
  login() {
    let param = {
      phone: this.data.phone,
      verifyCode: this.data.code
    }
    // console.log(param)
    auth.login(param).then((res) => {
      if (res.code === 200) {
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        })
        console.log(res.data)
        console.log("是否注册" + res.data.info.isNewUser)
        wx.setStorageSync('token', res.data.token)
        wx.setStorageSync('userInfo', JSON.stringify(res.data.info))
        app.globalData.token = res.data.token
        app.globalData.userInfo = res.data.info

        console.log(res.data.token)
        if (res.data.info.isNewUser) {
          wx.navigateTo({
            url: '../../user/login/setPassword/setPassword?phone=' + this.data.phone + '&code=' + this.data.code
          }),
            this.setData({
              phone: '',
              code: ''
            })
        } else {
          wx.navigateTo({
            url: '../../tabbar/tabbar',
          })
        }
      } else if (res.code === 10009) {
        wx.showToast({
          title: '验证码错误',
          icon: 'error'
        })
      } else if (res.code === 500) {
        wx.showToast({
          title: '请输入数字',
          icon: 'error'
        })
      }
    })
  },

  // 账号密码登录
  accountLogin() {
    let param = {
      account: this.data.account,
      password: this.data.password
    }
    console.log(param)
    auth.accountLogin(param).then((res) => {
      console.log(res.code)
      if (res.code === 200) {
        wx.showToast({
          title: '登录成功',
          icon: 'success'
        })
        wx.setStorageSync('token', res.data.token)
        wx.setStorageSync('userInfo', JSON.stringify(res.data.info))
        app.globalData.token = res.data.token
        app.globalData.userInfo = res.data.info

        wx.navigateTo({
          url: '../../tabbar/tabbar',
        }),
          this.setData({
            account: '',
            password: ''
          })
      } else if (res.code === 10002) {
        wx.showToast({
          title: '密码错误',
          icon: 'error'
        })
      } else if (res.code === 10001) {
        wx.showToast({
          title: '账户不存在',
          icon: 'error'
        })
      }
    })
  },

  // 忘记密码
  forgetPassword() {
    wx.navigateTo({
      url: './forgetPassword/forgetPassword',
    })
  },

  // tab切换
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },
  // 获取当前索引值
  bindchange: function (e) {
    const that = this
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块Data赋值
  checkCurrent(e) {
    const that = this
    if (that.data.currentData === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  // 钉钉登录
  dingdingLogin() {
    wx.request({
      url: 'http://106.14.169.149:8089/api/dd/render',
      success: (res) => {
        wx.setStorageSync('html', res.data.data)
        wx.navigateTo({
          url: './ddlogin/ddLogin',
        })
      },
    })
  },

  // github登录
  githubLogin() {
    wx.request({
      url: 'http://106.14.169.149:8089/api/github/render',
      success: (res) => {
        wx.setStorageSync('html', res.data.data)
        wx.navigateTo({
          url: './githubLogin/githubLogin',
        })
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () { },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () { },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () { },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () { },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () { },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () { },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () { }
})