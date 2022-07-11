// pages/serve/fleaMarket/onRecord/onRecord.js
const fleaMarket = require('../../../../api/bazaar')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    page: 1,
    size: 10,
    recordList: [
      // {
      //   id: 1,
      //   userId: 1,
      //   communityId: 44,
      //   typeId: 28,
      //   showIndex: -1,
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
      //   name: 'Apple iPhone X(A1865) 64GB',
      //   content: 'Apple iPhone X(A1865) 64GB 深空灰色移动联通电信4G手机',
      //   price: '4999.00'
      // },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    //设置传参
    const param = {
      page: this.data.page,
      size: this.data.size
    }
    fleaMarket.getOnRecord(param).then((res) => {
      console.log('获取上架提交记录' + res.data)
      this.setData({
        recordList: res.data
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
  onShareAppMessage() {}
})
