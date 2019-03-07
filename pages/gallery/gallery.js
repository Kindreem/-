// pages/gallery/gallery.js 我的图库页面
Page({

  /**
   * 页面的初始数据
   */
  data: {
    grids: [],
    bgimg: "",
    photo: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that=this
    this.setData({
      bgimg: getApp().globalData.bgimg,
    })
    // console.log(getApp().globalData.bgimg)
    // console.log(options)
    wx.request({
      url: 'https://api.qyshang.com/route/getimglist', // 仅为示例，并非真实的接口地址
      method: 'POST',
      dataType: 'json',
      data: {
        routeid: options.id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
        console.log(res.data.data)
        let grids = []
        res.data.data.forEach((val)=>{
          grids.push(val.img)
        })
        that.setData({
          photo: res.data.data,
          grids: grids
        })
        }
      }
    })
  },

  bindClose: function() {
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
  onShareAppMessage: function() {
    return {
      path: "pages/launch/launch"
    }
  },

  //图片点击事件
  imgSee: function(event) {

    var src = event.currentTarget.dataset.src; //获取data-src

    var imgList = event.currentTarget.dataset.list; //获取data-list
    //图片预览
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: imgList // 需要预览的图片http链接列表
    })
  }
})