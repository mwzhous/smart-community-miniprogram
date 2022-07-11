// pages/user/home/personalData/setPhone/setPhone.js
const auth = require('../../../../../api/auth')
const user = require('../../../../../api/user')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
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

  // 发送手机验证码
  sendCode() {
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
          title: "输入正确手机号",
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

  // 修改手机号
  pushPhone() {
    let param = {
      "phone": this.data.phone,
    }
    user.personEdit(param).then(res => {
      console.log(res)
      if (res.code === 200) {
        wx.showToast({
          title: '修改成功',
          icon: 'success'
        })
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})