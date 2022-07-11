// pages/index/community-park/park-interface/park-interface.js
const park = require('../../../../api/park')
const util = require('../../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    invited: [], //已有车位信息
    stallid: [], //已有车位 parkingId
    charge: [], //停车收费信息
    message: [], //整个数据
    parking: [], //区位号
    stall: [], //车位号
    id: '', //页面传值id
    name: '', //社区名
    time: '', //当前时间
    parkingId: '',
    section1: '',
    section2: '',
    carNumber: '',
  },
  goput() {
    let param = {
      "parkingId": this.data.id,
      "section": this.data.park,
      "carportNo": this.data.car,
      "cardName": this.data.card,
      "carNumber": this.data.code
    }
    park.putParkStart(param).then(res => {
      wx.showToast({
        title: '提交成功',
        icon: 'suuccess',
        duration: 1500
      })
      wx.navigateBack()
    })
  },
  ParkChange(e) {
    this.setData({
      park: e.detail.value
    })
    let num = parseInt(e.detail.value)
    switch (num) {
      case 0:
        var sum = this.data.parking[0];
        break;
      case 1:
        var sum = this.data.parking[1];
        break;
    }
    let count = parseInt(this.data.id)

    let stall = this.data.message[count][sum]
    this.setData({
      parkingId: count,
      section1: sum,
      stall: stall
    })
  },
  CarChange(e) {
    this.setData({
      car: e.detail.value
    })
    let num = e.detail.value
    this.setData({
      section2: this.data.stall[num]
    })
  },
  codeValue(e) {
    this.setData({
      carNumber: e.detail.value
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  putParkStart() {
    let params = {
      "parkingId": this.data.parkingId,
      "section": this.data.section1 + '-' + this.data.section2,
      "carNumber": this.data.carNumber,
      "startTime": this.data.time
    }
    if(this.data.carNumber.length == 0) {
      wx.showToast({
        title: '请输入车牌',
        icon: 'error'
      })
    }
    if(this.data.section2.length == 0)  {
      wx.showToast({
        title: '请选择车位号',
        icon: 'error'
      })
    }
    if(this.data.section1.length == 0) {
      wx.showToast({
        title: '请选择区号',
        icon: 'error'
      })
    }
    console.log(params)
    park.putParkStart(params).then(res => {
      console.log(res)
      if(res.code == 200) {
        wx.showToast({
          title: '提交成功',
          icon: 'suuccess',
          duration: 1500
        })
        wx.navigateBack()
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
//获取当前时间
    let timer = util.current();
    // 停车收费规则
    park.getChargeRule().then(res => {
      this.setData({
        charge: res.data
      })
    })

    this.setData({
      id: options.id,
      time: timer
    })
    let id = options.id

    //已有车位管理
    park.getStall(id).then(res => {
      let arr = []
      for (let i = 0; i < res.data.length; i++) {
        arr[i] = res.data[i].parkingId
      }

      this.setData({
        invited: res.data,
        stallid: arr
      })

      // function getWordCnt(arr) {
      //   let obj = {};
      //   for (let i = 0; i < arr.length; i++) {
      //     let item = arr[i];
      //     obj[item] = (obj[item] + 1) || 1;
      //   }
      //   return obj;
      // }
      // let num = getWordCnt(arr)
      // console.log(num[id]);

      // console.log(res.data)
      // console.log(arr.includes(id))
      // if (arr.includes(id)) {
      //   for (let i = 0; i < num[id]; i++) {
      //   }
      // }
    })

    //查看社区名
    park.getParkName().then(res => {
      let arrName = []
      for (let i = 0; i < res.data.length; i++) {
        arrName[i] = res.data[i].text
      }
      let num = parseInt(id) - 1
      this.setData({
        name: arrName[num]
      })
    })

    //查看可停车车位信息
    park.getAbleRental().then(res => {
      let num = parseInt(id)
      this.setData({
        message: res.data.selectRentals
      })
      switch (num) {
        case 1:
          let code = Object.getOwnPropertyNames(res.data.selectRentals[id]);
          this.setData({
            parking: code
          })
          break;
        case 2:
          let code1 = Object.getOwnPropertyNames(res.data.selectRentals[id]);
          this.setData({
            parking: code1,
          })
          break;
        case 3:
          let code2 = Object.getOwnPropertyNames(res.data.selectRentals[id]);
          this.setData({
            parking: code2,
          })
          break;
        case 4:
          let code3 = Object.getOwnPropertyNames(res.data.selectRentals[id]);
          this.setData({
            parking: code3,
          })
          break;
        case 5:
          let code4 = Object.getOwnPropertyNames(res.data.selectRentals[id]);
          this.setData({
            parking: code4,
          })
          break;
      }

    })
  },

  tapToRental: function () {
    wx.navigateTo({
      url: '../rental-car/rental-car',
    })
  },
})