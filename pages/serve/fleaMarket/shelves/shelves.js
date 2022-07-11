// pages/index/property-service/online-repairs/online-repairs.js
const bazzer = require('../../../../api/bazaar')
const util = require('../../../../utils/util')
const FormData = require('../../../../utils/formData')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    picker: [],
    index: 0,
    imgList: [],
    content: '',
    name: '',
    address: ['请选择地址'],
    price: 0,
    typeList: []
  },
  bindprice(e) {
    this.setData({
      price: e.detail.value
    })
  },
  bindtitle(e) {
    this.setData({
      name: e.detail.value
    })
  },
  textareaBInput(e) {
    this.setData({
      content: e.detail.value
    })
  },

  RegionChange(e) {
    this.setData({
      address: e.detail.value
    })
  },
  typeChange(e) {
    this.setData({
      index: e.detail.value
    })
    console.log(this.data.typeList[this.data.index].title)
  },
  ChooseImage() {
    let that = this
    var num = 9 - that.data.imgList.length
    if (num == 0) {
      wx.showToast({
        title: '最多能上传9张图片',
        duration: 1500
      })
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
          })
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
    })
  },
  DelImg(e) {
    wx.showModal({
      title: '业主',
      content: '确定要删除这张照片吗？',
      cancelText: '拒绝',
      confirmText: '确定',
      success: (res) => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1)
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  // 提交
  pushGoods() {
    let formData = new FormData()
    formData.append('price', Number(this.data.price))
    formData.append('name', this.data.name)
    formData.append('content', this.data.content)
    formData.append('address', this.data.address)
    formData.append('communityId', 1)
    formData.append('typeId', this.data.typeList[this.data.index].id)
    for (let i = 0; i < this.data.imgList.length; i++) {
      formData.appendFile('uploadFiles', this.data.imgList[i])
    }
    let data = formData.getData()
    console.log(this.data.address), console.log(this.data.typeList)
    if (this.data.imgList.length == 0) {
      wx.showToast({
        title: '请添加图片',
        icon: 'none',
        duration: 2000
      })
    }
    else if (this.data.name == '') {
      wx.showToast({
        title: '商品标题不能为空',
        icon: 'none',
        duration: 2000 //持续时间
      })
      return
    }
    else if (this.data.content == '') {
      wx.showToast({
        title: '商品详细描述不能为空',
        icon: 'none',
        duration: 2000 //持续时间
      })
      return
    }
    else if (this.data.address[0] === '请选择地址') {
      wx.showToast({
        title: '请选择地点',
        icon: 'none',
        duration: 2000 //持续时间
      })
      return
    }
    //else if (this.data.picker.length >= 0) {
    //   wx.showToast({
    //     title: '请选择分类',
    //     icon: 'none',
    //     duration: 2000 //持续时间
    //   })
    //   return
    // }
    else if (this.data.price == 0) {
      wx.showToast({
        title: '请输入价格',
        icon: 'none',
        duration: 2000 //持续时间
      })
      return
    }
   else{ bazzer.pushFleaMarket(data.buffer, data.contentType).then((res) => {
      if (res.code == 200) {
        wx.showToast({
          title: '提交成功',
          icon: 'suuccess',
          duration: 1500
        })
        wx.navigateBack()
      }
    })
  }
  },
  //上架记录
  tapToShangJia() {
    wx.navigateTo({
      url: '/pages/serve/fleaMarket/onRecord/onRecord'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let arr = []
    bazzer.getFleaGoodsType().then((res) => {
      this.setData({
        typeList: res.data
      })
      res.data.forEach((item) => {
        arr.push(item.title)
      })
      this.setData({
        picker: arr
      })
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
  onShareAppMessage() {}
})
