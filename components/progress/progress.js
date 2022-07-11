// components/progress/progress.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    ColorList: app.globalData.ColorList,
    color:'red',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad() {
      let that = this;
      setTimeout(function() {
        that.setData({
          loading: true
        })
      }, 500)
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
    SetColor(e) {
      this.setData({
        color: e.currentTarget.dataset.color,
        modalName: null
      })
    },
    SetActive(e) {
      this.setData({
        active: e.detail.value
      })
    }

  },
  options: { addGlobalClass: true }
})
