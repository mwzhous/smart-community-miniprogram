// pages/communication/detail/detail.js
const communication = require('../../../api/communication')
const util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    hasChange:false,
    detail: {},
    commentList: [],
    content: '',
    articleId: '',
    typeId: '',
    banner:'',
    title:''
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  bindcontent(e) {
    this.setData({
      content: e.detail.value
    })
  },
  onLoad(options) {
    // console.log(options.type)
    this.setData({
      typeId: options.type,
      id: options.id,
    
    })
    console.log(options.id + "!!!articleid!!!")
    console.log(options.type + "!!!articleid!!!")

    if(options.type == 0) {
      this.getGc(options.id)
    } else if (options.type == 1) {
      this.getHz(options.id)
    }
    let param = {
      Index: 1,
      size: 100
    }
    communication.getComment(Number(options.type)+1,options.id,param).then(res => {
      this.setData({
        commentList: res.data
      })
    })
    // let params ={
    //   typeId:  Number(this.data.typeId) + 1,
    //   id: Number(this.data.detail.id)
    // }
    //获取点赞数
    const params ={
      id : options.id,
      type_id : Number(options.type)+1
    }
    communication.getCount(params).then((res) => {
      this.setData({
        count:res.data.count
      })
    })
    
  },
  submit() {
    console.log(Number(this.data.typeId) + 1)
    let param = {
      content: this.data.content,
      'article_id': Number(this.data.detail.id),
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
  shouchang(){
    let param = {
      'new_id' : this.data.detail.id,
      'banner' : this.data.detail.banner.toString(),
      'title' : this.data.detail.content
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

  getGc(id) {
    communication.getCommuntyGcDetail(id).then((res) => {
      console.log(res.data+"ddddddd")
      res.data.createTime = util.getDateDiff(res.data.createTime)
      res.data.banner = res.data.banner.substring(1, res.data.banner.length - 1).split(',')
      res.data.banner.forEach((item1) => {
        return item1.trim()
      })
      this.setData({
        detail: res.data
      })
    })
  },
  getHz(id) {
    communication.getCommuntyHdDetail(id).then(res => {

      res.data.createTime = util.getDateDiff(res.data.createTime)
      res.data.banner = res.data.banner.substring(1, res.data.banner.length - 1).split(',')
      res.data.banner.forEach((item1) => {
        return item1.trim()
      })
      this.setData({
        detail: res.data
      })
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