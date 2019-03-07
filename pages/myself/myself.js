// pages/main/home.js 个人中心
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: {},
    avatarurl: '',
    nickname: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //隐藏系统tabbar
    wx.hideTabBar();
    app.editTabbar();

    this.setData({
      avatarurl: wx.getStorageSync('avatarurl'),
      nickname: wx.getStorageSync('nickname')
    })
  },

  bindLike: function () {
    wx.navigateTo({
      url: '../like/like',
    })
  },
  bindTravelOrder: function () {
    wx.navigateTo({
      url: '../travel_order/travel_order',
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
  onShareAppMessage: function () {
    return {
      path: "pages/launch/launch"
    }
  }
})