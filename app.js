// app.js
let QQMapWX = require('./utils/qqmap-wx-jssdk.js');
let qqmapsdk;
import { getXiaoqu } from './api/index'
App({
  onLaunch() {
    getXiaoqu().then(res => {
      console.log(res)
      this.globalData.commId = res.data.communityId
    })
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'GNCBZ-4ZOKX-74M4T-7JJ6I-44JVK-UIFH7'
    });
    this.isAuth()
    const {
      statusBarHeight,
      platform
    } = wx.getSystemInfoSync()
    const {
      top,
      height
    } = wx.getMenuButtonBoundingClientRect()

    // 状态栏高度
    wx.setStorageSync('statusBarHeight', statusBarHeight)
    // 胶囊按钮高度 一般是32 如果获取不到就使用32
    wx.setStorageSync('menuButtonHeight', height ? height : 32)

    // 判断胶囊按钮信息是否成功获取
    if (top && top !== 0 && height && height !== 0) {
      const navigationBarHeight = (top - statusBarHeight) * 2 + height
      // 导航栏高度
      wx.setStorageSync('navigationBarHeight', navigationBarHeight)
    } else {
      wx.setStorageSync(
        'navigationBarHeight',
        platform === 'android' ? 48 : 40
      )
    }
  },
  isAuth: function (e) {
    let that = this
    wx.getSetting({
      success(res) {
        //这里判断是否有定位权限
        if (!res.authSetting['scope.userLocation']) {
          wx.showModal({
            title: '提示',
            content: '请求获取位置权限',
            success: function (res) {
              if (res.confirm == false) {
                return false;
              }
              that.yesAuth();
            }
          })
        } else {
          //如果有定位权限，调用地图
          that.yesAuth()
        }

      }

    })
  },
  yesAuth: function () {
    wx.getLocation({
      type: 'wgs84',
      isHighAccuracy: true,
      success: function (res) {
        console.log(res) // 获取到经纬度信息
        // this.globalData.accuracy = res.verticalAccuracy
        // this.globalData.speed = res.speed
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (res) {
            console.log(res) // 解析经纬度，利用腾讯反编译地址
            wx.setStorageSync('siteInfo',res.result.address)
          },
          fail: function (res) {
            console.log(res);
          },
        });
        wx.setStorageSync('latitude', res.latitude)
        wx.setStorageSync('longitude', res.longitude)
        
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },
  globalData: {
    userInfo: {},
    token: '',
    commId: ''
    // speed: '', //当前速度
    // accuracy: '' //位置的精确度
  }
})