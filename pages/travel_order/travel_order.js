// pages/travel_order/travel_order.js
let touchDotX = 0; //X按下时坐标
let touchDotY = 0; //y按下时坐标
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: '',
    anyArrays: '',
    toView: 'demo1',
    scrollLeft: '',
    scrollWidth: '',
    s1: '',
    s2: '',
    s3: '',
    // scrollHeight: ''
  },
  scroll(e) {
    console.log(e)
    this.setData({
      scrollLeft: e.detail.scrollLeft,
      scrollWidth: e.detail.scrollWidth
    })
  },
  
  touchstart1: function(event) {
    touchDotX = event.touches[0].pageX; // 获取触摸时的原点
    touchDotY = event.touches[0].pageY;
    // console.log("起始点的坐标X:" + touchDotX);
    // console.log("起始点的坐标Y:" + touchDotY);
  },
  // 移动结束处理动画
  touchend1: function(event) {
    var that = this;
    this.setData({
      s1: that.data.scrollWidth / 548 * 173,
      s2: that.data.scrollWidth / 548 * 66,
      s3: that.data.scrollWidth / 548 * 106
    })

    // 手指离开屏幕时记录的坐标
    let touchMoveX = event.changedTouches[0].pageX;
    let touchMoveY = event.changedTouches[0].pageY;
    // 起始点的坐标(x0,y0)和手指离开时的坐标(x1,y1)之差
    let tmX = touchMoveX - touchDotX;
    let tmY = touchMoveY - touchDotY;
    // 两点横纵坐标差的绝对值
    let absX = Math.abs(tmX);
    let absY = Math.abs(tmY);
    //起始点的坐标(x0,y0)和手指离开时的坐标(x1,y1)之间的距离
    let delta = Math.sqrt(absX * absX + absY * absY);
    console.log('起始点和离开点距离:' + delta + 'px');
    // 如果delta超过60px（可以视情况自己微调）,判定为手势触发
    if (delta >= 0) {
      // 如果 |x0-x1|>|y0-y1|,即absX>abxY,判定为左右滑动
      if (absX > absY) {
        // 如更tmX<0，即(离开点的X)-(起始点X)小于0 ，判定为左滑
        if (tmX < 0) {
          console.log("左滑=====");
          // 执行左滑动画
          // that.data.scrollLeft < that.data.s1 && that.data.scrollLeft > that.data.s2
          if ( that.data.scrollLeft > 0) {
            that.setData({
              toView: 'demo2'
            })
          } 
          // else if (that.data.scrollLeft > 0 && that.data.scrollLeft < that.data.s2) {
          //   that.setData({
          //     toView: 'demo1'
          //   })
          // }
          // console.log(app.globalData.bgimg)
          // 如更tmX>0，即(离开点的X)-(起始点X)大于0 ，判定为右滑
        } else {
          console.log("右滑=====");
          // 执行右滑动画
          // that.data.scrollLeft < that.data.s1 && that.data.scrollLeft > that.data.s3
          if (that.data.scrollLeft < that.data.s1) {
            that.setData({
              toView: 'demo1'
            })
          }
          //  else if (that.data.scrollLeft > 0 && that.data.scrollLeft < that.data.s3) {
          //   that.setData({
          //     toView: 'demo1'
          //   })
          // }
        }
        // 如果 |x0-x1|<|y0-y1|,即absX<abxY,判定为上下滑动
      }
    } else {
      console.log("手势未触发=====");
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    
    // wx.getSystemInfo({
    //   success: function (res) {
    //     console.info(res.windowHeight);
    //     that.setData({
    //       scrollHeight: res.windowHeight-130
    //     });
    //   }
    // });

    wx.request({
      url: 'https://api.qyshang.com/order/getlist', // 仅为示例，并非真实的接口地址
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        userid: wx.getStorageSync("userid")
      },
      success(res) {
        if (res.data.code == 200) {
          console.log(res.data.data)
          let arr = res.data.data
          let newarr = []
          arr.forEach((val, index) => {
            if (val.status === 1) {
              newarr.push({
                orderid: val.orderid,
                title: val.title,
                setouttime: val.setouttime.substring(0, 10),
                routeimg: val.routeimg
              })
            }
          })

          that.setData({
            order: newarr
          })
        }
      }
    })

    wx.request({
      url: 'https://api.qyshang.com/customize/getlist', // 仅为示例，并非真实的接口地址
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        userid: wx.getStorageSync("userid")
      },
      success(res) {
        console.log(res.data.data)
        // let arr = res.data.data
        // let newarr = []
        // arr.forEach((val, index) => {
        //   if (val.status === 1) {
        //     newarr.push({
        //       orderid: val.orderid,
        //       title: val.title,
        //       setouttime: val.setouttime.substring(0, 10),
        //       routeimg: val.routeimg
        //     })
        //   }
        // })
        if (res.data.code === 200) {
          that.setData({
            anyArrays: res.data.data
          })
        }

      }
    })

  },

  bindItemClick: function(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../travel_order_detail/travel_order_detail?id=' + id,
    })

  },

  bindItemClick1: function(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../order/order?id=' + id,
    })
  },

  bindBack: function() {
    wx.switchTab({
      url: '/pages/myself/myself'
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
  }
})