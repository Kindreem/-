// pages/like/like.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: ''
  },


  // 返回
  bindBack: function () {
    wx.navigateBack({
      delta: 0
    })
  },
  longTap: function(e) {
    let that = this
    let userid = e.currentTarget.dataset.uid
    let collectid = e.currentTarget.dataset.cid
  
    wx.showModal({
      title: '提示',
      content: '确认删除此收藏',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: 'https://api.qyshang.com/route/uncollect', // 仅为示例，并非真实的接口地址
            method: 'POST',
            dataType: 'json',
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data: {
              collectid: collectid,
              userid: userid
            },
            success(res) {
              if (res.data.code == 200) {
                console.log(res.data.data)
                that.onLoad()
                app.globalData.likeid.push(collectid)
                console.log(app.globalData.likeid)
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

    
  },
  bindroute: function(e) {
        //  console.log()
    let id = e.currentTarget.dataset.id

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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    app.globalData.likeid=[]
    wx.request({
      url: 'https://api.qyshang.com/route/usercollect', // 仅为示例，并非真实的接口地址
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        userid: wx.getStorageSync('userid')
      },
      success(res) {
        if (res.data.code == 200) {
        console.log(res)
        // console.log(wx.getStorageSync('userid'))
        that.setData({
          list: res.data.data,
        })
        }else {
          that.setData({
            list: '',
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