// components/cooperation/cooperation.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    card: {
      type: 'Object',
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  attached() {
    console.log(this.properties.card)
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onDetail() {
      wx.navigateTo({
        url: '/pages/communication/detail/detail?id='+ this.properties.card.id +'&type=1',
      })
    },
  },
  options: { addGlobalClass: true }
})
