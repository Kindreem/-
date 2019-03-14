// pages/island/island.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    scrollHeight:""
  },

  bindRelease: function(e) {
    let id = e.currentTarget.dataset.id
    let place = e.currentTarget.dataset.place
    wx.navigateTo({
      url: '../custom_destination/custom_destination?id=' + id + '&place=' + place,
    })
  },

  bindRelease1: function (e) {
    wx.navigateTo({
      url: '../custom_destination1/custom_destination1'
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this

    wx.getSystemInfo({
      success: function (res) {
        console.info(res.windowHeight);
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
     
    wx.request({
      url: 'https://api.qyshang.com/customize/getall', // 仅为示例，并非真实的接口地址
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
        console.log(res.data.data)
        that.setData({
          list: res.data.data,
        })
        }
      }
    })
  },

  
  bindBack: function() {
    wx.navigateBack({
      delta: 0
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

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function() {
  //   return {
  //     path: "pages/launch/launch"
  //   }
  // }
})