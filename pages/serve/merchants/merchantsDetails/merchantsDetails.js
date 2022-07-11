// pages/serve/merchants/merchantsDetails/merchantsDetails.js
const goods = require('../../../../api/goods')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods: {}, //商家详情
    goodsList: [
    ],
    currentData: 0, //当前选择的类别
    shopId: 0,
    price: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //保存当前商店id
    this.setData({
      shopId: options.id
    })
    //获取商店介绍详情
    goods.getGoodsDetail(options.id).then((res) => {
      this.setData({
        goods: res.data
      })
    })
    //获取商店商品详情
    let param = {
      Index: 1,
      size: 100
    }
    goods.getShopGoods(options.id, param).then((res) => {
      res.data.forEach((item) => {
        item.num = 0
      })
      this.setData({
        goodsList: res.data
      })
    })
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
  onShareAppMessage() {},
  tapToXiaDan: function () {
    wx.navigateTo({
      url: '../placeOrder/placeOrder'
    })
  },
  //点击切换，给data赋值
  checkCurrent(e) {
    if (this.data.currentData == e.target.dataset.current) {
      return false
    } else if (e.target.dataset.current == 0) {
      //获取商店商品详情
      let param = {
        Index: 1,
        size: 100
      }
      goods.getShopGoods(this.data.shopId, param).then((res) => {
        res.data.forEach((item) => {
          item.num = 0
        })
        this.setData({
          goodsList: res.data
        })
        this.setData({
          currentData: e.target.dataset.current
        })
      })
    } else {
      //切换商店商品类型
      let param = {
        Index: 1,
        size: 100
      }
      goods
        .getCategoryGoods(this.data.shopId, e.target.dataset.current, param)
        .then((res) => {
          res.data.forEach((item) => {
            item.num = 0
          })
          this.setData({
            goodsList: res.data
          })
        })
      this.setData({
        currentData: e.target.dataset.current
      })
    }
  },
  plus: function (e) {
    //传入点击相关栏目所属的数组下标
    var idx = e.currentTarget.dataset.index
    //新建一个数组来存入goodsList
    const newList = this.data.goodsList;
    console.log('传入的数组下标为：' + idx)
    //查看当前栏目传入的数量num
    console.log('传入的数组选择数量为：' + e.currentTarget.dataset.num)
    //查看对应列表中的数量，以及点击+号后列表中的数量
    console.log(
      '当前列表存储的数量(goodsList)：' + newList[idx].num
    )
    newList[idx].num++
    console.log(
      '点击加号之后存储的数量(goodsList):' + newList[idx].num
    )
   this.setData({
     goodsList:newList
   })
    //调用计算总价
    this.getTotalPrice()
    
  },
  minus: function (e) {
    //传入点击相关栏目所属的数组下标
    var idx = e.currentTarget.dataset.index
    //新建一个数组来存入goodsList
    const newList = this.data.goodsList;
    console.log('传入的数组下标为：' + idx)
    //查看当前栏目传入的数量num
    console.log('传入的数组选择数量为：' + e.currentTarget.dataset.num)
    //查看对应列表中的数量，以及点击+号后列表中的数量
    console.log(
      '当前列表存储的数量(goodsList)：' + newList[idx].num
    )
    if (newList[idx].num == 0) {
      console.log('当前数量为0，不可以再减了')
    } else {
      newList[idx].num--
    }
    console.log(
      '点击减号之后存储的数量(goodsList):' + newList[idx].num
    )
    this.setData({
      goodsList:newList
    })
    //调用计算总价
    this.getTotalPrice()
  },

  //总价
  getTotalPrice() {
    let price = 0
    for (let i = 0; i < this.data.goodsList.length; i++) {
      price += this.data.goodsList[i].num * this.data.goodsList[i].price
      this.setData({
        price: price
      })
      console.log('当前总价为' + this.data.price)
    }
    //存入缓存
    wx.setStorage({
      key:'shopList',
      data: this.data.goodsList,
      
      // success:function () {
      //   wx.showToast({
      //     title: '成功',
      //   })
      // }
    })
    wx.setStorage({
      key:'totalPrice',
      data:this.data.price,
    })
  }
})
