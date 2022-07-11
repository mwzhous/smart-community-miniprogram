// pages/index/zixunabout/zixunabout.js
const index = require('../../../api/index')
const util = require('../../../utils/util')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    comment: [],
    repairList: [],
    content: '',
    currenId: '',
    id: Number
  },
  bindcontent(e) {
    this.setData({
      content: e.detail.value
    })
  },
  replyComment() {
    // 'parentCommentId': Number(this.data.comment.parentCommentId)
  },
  submit() {
    let param = {
      content: this.data.content,
      newsId: Number(this.data.detail.id),
      // parentCommentId: Number(this.data.comment.parentCommentId)
    }
    console.log(param)
    index.posComment(param).then((res) => {
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
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let param = {
      news_id: options.id
    }
    index.getDetail(param).then((res) => {
      res.data.createTime = res.data.createTime.substring(0, 10)
      this.setData({
        detail: res.data
      })
      index.getComment(res.data.id).then((res) => {
        res.data.forEach((item) => {
          item.createTime = item.createTime.replace(/T/, ' ')
          item.createTime = util.getDateDiff(item.createTime)
        })
        this.setData({
          comment: res.data
        }) 
        
      })
    })
  },
  dianzan(e){
    this.setData({
      id:e.target.dataset.id 
  })
    index.postThump(Number(this.data.id)).then((res) => {
      if (res.code == 200) {
        wx.showToast({
          title: '提交成功',
          icon: 'suuccess',
          duration: 1500
        })
        wx.navigateBack()
      }
    })
    index.postCancel(Number(this.data.id)).then((res) => {
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
  dianzan1(e){
    this.setData({
      id:e.target.dataset.id 
  })
  index.postThump(Number(this.data.id)).then((res) => {
    if (res.code == 200) {
      wx.showToast({
        title: '提交成功',
        icon: 'suuccess',
        duration: 1500
      })
      wx.navigateBack()
    }
  })
  index.postCancel(Number(this.data.id)).then((res) => {
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
  options: { addGlobalClass: true }
})
