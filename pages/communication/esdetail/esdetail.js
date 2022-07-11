// pages/communication/esdetail/esdetail.js
const communication = require('../../../api/communication')
const util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    esdetail: {},
    commentList: [],
    show: false,
    hasChange:false
  },
  bindcontent(e) {
    this.setData({
      content: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log()
    this.getEs(options.id)
    this.setData({
      typeId: options.type
    })
    
    
    let param = {
      Index: 1,
      size:100
    }


    communication.getComment(Number(options.type)+1,options.id,param).then(res => {
      this.setData({
        commentList: res.data
      })
    })
     //获取点赞数
     communication.getCount(Number(options.type)+1,options.id).then((res) => {
      this.setData({
        count:res.data.count
      })
    })
  },
  //点赞
  dianzan(){
    let param = {
      'article_id': Number(this.data.detail.id),
      'type_id': Number(this.data.typeId) + 1,
    }
    console.log(param)
    communication.posCount(param).then((res) => {
      if (res.code == 200) {
        wx.showToast({
          title: '提交成功',
          icon: 'suuccess',
          duration: 1500
        })
        wx.navigateBack()
      }
      
    })
  },
  //收藏
  shouchang(){
    let param = {
      'new_id' : this.data.esdetail.id,
      'banner' : this.data.esdetail.banner.toString(),
      'title' : this.data.esdetail.content
    }
    console.log(param)
    communication.posShouc(param).then((res) => {
      if (res.code == 200) {
        wx.showToast({
          title: '提交成功',
          icon: 'suuccess',
          duration: 1500
        })
        wx.navigateBack()
      }
    })
  },

  submit() {
    console.log(Number(this.data.typeId) + 1)
    let param = {
      content: this.data.content,
      'article_id': Number(this.data.esdetail.id),
      'type_id': Number(this.data.typeId) + 1
    }
    if (this.data.content == '') {
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 2000 //持续的时间
      })
      return
    }
    communication.posComment(param).then((res) => {
      if (res.code == 200) {
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },
  getEs(id){
    communication.getCommuntyEsDetail(id).then(res => {
      res.data.createTime = util.getDateDiff(res.data.createTime)
      res.data.banner = res.data.banner.substring(1, res.data.banner.length - 1).split(',')
      res.data.banner.forEach((item1) => {
        return item1.trim()
      })
      this.setData({
        esdetail: res.data
      })
    })
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
  options: {
    addGlobalClass: true
  }
})