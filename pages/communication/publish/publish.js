// pages/communication/publish/publish.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: [{
      name: "广场"
    },
    {
      name: "互助"
    },
    {
      name: "二手"
    },
    {
      name: "拼车"
    }
  ],
    currentId: 0,
    comLunist:[],
    gcList: []
  },
  attached() {
    this.initData()
  },

    initData(){
      communication.getCommucation().then(res => {
        this.comLunist=res.data

        this.setData({
          comLunist: this.comLunist
        })
        console.log(this.comLunist)
        
      })
      const param = {
        Index: 1,
        size: 5
      }
      communication.getCommuntyGc(param).then(res => {
        console.log(res)
        this.setData({
          gcList: res.data
        })
      })
    },
    buttonSelect(e) {
      console.log(e.currentTarget.dataset)
      this.setData({
        currentId: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.name - 1) * 60
      })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  },
  options: { addGlobalClass: true }
})