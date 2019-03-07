// pages/trip/trip.js 行程
let lastS = 0
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: '',
    infolength: '',
    res: '',
    out: '',
    scrollTop: 0,
    ishid: true,
    isbot: false,
    scrollHeight: '',
    top: ''
  },

  backtop: function(e) {
    var curTime = e.timeStamp
    var lastTime = e.currentTarget.dataset.time // 通过e.currentTarget.dataset.time 访问到绑定到该组件的自定义数据
    console.log(lastTime)
    if (curTime - lastTime > 0) {
      if (curTime - lastTime < 300) {
        console.log("挺快的双击，用了：" + (curTime - lastTime))
        this.setData({
          top: 0
        })
      }
    }
    this.setData({
      lastTapTime: curTime
    })
  },
  lower(e) {
    console.log('到达')
    this.setData({
      ishid: false,
      isbot: true
      // scrollTop: e.detail.scrollTop
    })
  },
  scroll(e) {
    console.log(e)

    let newS = e.detail.scrollTop
    let SH = e.detail.scrollHeight
    let isbot = e.currentTarget.offsetTop


    //判断浏览器滚动条上下滚动   
    if (e.detail.scrollTop > 0 && e.detail.scrollTop > lastS) {
      console.log('向下滚动');
      lastS = newS
      if (this.data.isbot) {
        this.setData({
          ishid: false,
          // scrollTop: e.detail.scrollTop
        })
      } else {
        this.setData({
          ishid: true,
          // scrollTop: e.detail.scrollTop
        })
      }

    } else if (e.detail.scrollTop < SH && e.detail.scrollTop < lastS) {
      console.log('向上滚动');
      lastS = newS
      this.setData({
        ishid: false,
        // scrollTop: e.detail.scrollTop
      })
    }
  },

  //  用户点击右上角分享（index.js）
  onShareAppMessage: function() {
    return {
      title: this.data.res.title,
      path: `pages/trip/trip?id=${this.data.res.routeid}&out=1`,
      imageUrl: this.data.info[0].content
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;

    wx.getSystemInfo({
      success: function(res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });

    console.log(options)

    if (options.out == 1) {
      console.log('out')
      this.setData({
        out: 1
      })
    }


    wx.request({
      url: 'https://api.qyshang.com/route/getinfo', // 仅为示例，并非真实的接口地址
      method: 'GET',
      dataType: 'json',
      data: {
        routeid: options.id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(options.id)
        console.log(res.data.data)
        if (res.data.code == 200) {
          wx.setStorageSync('price', res.data.data.price)
          that.setData({
            res: res.data.data,
            info: res.data.data.list,
            infolength: res.data.data.list.length
          })
        }
      }
    })

  },
  // 返回
  bindBack: function() {
    if (this.data.out == 1) {
      console.log('abc')
      wx.redirectTo({
        url: '../launch/launch'
      })
    } else {
      wx.navigateBack({
        delta: 0
      })
    }

  },

  baomin: function(e) {
    let id = e.currentTarget.dataset.id
    let title = e.currentTarget.dataset.title
    console.log(e.currentTarget.dataset)
    if (this.data.out == 1) {
      wx.setStorageSync('out', id)
    } else {
      wx.setStorageSync('out', 0)
    }
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          console.log(1)
          //用户已经授权过
          wx.navigateTo({
            // url: '../island/island',
            url: '../message/mess?id=' + id + '&title=' + title,
          })

        } else {
          console.log(2)
          wx.navigateTo({
            url: '../authorize/authorize'
          })
        }
      }
    })


  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },


})