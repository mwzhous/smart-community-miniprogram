// pages/user/smartHome/smartHome.js
const index = require('../../../api/index')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    family: '客厅',
    isStatus: false,
    familys: [
      {
        id: 1,
        name: '客厅'
      },
      {
        id: 2,
        name: '主卧'
      },
      {
        id: 3,
        name: '餐厅'
      },
      {
        id: 4,
        name: '卫生间'
      },
    ],
    equipment: [
      // {
      //   id: 1,
      //   name: 'XiaoMi Watch S1',
      //   isLink: '已',
      //   img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b8259e8fb355acf168c66f75d375c6af.jpg?thumb=1&w=188&h=188&f=webp&q=90'
      // },
      // {
      //   id: 2,
      //   name: 'Xiaomi真无线降噪耳机3',
      //   isLink: '未',
      //   img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/0b271a074e087848357aa61ae665b214.jpg?thumb=1&w=225&h=225&f=webp&q=90'
      // },
      // {
      //   id: 3,
      //   name: 'Redmi 手表 2',
      //   isLink: '已',
      //   img: 'http://cdn.cnbj1.fds.api.mi-img.com/mi-mall/f84503dbf5adbdf17111c61d4a7cf893.jpg?thumb=1&w=225&h=225&f=webp&q=90'
      // },
      // {
      //   id: 5,
      //   name: '小米手环6 NFC版',
      //   isLink: '未',
      //   img: 'http://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b28153b80cb2c67564608e56d5c2f3f3.jpg?thumb=1&w=225&h=225&f=webp&q=90'
      // },
      // {
      //   id: 6,
      //   name: 'XiaoMi Watch S1',
      //   isLink: '已',
      //   img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/b8259e8fb355acf168c66f75d375c6af.jpg?thumb=1&w=188&h=188&f=webp&q=90'
      // },
    ]
  },

  // 小程序API扫描二维码
  scanCode() {
    wx.scanCode({
      success: (res) => {
        console.log(res)
      }
    })
  },

  bindStatus() {
    if (this.data.isStatus === false) {
      this.setData({
        isStatus: true
      })
    } else {
      this.setData({
        isStatus: false
      })
    }
  },

  // 添加智能设备
  addEquipment() {
    wx.navigateTo({
      url: './addEquipment/addEquipment',
    })
  },

  // 获取用户拥有的智能设备
  getSmartHome() {
    index.getSmartHome().then(res => {
      this.setData({
        equipment: res.data
      })
    })
  },

  // 设备详情
  deviceDetail: function (e) {
    let deviceSerial = e.currentTarget.dataset.deviceserial;
    wx.navigateTo({
      url: './deviceDetail/deviceDetail?deviceSerial=' + deviceSerial,
    })
  },

  // 切换环境
  switch: function (e) {
    let id = e.currentTarget.id
    console.log(id)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSmartHome()
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