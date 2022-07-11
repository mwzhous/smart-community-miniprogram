Component({
  /**
   * 组件的属性列表
   */
  properties: {
    style: {
      type: String,
      value: ''
    },
    pageIndex: {
      type: Number,
      value: 0
    },
    pageSize: {
      type: Number,
      value: 10
    },
    list: {
      type: Array,
      value: [],
      observer(nval, oval) {
        // 最后一页数据未满，这里解释为没有更多数据
        this.setData({
          isNoMore: nval.length % this.data.pageSize != 0
        })
      }
    },
    botLineText: {
      type: String,
      value: '没有更多记录'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    scrollTop: 0,
    triggered: false, // 下拉刷新中
    isLoadMoreing: false, // 上拉加载中
    isNoMore: false, // 是否没有更多数据
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 滚动事件
    onScroll(e) {
      this.setData({
        scrollTop: e.detail.scrollTop
      })
    },

    // 下拉刷新
    onPullDown(e) {
      if (this._freshing || this._loadMoreing) return;
      // console.log("onPullDown", e);
      this._freshing = true
      this.setData({
        isNoMore: false,
        pageIndex: 0
      })

      this.triggerEvent('PullDown', {
        pageIndex: this.data.pageIndex,
        pageSize: this.data.pageSize,
        callback: (res = []) => { // 请传数组
          // console.log("onPullDown.callback", res);
          this.setData({
            triggered: false,
          })
          this._freshing = false
        }
      })

    },

    // 上拉加载
    onPullUp(e) {
      if (this._freshing || this._loadMoreing || this.data.isNoMore) return;
      // console.log("onPullUp", e);
      this._loadMoreing = true
      this.setData({
        isLoadMoreing: true,
        pageIndex: this.data.pageIndex + 1
      })
      this.triggerEvent('PullUp', {
        pageIndex: this.data.pageIndex,
        pageSize: this.data.pageSize,
        callback: (res = []) => { // 请传数组
          // console.log("onPullUp.callback", res);
          this.setData({
            isLoadMoreing: false,
          })
          this._loadMoreing = false
        }
      })
    },

  }
})