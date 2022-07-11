// components/shelves/shelves.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    goPush() {
      wx.navigateTo({
        url: '/pages/serve/fleaMarket/shelves/shelves',
      })
    }
  },
  //引入全局样式
  options: { addGlobalClass: true }
})
