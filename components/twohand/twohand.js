// components/twohand/twohand.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    card: {
      type: 'Object',
      value: {}
    },
    status:{
      type: Boolean,
      value: false
    }
  },
  lifetimes: {
    attached() {
      console.log(this.properties.card)
      this.setData( {
        status: !this.status
      })
    },

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
    _changestatus() {
      console.log(this.status)
      this.setData({
        status: !this.status
      })
    },
    onDetail() {
      wx.navigateTo({
        url: '/pages/communication/esdetail/esdetail?id='+ this.properties.card.id +'&type=2',
      })
    },
  },
  options: { addGlobalClass: true }
})
