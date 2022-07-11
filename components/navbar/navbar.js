// components/avatar/avatar.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
      color: {
        type: 'String',
        value: '#fff'
      },
      bgColor: {
        type: 'String',
        value: ''
      },
      title: {
        type: 'String',
        value: '智慧社区'
      },
    },

    /**
     * 组件的初始数据
     */
    data: {
        
    // 状态栏高度
    statusBarHeight: wx.getStorageSync('statusBarHeight') + 'px',
    // 导航栏高度
    navigationBarHeight: wx.getStorageSync('navigationBarHeight') + 'px',
    // 胶囊按钮高度
    menuButtonHeight: wx.getStorageSync('menuButtonHeight') + 'px',
    // 导航栏和状态栏高度
    navigationBarAndStatusBarHeight:
      wx.getStorageSync('statusBarHeight') +
      wx.getStorageSync('navigationBarHeight') +
      'px'
    },

    /**
     * 组件的方法列表
     */
    methods: {

    },
    //引入全局样式
    options: { addGlobalClass: true }
})


