// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: '',
    setouttime: '',
    anyArrays: [],
    size: '',
    showModal: false,
    options: ''
  },
  tel: function () {
    wx.makePhoneCall({
      phoneNumber: '13667298249',
    })
  },
  tel1: function () {
    wx.makePhoneCall({
      phoneNumber: '18202750830',
    })
  },
  tel2: function () {
    wx.makePhoneCall({
      phoneNumber: '18202750800',
    })
  },
  tel3: function () {
    wx.makePhoneCall({
      phoneNumber: '13407145500',
    })
  },
  preventTouchMove: function () {
    this.setData({
      showModal: false
    })
  },

  open_mask: function () {
    this.setData({
      showModal: true
    })
  },
  close_mask: function () {
    this.setData({
      showModal: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  // 下拉刷新
  onPullDownRefresh: function () {
    let that = this
    wx.request({
      url: 'https://api.qyshang.com/customize/getprocesslist', // 仅为示例，并非真实的接口地址
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        aoid: that.options.id
      },
      success(res) {
        if (res.data.code == 200) {
          console.log(res.data.data)
          wx.stopPullDownRefresh;
          that.setData({
            anyArrays: res.data.data,
            size: res.data.data.length
          })
        }else {
          wx.showToast({
            title: '刷新失败',
            icon: 'none',
            duration: 2000
          })
          wx.stopPullDownRefresh;
        }
      }
    })
    console.log('下拉')
    

  },
  onLoad: function (options) {
    let that = this
    this.setData({
      options: options
    })
    wx.request({
      url: 'https://api.qyshang.com/customize/getinfo', // 仅为示例，并非真实的接口地址
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        aoid: options.id
      },
      success(res) {
        if (res.data.code == 200) {
          console.log(res.data.data)
          let time = res.data.data.departuretime.split("-")
          console.log(time)
          let time1 = `${time[0]}年${time[1]}月${time[2]}日`

          that.setData({
            list: res.data.data,
            departuretime: time1
          })
        }
      }
    })

    wx.request({
      url: 'https://api.qyshang.com/customize/getprocesslist', // 仅为示例，并非真实的接口地址
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        aoid: options.id
      },
      success(res) {
        if (res.data.code == 200) {
          console.log(res.data.data)

          that.setData({
            anyArrays: res.data.data,
            size: res.data.data.length
          })
        }
      }
    })
  },

  bindBack: function () {
    wx.navigateBack({
      delta: 0
    })
  },
  ckan: function (e) {
    let id = e.currentTarget.dataset.id
    console.log(id)
    wx.request({
      url: 'https://api.qyshang.com/route/getinfo', // 仅为示例，并非真实的接口地址
      method: 'GET',
      dataType: 'json',
      data: {
        routeid: id
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        // console.log(options.id)
        console.log(res.data.data)
        if (res.data.code == 200) {
          if (res.data.data == 'fail') {
            wx.showToast({
              title: '线路已下架',
              icon: 'none',
              duration: 2000
            })
          } else {
            wx.navigateTo({
              // url: '../island/island',
              url: '../trip/trip?id=' + id,
            })
          }
        } else {
          wx.showToast({
            title: '线路已下架',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })

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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  //   return {
  //     path: "pages/launch/launch"
  //   }
  // }
})