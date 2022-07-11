const Phone = require('../../../../api/bazaar')
Page({
  data: {
    page: 1,
    size: 6,
    typeId: 1,
    TabCur: 0,
    price: 0,
    scrollLeft: 0,
    selectTab: '默认',
    phoneList: [],
    descendingOrderList: [],
    selectList: [
      {
        name: '默认',
        icon: 'cuIcon-triangledownfill',
        list: [
          {
            id: 1,
            content: '默认'
          },
          {
            id: 1,
            content: '最新'
          },
          {
            id: 1,
            content: '最近'
          }
        ]
      },
      {
        name: '价格',
        icon: 'cuIcon-order',
        list: [
          {
            id: 1,
            content: '降序'
          },
          {
            id: 1,
            content: '默认'
          }
        ]
      },
      {
        name: '筛选',
        icon: 'cuIcon-filter',
        list: [
          {
            id: 1,
            content: '华为'
          },
          {
            id: 1,
            content: '小米'
          },
          {
            id: 1,
            content: 'OPPO'
          },
          {
            id: 1,
            content: 'VIVO'
          },
          {
            id: 1,
            content: 'OnePlus'
          }
        ]
      }
    ]
  },
  // 选中select_tab
  chooseTab(e) {
    let index = e.currentTarget.dataset.id
    if (index != this.data.showIndex) {
      this.setData({
        showIndex: index
      })
    } else {
      // 再次点击应该收起
      this.setData({
        showIndex: -1
      })
    }
  },
  // 选中选项
  chooseOption(e) {
    let val = e.currentTarget.dataset.value,
      idx = e.currentTarget.dataset.index
    console.log(val)
    console.log(idx)
    //设置传参
    const params = {
      page: this.data.page,
      size: this.data.size,
      typeId: this.data.typeId
    }
    if (val == '降序') {
      const param = {
        typeId: this.data.typeId,
        price: this.data.price,
        page: this.data.page,
        size: this.data.size
      }
      Phone.getDescendingOrderPhone(param).then((res) => {
        console.log('手机价格降序页面' + res.data)
        this.setData({
          phoneList: res.data,
          selectTab: '降序'
        })
      })
    } else {
      Phone.getAllPhone(params).then((res) => {
        console.log('全部手机页面' + res.data)
        this.setData({
          phoneList: res.data,
          selectTab: '默认'
        })
        console.log(this.data.selectTab)
      })
    }
    this.setData({
      [`selectList[${idx}].active`]: val,
      showIndex: -1
    })
  },
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
  //跳转
  tapToPhoneDetail: function (e) {
    console.log(e)
    wx.navigateTo({
      url:
        '/pages/serve/fleaMarket/shopDetail/shopDetail?id=' +
        e.currentTarget.dataset.id
    })
  },
  onLoad() {
    this.initData()
  },
  initData() {
    //设置传参
    const params = {
      page: this.data.page,
      size: this.data.size,
      typeId: this.data.typeId
    }
    Phone.getAllPhone(params).then((res) => {
      console.log('全部手机页面' + res.data)
      this.setData({
        phoneList: res.data
      })
    })
  },
  //滚动到底部 上拉分页加载
  scrolltolower() {
    this.setData({ page: (this.data.page += 1) }, () => {
      // //设置传参
      if (this.data.selectTab == '降序') {
        var params = {
          page: this.data.page,
          size: this.data.size,
          typeId: this.data.typeId,
          price: this.data.price
        }
      } else {
        var params = {
          page: this.data.page,
          size: this.data.size,
          typeId: this.data.typeId
        }
      }
      //获取数据
      Phone.getAllPhone(params).then((res) => {
        console.log('获取到数据' + res.data)
        let arr = []
        arr = [...this.data.phoneList, ...res.data]
        setTimeout(() => {
          this.setData({
            phoneList: arr
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
  refresherrefresh(params) {
    this.setData(
      {
        page: 1
      },
      () => {
        console.log(this.data.selectTab)
        //设置传参
        if (this.data.selectTab == '降序') {
          var params = {
            page: this.data.page,
            size: this.data.size,
            typeId: this.data.typeId,
            price: this.data.price
          }
        } else {
          var params = {
            page: this.data.page,
            size: this.data.size,
            typeId: this.data.typeId
          }
        }
        //获取数据
        Phone.getAllPhone(params).then((res) => {
          console.log('获取到数据' + res.data)
          setTimeout(() => {
            this.setData({
              triggered: false
            })
          }, 1500)
          let arr = []
          arr = [...res.data]
          this.setData({
            phoneList: arr
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
