// pages/serve/propertyTransactions/propertyTransactions.js
const serve = require('../../../api/serve')
const config = require('../../../utils/config')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: config.imUrl,
    triggered: false,
    page: 1,
    size: 5,
    estateTransaction: [
      //   {
      //     "id": 1,
      //       "adminId": 1,
      //       "communityId": 1,
      //       "title": "汤臣一品",
      //       "content": "汤臣一品大甩卖",
      //       "imageUrl": "https://gimg2.baidu.com/image_search/src=http%3A%2F%2F1loushi.cn%2Fwp-content%2Fuploads%2F2022%2F02%2F1645149742855_1.jpg&refer=http%3A%2F%2F1loushi.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655272026&t=8b0296b6fe6f75dba2e8f767cf960316",
      //       "company": "汤臣一品公司",
      //       "contact": "小杨",
      //       "phone": "18452555712",
      //       "address": "上海",
      //       "price": 5000000,
      //       "state": 0,
      //       "marks": 0,
      //       "finishTime": null,
      //       "deleteFlag": 0,
      //       "createTime": "2022-05-16 11:57:46",
      //       "updateTime": "2022-05-16 11:57:46",
      //       "style":"高档"
      //   },
      //       {
      //           id:2,
      //           imageUrl:"https://soft2176-use.oss-cn-hangzhou.aliyuncs.com/soft-training-2022-5/building.png",
      //           title:"千水庭院",
      //           style:"普通",
      //           price:23000,
      //           address:"南京玄武",
      //           "content": "汤臣一品大甩卖",
      //       },
      //       {
      //           id:2,
      //           imageUrl:"https://soft2176-use.oss-cn-hangzhou.aliyuncs.com/soft-training-2022-5/shop.png",
      //           title:"玲珑翠谷",
      //           style:"中档",
      //           price: 38000,
      //           address:"南京栖霞",
      //           "content": "汤臣一品大甩卖",
      //       }
    ]
  },
  onLoad() {
    this.initData()
  },
  initData() {
    //设置传参
    const params = {
      page: this.data.page,
      size: this.data.size
    }
    //获取数据
    serve.getFangChan(params).then((res) => {
      console.log('获取到数据' + res.data)
      let arr = []
      arr = [...res.data]
      this.setData({
        estateTransaction: arr
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
  //数据传值 传id
  tapToFangchan(e) {
    let id = e.currentTarget.dataset.id
    console.log(id)
    wx.navigateTo({
      url: './propertyDetail/propertyDetail?id=' + id
    })
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
      serve.getFangChan(params).then((res) => {
        console.log('获取到数据' + res.data)
        let arr = []
        arr = [...this.data.estateTransaction, ...res.data]
        setTimeout(() => {
          this.setData({
            estateTransaction: arr
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
        serve.getFangChan(params).then((res) => {
          console.log('获取到数据' + res.data)
          setTimeout(() => {
            this.setData({
              triggered: false
            })
          }, 1500)
          let arr = []
          arr = [...res.data]
          this.setData({
            estateTransaction: arr
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
