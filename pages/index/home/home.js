// pages/index/home/home.js
const index = require('../../../api/index')
const user = require('../../../api/user')
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 页面的初始数据
   */
  data: {
    infoList: [],
    swiperList: [],
    statusBarHeight: wx.getStorageSync('statusBarHeight') + 'px',
    // 导航栏高度
    navigationBarHeight: wx.getStorageSync('navigationBarHeight') + 'px',
    index: 0,
    array: [],
    current: '',
    commList: []
  },
  attached() {
    this.initSwiper()
    this.initInfo()
    this.getSwitch()
  },
  methods: {
    getSwitch() {
      const param = {
        page: 1,
        size: 1000
      }
      user.getSwitch(param).then(res => {
        let arr = []
        this.setData({
          array: [res.data],
          commList: res.data.communityList
        })
        res.data.communityList.forEach(item => {
          arr.push(item.name)
        })
        // console.log(res.data.currentCommunity.name)
        this.setData({
          array: arr,
          current: res.data.currentCommunity.name
        })
      })
    },
    bindPickerChange: function (e) {
      this.setData({
        index: e.detail.value
      })
      let param = {
        "communityId": this.data.commList[this.data.index].id,
        "name": this.data.commList[this.data.index].name
      }
      user.changeCommunity(param).then(res => {
        if (res.code === 200) {
          wx.showToast({
            title: '切换成功',
            icon: 'success'
          })
          this.setData({
            current: this.data.commList[this.data.index].name
          })
         this.setData({
           current: this.data.commList[this.data.index]
         })
        }
      })
    },
    goLogin() {
      wx.navigateTo({
        url: '/pages/user/login',
      })
    },
    goLunboDetail(e) {
      console.log(e)
      wx.navigateTo({
        url: '/pages/index/home/lunbo/lunbo?id=' + e.currentTarget.dataset.id,
      })

    },
    initSwiper() {
      index.getSwiper(0).then((res) => {
        this.setData({
          swiperList: res.data
        })
      })
    },

    initInfo() {
      let param = {
        page_number: 1,
        size: 6
      }
      index.getInfo(param).then((res) => {
        console.log(res)
        this.setData({
          infoList: res.data.records
        })
      })
    },
    getAllInfo() {
      wx.navigateTo({
        url: '/pages/index/home/info/info'
      })
    },
    goDetail(e) {
      wx.navigateTo({
        url:
          '/pages/index/zixunabout/zixunabout?id=' + e.currentTarget.dataset.id
      })
    },
    tapToParking: function () {
      wx.navigateTo({
        url: '/pages/index/community-park/community-park'
      })
    },
    tapToGuibin: function () {
      wx.navigateTo({
        url: '/pages/index/property-service/property-service'
      })
    },
    tapToOpen: function () {
      wx.navigateTo({
        url: '/pages/index/wisdom/wisdom'
      })
    },
    tapToSecurity: function () {
      wx.navigateTo({
        url: '/pages/index/security/security'
      })
    }
  }
})
