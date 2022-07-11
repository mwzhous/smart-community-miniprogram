// pages/user/home/personalData/personalData.js
const app = getApp()
const user = require('../../../../api/user')
const util = require('../../../../utils/util')
const FormData = require('../../../../utils/formData')
const auth = require('../../../../api/auth')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    imgList: [],
    gender: ['男', '女', '保密'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userInfo = JSON.parse(wx.getStorageSync('userInfo'))
    console.log(userInfo)
    this.setData({
      userInfo: userInfo
    })
  },
  // bindavatar(e) {
  //   let userInfo = this.data.userInfo
  //   userInfo.avatar = e.detail.value
  //   this.setData({
  //     userInfo
  //   })
  // },

  // 获取用户名
  bindaccount(e) {
    let userInfo = this.data.userInfo
    userInfo.account = e.detail.value
    this.setData({
      userInfo
    })
  },
  // 获取姓名
  bindusername(e) {
    let userInfo = this.data.userInfo
    userInfo.username = e.detail.value
    this.setData({
      userInfo
    })
  },
  // 监听性别变化
  genderChange(e) {
    let userInfo = this.data.userInfo
    userInfo.gender = this.data.gender[e.detail.value]
    this.setData({
      index: e.detail.value,
      userInfo
    })
  },
  RegionChange(e) {
    let userInfo = this.data.userInfo
    let str = e.detail.value
    userInfo.area = str.join("-")
    this.setData({
      userInfo
    })
  },
  bindphone(e) {
    let userInfo = this.data.userInfo
    userInfo.phone = e.detail.value
    this.setData({
      userInfo
    })
  },
  ChooseImage() {
    let that = this
    wx.showActionSheet({
      itemList: ['从相册获取', '拍照'],
      success(res1) {
        if (res1.tapIndex == 0) {
          wx.chooseImage({
            count: 9, //默认9
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album'], //从相册选择
            success: (res) => {
              that.setData({
                imgList: res.tempFilePaths,
              })
              let formData = new FormData();
              formData.appendFile('avatar', that.data.imgList[0])
              let data = formData.getData()
              user.upload(data.buffer, data.contentType).then(res => {
                if (res.code == 200) {
                  let userInfo = that.data.userInfo
                  userInfo.avatar = res.data
                  that.setData({
                    userInfo
                  })
                }
              })
            }
          });
        } else if (res1.tapIndex == 1) {
          wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['camera'],
            success: function (res) {
              wx.saveImageToPhotosAlbum({
                filePath: res.tempFilePaths[0],
                success: function () {
                  that.setData({
                    imgList: res.tempFilePaths,
                  })
                  let formData = new FormData();
                  formData.appendFile('avatar', that.data.imgList[0])
                  let data = formData.getData()
                  user.upload(data.buffer, data.contentType).then(res => {
                    if (res.code == 200) {
                      let userInfo = that.data.userInfo
                      userInfo.avatar = res.data
                      that.setData({
                        userInfo
                      })
                    }
                  })
                }
              })
            }
          })
        }
      },
      fail(e) {
        console.log(e)
      }
    })

  },
  pushUser() {
    let param = {
      "id": this.data.userInfo.id,
      "account": this.data.userInfo.account,
      "username": this.data.userInfo.username,
      "gender": this.data.userInfo.gender,
      "area": this.data.userInfo.area,
      "phone": this.data.userInfo.phone,
      avatar: this.data.userInfo.avatar
    }
    user.personEdit(param).then(res => {
      console.log(res)
      if (res.code === 200) {
        wx.showToast({
          title: '修改成功',
          icon: 'success'
        })
        auth.getUser().then(res => {
          // console.log(res.data)
          this.setData({
            grList: res.data
          })
          wx.setStorageSync('userInfo', JSON.stringify(res.data))
        })
        wx.navigateBack({
          delta: 1,
        })
      }
    })
  },
  // 跳转到绑定手机号
  goBindPhone() {
    let phone = this.data.userInfo.phone
    wx.navigateTo({
      url: './bindPhone/bindPhone?phone=' + phone,
    })
  },
  // 跳转到绑定钉钉
  goBindDD() {
    wx.navigateTo({
      url: './bindDD/bindDD',
    })
  },
  // 跳转到绑定github
  goBindGithub() {
    wx.navigateTo({
      url: './bindGithub/bindGithub',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})