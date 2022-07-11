// pages/user/setting/setting.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        module: [
            {
                id: '1',
                title: '修改密码'
            }
        ],
        module1: [
            {
                id: '4',
                title: '分享'
            },
            {
                id: '5',
                title: '意见反馈'
            },
            {
                id: '6',
                title: '关于我们'
            }
        ]

    },
    goDetails: function (e) {
        var idx = e.currentTarget.dataset.moduleid;
        console.log(idx)
        if (idx === 0) {
            wx.navigateTo({
                url: '/pages/user/setting/changePassword/changePassword',
            })
        }
    },
    logout() {
        wx.removeStorageSync('token')
        wx.removeStorageSync('userInfo')
        app.globalData.userInfo = {}
        app.globalData.token = ''
        wx.navigateTo({
          url: '/pages/user/login/login',
        })
    },
    goDetails1: function (e) {
        var idx = e.currentTarget.dataset.moduleid;
        console.log(idx)
        if (idx === 0) {
            // wx.navigateTo({
            //     url: '/pages/user/myWallet/myWallet',
            // })
        } else if (idx === 1) {
            wx.navigateTo({
                url: '/pages/user/setting/feelback/feelback',
            })
        } else if (idx === 2) {
            wx.navigateTo({
                url: '/pages/user/setting/aboutUs/aboutUs',
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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