const config = require('./config.js')
const app = getApp()
let position = wx.getStorageSync('latitude') + '|' + wx.getStorageSync('longitude')
let http = {
    post(path, params, contentType = 'form', otherUrl, ) {
        return new Promise((resolve, reject) => {
            var url = (otherUrl || config.baseUrl) + path
            wx.request({
                method: 'POST',
                url,
                header: {
                    "Content-Type": contentType === 'json' ? "application/json" : "application/x-www-form-urlencoded",
                    "token": wx.getStorageSync('token'),
                    "position": position
                },
                data: params,
                success: (res) => {
                    console.log('request:POST请求' + config.baseUrl + path + ' 成功', res.data)
                    if (res.data.code == 10004) {
                        wx.showModal({
                            title: '提示',
                            content: '您还未登录 要去登录吗',
                            success(res) {
                                if (res.confirm) {
                                    wx.navigateTo({
                                        url: '/pages/user/login/login',
                                    })
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                }
                            }
                        })

                    }
                    resolve(res.data)
                },
                fail: (err) => {
                    wx.hideLoading();
                    wx.showModal({
                        title: '提示',
                        content: '网络异常',
                        showCancel: false,
                        success: function (res) {}
                    })
                    console.error('request:请求' + config.baseUrl + path + ' 失败', err)
                    reject('请求失败')
                }
            })
        })
    },
    put(path, params, contentType = 'form', otherUrl, ) {
        return new Promise((resolve, reject) => {
            var url = (otherUrl || config.baseUrl) + path
            wx.request({
                method: 'PUT',
                url,
                header: {
                    "Content-Type": contentType === 'json' ? "application/json" : "application/x-www-form-urlencoded",
                    "token": wx.getStorageSync('token'),
                    "position": position
                },
                data: params,
                success: (res) => {
                    console.log('request:PUT请求' + config.baseUrl + path + ' 成功', res.data)
                    if (res.data.code == 10004) {
                        wx.showModal({
                            title: '提示',
                            content: '您还未登录 要去登录吗',
                            success(res) {
                                if (res.confirm) {
                                    wx.navigateTo({
                                        url: '/pages/user/login/login',
                                    })
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                }
                            }
                        })

                    }
                    resolve(res.data)
                },
                fail: (err) => {
                    wx.hideLoading();
                    wx.showModal({
                        title: '提示',
                        content: '网络异常',
                        showCancel: false,
                        success: function (res) {}
                    })
                    console.error('request:PUT请求' + config.baseUrl + path + ' 失败', err)
                    reject('请求失败')
                }
            })
        })
    },

    get(path, params, otherUrl) {
        return new Promise((resolve, reject) => {
            var url = (otherUrl || config.baseUrl) + path
            wx.request({
                url,
                data: params,
                header: {
                    "token": wx.getStorageSync('token'),
                    "position": position
                },
                success: (res) => {
                    console.log('request:GET请求' + config.baseUrl + path + ' 成功', res.data)
                    if (res.data.code == 10004) {
                        wx.showModal({
                            title: '提示',
                            content: '您还未登录 要去登录吗',
                            success(res) {
                                if (res.confirm) {
                                    wx.navigateTo({
                                        url: '/pages/user/login/login',
                                    })
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                }
                            }
                        })

                    }
                    resolve(res.data)
                },
                fail: (err) => {
                    wx.hideLoading();
                    wx.showModal({
                        title: '提示',
                        content: '网络异常',
                        showCancel: false,
                        success: function (res) {}
                    })
                    console.error('request:GET请求' + config.baseUrl + path + ' 失败', err)
                    reject(err)
                }
            })

        })
    },
    delete(path, params, otherUrl) {
        return new Promise((resolve, reject) => {
            var url = (otherUrl || config.baseUrl) + path
            wx.request({
                url,
                data: params,
                method: "DELETE",
                header: {
                    "token": wx.getStorageSync('token'),
                    "position": position
                },
                success: (res) => {
                    console.log('request:DELETE请求' + config.baseUrl + path + ' 成功', res.data)
                    resolve(res.data)
                },
                fail: (err) => {
                    wx.hideLoading();
                    wx.showModal({
                        title: '提示',
                        content: '网络异常',
                        showCancel: false,
                        success: function (res) {}
                    })
                    console.error('request:DELETE请求' + config.baseUrl + path + ' 失败', err)
                    reject(err)
                }
            })
        })
    },

    async upload(path, fileArray, otherUrl) {
        if (typeof fileArray !== 'object') {
            console.error('request:参数错误,请传入文件数组')
            return
        }
        var url = (otherUrl || config.baseUrl) + path
        var arr = []
        for (let i in fileArray) {
            const res = await wx.uploadFile({
                url: otherUrl || config.baseUrl + path,
                filePath: fileArray[i],
                name: 'file'
            })
            console.log(res)
            if (res[0]) {
                console.error('request:上传失败', res[0])
                return
            }
            arr.push(JSON.parse(res[1].data).data)
        }
        return arr
    },

    postForm(path, params, type) {
        return new Promise((resolve, reject) => {
            var url = config.baseUrl + path
            wx.request({
                method: 'POST',
                url,
                header: {
                    "Content-Type": type,
                    "token": wx.getStorageSync('token'),
                    "position": position
                },
                data: params,
                success: (res) => {
                    console.log('request:POST请求' + config.baseUrl + path + ' 成功', res.data)
                    if (res.data.code == 10004) {
                        wx.showModal({
                            title: '提示',
                            content: '您还未登录 要去登录吗',
                            success(res) {
                                if (res.confirm) {
                                    wx.navigateTo({
                                        url: '/pages/user/login/login',
                                    })
                                } else if (res.cancel) {
                                    console.log('用户点击取消')
                                }
                            }
                        })

                    }
                    resolve(res.data)
                },
                fail: (err) => {
                    wx.hideLoading();
                    wx.showModal({
                        title: '提示',
                        content: '网络异常',
                        showCancel: false,
                        success: function (res) {}
                    })
                    console.error('request:请求' + config.baseUrl + path + ' 失败', err)
                    reject('请求失败')
                }
            })
        })
    },

}

module.exports = http