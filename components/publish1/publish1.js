// components/publish1/publish1.js
const communication = require('../../api/communication')
const util = require('../../utils/util')
const FormData = require('../../utils/formData')
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    index: '',
    imgList: [],
    content: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindcontent(e) {
      this.setData({
        content: e.detail.value
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
        cancelText: '再想想',
        confirmText: '再见',
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
    submit() {
      let formData = new FormData()
      formData.append('content', this.data.content)
      formData.append('title', this.data.content)
      for (let i = 0; i < this.data.imgList.length; i++) {
        formData.appendFile('imgs', this.data.imgList[i])
      }
      let data = formData.getData()
      if (this.data.content == '') {
        wx.showToast({
          title: '请输入内容',
          icon: 'none',
          duration: 2000 //持续的时间
        })
        return
      }
      if (this.data.imgList.length == 0) {
        wx.showToast({
          title: '请添加图片',
          icon: 'none',
          duration: 2000 //持续的时间
        })
        return
      }
      communication.postGc(data.buffer, data.contentType).then((res) => {
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
  options: {
    addGlobalClass: true
  }
})
