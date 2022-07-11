// pages/communication/home/home.js
const communication = require('../../../api/communication')
const util = require('../../../utils/util')
const app = getApp()
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 页面的初始数据
   */
  data: {
    TabCur: [
      {
        name: '广场'
      },
      {
        name: '互助'
      },
      {
        name: '二手'
      },
      {
        name: '拼车'
      }
    ],
    Index: 1,
    size: 5,
    id: 1,
    triggered: false,
    hasMore: true,
    scrollLeft: 0,
    currentId: 0,
    comLunist: [],
    gcList: [],
    HdList: [],
    EsList: [],
    PcList: []
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */

  attached() {
    this.initData()
  },
  methods: {
    initData() {
      const param = {
        Index: this.data.Index,
        size: this.data.size,
        id: 1    
        // id: app.globalData.commId ? app.globalData.commId : this.data.id       
      }
      console.log(param)
      //获取广场数据
      communication.getCommuntyGc(param).then((res) => {
        console.log(res.data + "ddddddd")
        let data = res.data
        data.forEach((item) => {
          item.createTime = util.getDateDiff(item.createTime)
          item.banner = item.banner
            .substring(1, item.banner.length - 1)
            .split(',')
          item.banner.forEach((item1) => {
            return item1.trim()
          })
        })
        let arr = []
        arr = [...data]
        this.setData({
          gcList: arr
        })
      })
      // 获取互助数据
      communication.getCommuntyHd(param).then((res1) => {
        console.log(res1)
        let data1 = res1.data
        data1.forEach((item) => {
          item.createTime = util.getDateDiff(item.createTime)
          item.banner = item.banner
            .substring(1, item.banner.length - 1)
            .split(',')
          item.banner.forEach((item1) => {
            return item1.trim()
          })
        })
        let arr = []
        arr = [...data1]
        this.setData({
          HdList: arr
        })
      })
      //获取二手数据
      communication.getCommuntyEs(param).then((res2) => {
        console.log(res2)
        let data2 = res2.data
        data2.forEach((item) => {
          item.createTime = util.getDateDiff(item.createTime)
          item.banner = item.banner
            .substring(1, item.banner.length - 1)
            .split(',')
          item.banner.forEach((item1) => {
            return item1.trim()
          })
        })
        let arr = []
        arr = [...data2]
        this.setData({
          EsList: arr
        })
      })
      //拼车获取数据
      communication.getCommuntyPc(param).then((res3) => {
        console.log(res3)
        let data3 = res3.data
        data3.forEach((item) => {
          item.createTime = util.getDateDiff(item.createTime)
          item.banner = item.banner
            .substring(1, item.banner.length - 1)
            .split(',')
          item.banner.forEach((item1) => {
            return item1.trim()
          })
        })
        this.setData({
          PcList: data3
        })
      })
    },

    //上拉加载
    scrolltolower() {
      this.setData({ Index: (this.data.Index += 1) }, () => {
        //设置传参
        const param = {
          Index: this.data.Index,
          size: this.data.size,
          id: this.data.id
        }
        //广场上拉加载
        communication.getCommuntyGc(param).then((res) => {
          console.log(res)
          let data = res.data
          data.forEach((item) => {
            item.createTime = util.getDateDiff(item.createTime)
            item.banner = item.banner
              .substring(1, item.banner.length - 1)
              .split(',')
            item.banner.forEach((item1) => {
              return item1.trim()
            })
          })
          let arr = []
          arr = [...this.data.gcList, ...data]
          setTimeout(() => {
            this.setData({
              gcList: arr
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
        // 互助上拉加载
        communication.getCommuntyHd(param).then((res1) => {
          console.log(res1)
          let data1 = res1.data
          data1.forEach((item) => {
            item.createTime = util.getDateDiff(item.createTime)
            item.banner = item.banner
              .substring(1, item.banner.length - 1)
              .split(',')
            item.banner.forEach((item1) => {
              return item1.trim()
            })
          })
          let arr = []
          arr = [...this.data.HdList, ...data1]
          setTimeout(() => {
            this.setData({
              HdList: arr
            })
          }, 1000)
          if (res1.data != '') {
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
        // 二手上拉加载
        communication.getCommuntyEs(param).then((res2) => {
          console.log(res2)
          let data2 = res2.data
          data2.forEach((item) => {
            item.createTime = util.getDateDiff(item.createTime)
            item.banner = item.banner
              .substring(1, item.banner.length - 1)
              .split(',')
            item.banner.forEach((item1) => {
              return item1.trim()
            })
          })
          let arr = []
          arr = [...this.data.EsList, ...data2]
          setTimeout(() => {
            this.setData({
              EsList: arr
            })
          }, 1000)
          if (res2.data != '') {
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
        //拼车上拉加载
        communication.getCommuntyPc(param).then((res3) => {
          console.log(res3)
          let data3 = res3.data
          data3.forEach((item) => {
            item.createTime = util.getDateDiff(item.createTime)
            item.banner = item.banner
              .substring(1, item.banner.length - 1)
              .split(',')
            item.banner.forEach((item1) => {
              return item1.trim()
            })
          })
          let arr = []
          arr = [...this.data.PcList, ...data3]
          setTimeout(() => {
            this.setData({
              PcList: arr
            })
          }, 1000)
          if (res3.data != '') {
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
      console.log(this.data.Index)
      console.log('上拉加载')
    },
    //下拉刷新
    refresherrefresh() {
      this.setData(
        {
          Index: 1
        },
        () => {
          //设置传参
          const param = {
            Index: this.data.Index,
            size: this.data.size,
            id: this.data.id
          }
          //广场下拉刷新
          communication.getCommuntyGc(param).then((res) => {
            console.log(res)
            let data = res.data
            data.forEach((item) => {
              item.createTime = util.getDateDiff(item.createTime)
              item.banner = item.banner
                .substring(1, item.banner.length - 1)
                .split(',')
              item.banner.forEach((item1) => {
                return item1.trim()
              })
            })
            setTimeout(() => {
              this.setData({
                triggered: false
              })
            }, 1500)
            let arr = []
            arr = [...res.data]
            this.setData({
              gcList: arr
            })
          })
          //互助下拉刷新
          communication.getCommuntyHd(param).then((res1) => {
            console.log(res1)
            let data1 = res1.data
            data1.forEach((item) => {
              item.createTime = util.getDateDiff(item.createTime)
              item.banner = item.banner
                .substring(1, item.banner.length - 1)
                .split(',')
              item.banner.forEach((item1) => {
                return item1.trim()
              })
            })
            setTimeout(() => {
              this.setData({
                triggered: false
              })
            }, 1500)
            let arr = []
            arr = [...res1.data]
            this.setData({
              HdList: arr
            })
          })
          //二手下拉刷新
          communication.getCommuntyEs(param).then((res2) => {
            console.log(res2)
            let data2 = res2.data
            data2.forEach((item) => {
              item.createTime = util.getDateDiff(item.createTime)
              item.banner = item.banner
                .substring(1, item.banner.length - 1)
                .split(',')
              item.banner.forEach((item1) => {
                return item1.trim()
              })
            })
            setTimeout(() => {
              this.setData({
                triggered: false
              })
            }, 1500)
            let arr = []
            arr = [...res2.data]
            this.setData({
              EsList: arr
            })
          })
          //拼车下拉刷新
          communication.getCommuntyPc(param).then((res3) => {
            console.log(res3)
            let data3 = res3.data
            data3.forEach((item) => {
              item.createTime = util.getDateDiff(item.createTime)
              item.banner = item.banner
                .substring(1, item.banner.length - 1)
                .split(',')
              item.banner.forEach((item1) => {
                return item1.trim()
              })
            })
            setTimeout(() => {
              this.setData({
                triggered: false
              })
            }, 1500)
            let arr = []
            arr = [...res3.data]
            this.setData({
              PcList: arr
            })
          })
        }
      )
      console.log('下拉刷新')
      wx.showToast({
        title: '刷新成功'
      })
    },
    // onRefresh(){
    //   //在当前页面显示导航条加载动画
    //   wx.showNavigationBarLoading();
    //   //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
    //   wx.showLoading({
    //     title: '刷新中...',
    //   })
    //   this.initData();
    // },
    // onPullDownRefresh() {
    //   wx.showNavigationBarLoading()
    //   console.log("onPullDownRefresh");
    //   setTimeout(() => {
    //     // 标题栏隐藏刷新转圈圈图标
    //     wx.hideNavigationBarLoading()

    //   }, 2000);
    // },
    // // 触底加载
    // onReachBottom(e) {
    //   console.log(this.data.hasMore)
    //   if (this.data.hasMore = true) {
    //     console.log("进入hasmore循环")
    //     this.setData({
    //       Index: this.data.Index + 1,  // 每次触发上拉事件，把pageNum+1
    //       isFirstLoad: false                // 触发到上拉事件，把isFirstLoad设为为false
    //     });
    //     this.initData();
    //   }
    //   console.log("触底")
    // },
    tabSelect(e) {
      console.log(e.currentTarget.dataset)
      this.setData({
        currentId: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.name - 1) * 60
      })
    }
  },
  options: { addGlobalClass: true }
})
