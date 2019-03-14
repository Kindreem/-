// pages/travel_order_detail/travel_order_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: '',
    setouttime: '',
    showModal: false
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
  onLoad: function (options) {
    let that = this
    wx.request({
      url: 'https://api.qyshang.com/order/getinfo', // 仅为示例，并非真实的接口地址
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        orderid: options.id
      },
      success(res) {
        console.log(res.data.data)
        if (res.data.code == 200) {
        let time = res.data.data.setouttime.split(" ")
        console.log(time)
        let time1 = time[0].split("-")
        let time2 = `${time1[0]}年${time1[1]}月${time1[2]}日`
        let time3 = `${time2} ${time[1]}`

        that.setData({
          list: res.data.data,
          setouttime: time3
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
  // onShareAppMessage: function () {
  //   return {
  //     path: "pages/launch/launch"
  //   }
  // }
})