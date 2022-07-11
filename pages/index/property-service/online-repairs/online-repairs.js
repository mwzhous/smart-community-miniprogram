// pages/index/property-service/online-repairs/online-repairs.js
const estate = require('../../../../api/estate')
const util = require('../../../../utils/util')
const FormData = require('../../../../utils/formData')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    picker: ['公共维修', '居家维修', ],
    time: '请选择',
    imgList: [],
    index: '',
    username: '',
    phone: '',
    address: '',
    repairType: '',
    repairContent: '',
    repairTitle: '',
    content: ''
  },
  bindusername(e) {
    this.setData({
      username: e.detail.value
    })
  },
  textareaBInput(e) {
    this.setData({
      content: e.detail.value
    })
  },
  bindphone(e) {
    this.setData({
      phone: e.detail.value
    })
  },
  bindaddress(e) {
    this.setData({
      address: e.detail.value
    })
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  RepairsChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  ChooseImage() {
    console.log('1231')
    let that = this
    var num = 9 - that.data.imgList.length
    if (num == 0) {
      wx.showToast({
        title: '最多能上传9张图片',
        duration: 1500
      });
      return
    }
    wx.showActionSheet({
      itemList: ['从相册获取', '拍照'],
      success(res1) {
        if (res1.tapIndex == 0) {
          wx.chooseImage({
            count: 9, //默认9
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album'], //从相册选择
            success: (res) => {
              console.log(res)

              if (that.data.imgList.length != 0) {
                that.setData({
                  imgList: that.data.imgList.concat(res.tempFilePaths)
                })
              } else {
                that.setData({
                  imgList: res.tempFilePaths
                })
              }
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
                  if (that.data.imgList.length != 0) {
                    console.log(res.tempFilePaths)
                    that.setData({
                      imgList: that.data.imgList.concat(res.tempFilePaths)
                    })
                  } else {
                    that.setData({
                      imgList: res.tempFilePaths
                    })
                  }
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
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '业主',
      content: '确定要删除这张照片吗？',
      cancelText: '再想想',
      confirmText: '再见',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  // 提交报修记录
  pushRepair() {
    let formData = new FormData();
    formData.append('username', this.data.username)
    formData.append('phone', this.data.phone)
    formData.append('address', this.data.address)
    formData.append('orderTime', util.getYearYueDay() +' '+ this.data.time + ':00')
    formData.append('repairType', this.data.index)
    formData.append('repairContent', this.data.content)
    formData.append('repairTitle', this.data.index)
    for(let i = 0;i<this.data.imgList.length;i++) {
      formData.appendFile('imgs', this.data.imgList[i])
    }
    let data = formData.getData()
    if(this.data.content.length <= 10)  {
      wx.showToast({
        title: '输入10以上说明',
        icon: 'error'
      })
    }
    if(this.data.address.length == 0)  {
      wx.showToast({
        title: '请输入地址',
        icon: 'error'
      })
    }
    if(this.data.phone.length != 11)  {
      wx.showToast({
        title: '请确认手机号',
        icon: 'error'
      })
    }
    if(this.data.username.length == 0)  {
      wx.showToast({
        title: '请输入联系人',
        icon: 'error'
      })
    }

    estate.postRepair(data.buffer,data.contentType).then(res => {
      if(res.code == 200) {
        wx.showToast({
          title: '提交成功',
          icon: 'suuccess',
          duration: 1500
        })
        wx.navigateTo({
          url: './records/records',
        })
      }
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
  tapToRecords: function () {
    wx.navigateTo({
      url: './records/records',
    })
  }
})