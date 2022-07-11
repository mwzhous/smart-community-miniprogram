// pages/index/community-park/map/map.js
let QQMapWX = require('../../../../utils/qqmap-wx-jssdk.js');
let qqMapWx;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    form: {
      latitude: Number(wx.getStorageSync('latitude')),
      longitude: Number(wx.getStorageSync('longitude'))
    },
    to: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let to = {
      latitude: options.latitude,
      longitude: options.longitude
    }
    this.setData({
      to
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.queryMapRoutine()
  },
  // 查询地图路线
  queryMapRoutine: function (e) {
    var _this = this
    // 实例化API核心类
    qqMapWx = new QQMapWX({
      key: 'GNCBZ-4ZOKX-74M4T-7JJ6I-44JVK-UIFH7'
    });
    qqMapWx.direction({
      mode: 'driving', // 'driving'(驾车路线规划)
      // from参数不填默认当前地址
      from: _this.data.from,
      to: _this.data.to,
      success: function (res) {
        console.log(res);
        var ret = res;
        var coors = ret.result.routes[0].polyline,
          pl = [];
        let markersTemp = []
        let route = ret.result.routes[0]
        let distance = route.distance < 1000 ?
          `${route.distance}米` :
          `${(route.distance / 1000).toFixed(2)}公里`
        let duration = route.duration < 60 ?
          `${route.duration}分钟` :
          `${parseInt(route.duration / 60)}小时${route.duration % 60}分钟`
        //坐标解压（返回的点串坐标，通过前向差分进行压缩）
        let kr = 1000000;
        for (var i = 2; i < coors.length; i++) {
          coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
        }
        //将解压后的坐标放入点串数组pl中
        for (var i = 0; i < coors.length; i += 2) {
          pl.push({
            latitude: coors[i],
            longitude: coors[i + 1]
          })
        } 
        let startPoint = pl[0]
        let endPoint = pl[pl.length - 1]
        let midPoint = pl[((pl.length) / 2).toFixed(0)]
        markersTemp = [{
            iconPath: '../../../../images/icon/icon_dingwei2.png',
            id: 0,
            latitude: startPoint.latitude,
            longitude: startPoint.longitude,
            width: 28,
            height: 28,
            zIndex: -1,
            anchor: {
              x: 0.5,
              y: 1
            }
          },
          {
            iconPath: '../../../../images/icon/icon_dingwei2.png',
            id: 1,
            latitude: endPoint.latitude,
            longitude: endPoint.longitude,
            width: 28,
            height: 28,
            zIndex: -1,
            anchor: {
              x: 0.5,
              y: 1
            }
          },
          {
            id: 0,
            latitude: midPoint.latitude,
            longitude: midPoint.longitude,
            label: {
              content: '全程' + distance + '，约' + duration + '到达', //文本
              color: '#000000', //文本颜色
              borderRadius: 3, //边框圆角
              borderWidth: 1, //边框宽度
              borderColor: '#cccccc', //边框颜色
              bgColor: '#ffffff', //背景色
              padding: 5, //文本边缘留白
              textAlign: 'center' //文本对齐方式。有效值: left, right, center
            }
          }
        ]
        _this.setData({
          latitude: midPoint.latitude,
          longitude: midPoint.longitude,
          polyline: [{
            points: pl,
            color: "#20B2AA",
            width: 4,
            dottedLine: false
          }],
          markers: markersTemp,
          distance: distance,
          duration: duration
        })
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})