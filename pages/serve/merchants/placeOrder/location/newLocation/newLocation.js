// pages/serve/merchants/placeOrder/location/newLocation/newLocation.js
const add = require('../../../../.../../../../api/goods')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: '', //用户名
    phone:12345678900, //手机号
    address: '请选择地址', //地址
    addressdetail: '', //详细地址
    addresstag: '', //地址标签
    defaultlocation: 0, //是否为默认地址
  },
  //输入用户名
  bindusername(e) {
    this.setData({
      username: e.detail.value
    })
    console.log("用户名为："+this.data.username)
    console.log(typeof(this.data.username))
  },
  //输入电话号码
  bindphone(e) {
    this.setData({
      phone: e.detail.value
    })
   
  },
  //地址
  RegionChange(e) {
    this.setData({
      address: e.detail.value
    })
  },
  //详细地址
  bindaddress(e) {
    this.setData({
      addressdetail: e.detail.value
    })
  },
  //输入价格
  bindaddresstag(e) {
    this.setData({
      addresstag: e.detail.value
    })
  },

  //是否为默认地址
  SetShadow(e) {
    //默认地址为 1
    if (e.detail.value == true) {
      this.setData({
        defaultlocation: '1'
      })
    } else {
      //非默认为0
      this.setData({
        defaultlocation: '0'
      })
    }
    console.log('当前是否为默认地址：' + this.data.defaultlocation)
  },
  //保存
  pushlocation() {
    console.log(this.data.address + '地址为')
    var str = this.data.address
    str = str.toString()
    console.log(this.data.address + " newaddress")
   const params = {
      username : this.data.username,
      phone : this.data.phone,
      address :str,
      status : this.data.defaultlocation,
      address_detail: this.data.addressdetail,
      tag : this.data.addresstag
   }


    if (this.data.username == '') {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.phone == '') {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.address == '请选择地址') {
      wx.showToast({
        title: '请选择地址',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.addressdetail == '') {
      wx.showToast({
        title: '请输入详细地址',
        icon: 'none',
        duration: 2000
      })
    } else if (this.data.addresstag == '') {
      wx.showToast({
        title: '请输入地址标签',
        icon: 'none',
        duration: 2000
      })
    } else {
      //调用接口

      add.addNewLocation(params).then((res) => {
        if (res.code == 200) {
          wx.showToast({
            title: '保存成功',
            icon: 'success',  
            duration: 2000
          })
          wx.navigateBack()
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log('传入的id为' + options.user_id)
    this.setData({
      user_id: options.user_id
    })
    console.log('user_id为：' + this.data.user_id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {}
})
