//index.js 首页
//获取应用实例
var prex = 0;
const app = getApp()
let touchDotX = 0; //X按下时坐标
let touchDotY = 0; //y按下时坐标
let lastTime = 0;
let nowTime = new Date().getTime();
let wait = 600;

Page({
  data: {
    isshow: false, //是否显示提示
    showtext: '',
    //tabbar
    tabbar: {},
    title: '',
    img1: "",
    img2: "",
    img3: "",
    img4: '',
    count: '',
    hot1: '',
    hot2: '',
    hot3: '',
    like1: '',
    like2: '',
    like3: '',
    x: 48,
    y: 0,
    hiddenimg: true,
    animationData1: {},
    animationData2: {},
    animationData3: {},
    ballTop1: 0,
    ballTop2: 10,
    ballTop3: 20,
    ballWidth1: 640,
    ballWidth2: 600,
    ballWidth3: 565,
    index1: 3,
    index2: 2,
    index3: 1,
    statusBarHeight: getApp().globalData.statusBarHeight,
  },
  onLoad(options) {},
  /**
   *  卡片1手势
   */
  islike1: function() {
      let that = this
      console.log(1)
      wx.request({
        url: 'https://api.qyshang.com/route/collect', // 仅为示例，并非真实的接口地址
        method: 'POST',
        dataType: 'json',
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data: {
          routeid: that.data.img1.routeid,
          userid: wx.getStorageSync('userid')
        },
        success(res) {
          console.log(res)
          if (res.data.code == 200) {
            console.log(res.data.data)
            that.setData({
              like1: res.data.data,
            })
          } else if (res.data.code == 500) {
            wx.request({
              url: 'https://api.qyshang.com/route/uncollect', // 仅为示例，并非真实的接口地址
              method: 'POST',
              dataType: 'json',
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              data: {
                collectid: that.data.like1,
                userid: wx.getStorageSync('userid')
              },
              success(res) {
                console.log(res)
                if (res.data.code == 200) {
                  console.log(res.data.data)
                  that.setData({
                    like1: 0,
                  })
                } else if (res.data.code == 500) {
                  that.setData({
                    like1: 0,
                  })
                }
              }
            })
          }
        }
      })


    }

    ,


  islike2: function() {
    console.log(2)
    let that = this

    wx.request({
      url: 'https://api.qyshang.com/route/collect', // 仅为示例，并非真实的接口地址
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        routeid: that.data.img2.routeid,
        userid: wx.getStorageSync('userid')
      },
      success(res) {
        console.log(res)
        if (res.data.code == 200) {
          console.log(res.data.data)
          that.setData({
            like2: res.data.data,
          })
        } else if (res.data.code == 500) {
          wx.request({
            url: 'https://api.qyshang.com/route/uncollect', // 仅为示例，并非真实的接口地址
            method: 'POST',
            dataType: 'json',
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data: {
              collectid: that.data.like2,
              userid: wx.getStorageSync('userid')
            },
            success(res) {
              console.log(res)
              if (res.data.code == 200) {
                console.log(res.data.data)
                that.setData({
                  like2: 0,
                })
              } else if (res.data.code == 500) {
                that.setData({
                  like2: 0,
                })
              }
            }
          })
        }
      }
    })


  },


  islike3: function() {
    let that = this
    console.log(3)

    wx.request({
      url: 'https://api.qyshang.com/route/collect', // 仅为示例，并非真实的接口地址
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        routeid: that.data.img3.routeid,
        userid: wx.getStorageSync('userid')
      },
      success(res) {
        console.log(res)
        if (res.data.code == 200) {
          console.log(res.data.data)
          that.setData({
            like3: res.data.data,
          })
        } else if (res.data.code == 500) {
          wx.request({
            url: 'https://api.qyshang.com/route/uncollect', // 仅为示例，并非真实的接口地址
            method: 'POST',
            dataType: 'json',
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data: {
              collectid: that.data.like3,
              userid: wx.getStorageSync('userid')
            },
            success(res) {
              console.log(res)
              if (res.data.code == 200) {
                console.log(res.data.data)
                that.setData({
                  like3: 0,
                })
              } else if (res.data.code == 500) {
                that.setData({
                  like3: 0,
                })
              }
            }
          })
        }
      }
    })


  },

  touchstart1: function(event) {

    touchDotX = event.touches[0].pageX; // 获取触摸时的原点
    touchDotY = event.touches[0].pageY;
    console.log("起始点的坐标X:" + touchDotX);
    console.log("起始点的坐标Y:" + touchDotY);
  },
  // 移动结束处理动画
  touchend1: function(event) {
    let that = this
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

    console.log(nowTime - lastTime)
    if (nowTime - lastTime > wait) {
      console.log(123)
      // 如果delta超过60px（可以视情况自己微调）,判定为手势触发
      if (delta >= 60) {
        // 如果 |x0-x1|>|y0-y1|,即absX>abxY,判定为左右滑动
        if (absX > absY) {
          // 如更tmX<0，即(离开点的X)-(起始点X)小于0 ，判定为左滑
          if (tmX < 0) {
            console.log("左滑=====");
            // 执行左滑动画
            // if (wx.getStorageSync('shu1') > 1) {
            this.Animation12(-500);
            // } else {
            //   console.log('没有上一页')
            //   this.setData({
            //     isshow: true,
            //     showtext: '已经是第一页了'
            //   })
            //   // console.log(this.data.isshow)
            //   setTimeout(() => {
            //     that.setData({
            //       isshow: false,
            //     })
            //     console.log(that.data.isshow)
            //   }, 500);
            // }

            console.log(app.globalData.bgimg)
            // 如更tmX>0，即(离开点的X)-(起始点X)大于0 ，判定为右滑
          } else {
            console.log("右滑=====");
            // 执行右滑动画
            // if (wx.getStorageSync('shu1') < this.data.count) {
            this.Animation1(500);
            // } else {
            //   console.log('没有下一页')
            //   this.setData({
            //     isshow: true,
            //     showtext: '已经是最后一页了'
            //   })
            //   setTimeout(() => {
            //     this.setData({
            //       isshow: false,
            //     })
            //   }, 500);
            // }
          }
          // 如果 |x0-x1|<|y0-y1|,即absX<abxY,判定为上下滑动
        }
      } else {
        console.log("手势未触发=====");
      }
      lastTime = nowTime;
      nowTime = new Date().getTime()
    } else {
      nowTime = new Date().getTime()
    }



  },

  /**
   *  卡片2手势
   */
  touchstart2: function(event) {
    touchDotX = event.touches[0].pageX; // 获取触摸时的原点
    touchDotY = event.touches[0].pageY;

    console.log("起始点的坐标X:" + touchDotX);
    console.log("起始点的坐标Y:" + touchDotY);

  },
  // 移动结束处理动画
  touchend2: function(event) {
    let touchMoveX = event.changedTouches[0].pageX;
    let touchMoveY = event.changedTouches[0].pageY;
    let tmX = touchMoveX - touchDotX;
    let tmY = touchMoveY - touchDotY;
    let absX = Math.abs(tmX);
    let absY = Math.abs(tmY);
    let delta = Math.sqrt(absX * absX + absY * absY);
    // console.log('起始点和离开点距离:' + delta + 'px');
    console.log(nowTime - lastTime)
    if (nowTime - lastTime > wait) {

      if (delta >= 60) {
        if (absX > absY) {
          if (tmX < 0) {
            console.log("左滑=====");
            console.log(app.globalData.bgimg)
            this.Animation22(-500);
          } else {
            console.log("右滑=====");
            // if (wx.getStorageSync('shu1') < this.data.count) {
            this.Animation2(500);
            // } else {
            //   console.log('没有下一页')
            //   this.setData({
            //     isshow: true,
            //     showtext: '已经是最后一页了'
            //   })
            //   setTimeout(() => {
            //     this.setData({
            //       isshow: false,
            //     })
            //   }, 500);
            // }
          }
        }
      } else {
        console.log("手势未触发=====");
      }

      lastTime = nowTime;
      nowTime = new Date().getTime()
    } else {
      nowTime = new Date().getTime()
    }

  },

  /**
   *  卡片3手势
   */
  touchstart3: function(event) {
    touchDotX = event.touches[0].pageX; // 获取触摸时的原点
    touchDotY = event.touches[0].pageY;
    console.log("起始点的坐标X:" + touchDotX);
    console.log("起始点的坐标Y:" + touchDotY);
  },
  // 移动结束处理动画
  touchend3: function(event) {
    let touchMoveX = event.changedTouches[0].pageX;
    let touchMoveY = event.changedTouches[0].pageY;
    let tmX = touchMoveX - touchDotX;
    let tmY = touchMoveY - touchDotY;
    let absX = Math.abs(tmX);
    let absY = Math.abs(tmY);
    let delta = Math.sqrt(absX * absX + absY * absY);
    // console.log('起始点和离开点距离:' + delta + 'px');
    console.log(nowTime - lastTime)
    if (nowTime - lastTime > wait) {

      if (delta >= 60) {
        if (absX > absY) {
          if (tmX < 0) {
            console.log("左滑=====");
            // console.log(app.globalData.bgimg)

            // if (wx.getStorageSync('shu1') > 1) {
            this.Animation32(-500);
            // } else {
            //   console.log('没有上一页')
            //   this.setData({
            //     isshow: true,
            //     showtext: '已经是第一页了'
            //   })
            //   // console.log(this.data.isshow)
            //   setTimeout(() => {
            //     that.setData({
            //       isshow: false,
            //     })
            //     console.log(that.data.isshow)
            //   }, 500);
            // }
          } else {
            console.log("右滑=====");
            // if (wx.getStorageSync('shu1') < this.data.count) {
            this.Animation3(500);
            // } 
            // else {
            //   console.log('没有下一页')
            //   this.setData({
            //     isshow: true,
            //     showtext: '已经是最后一页了'
            //   })
            //   setTimeout(() => {
            //     this.setData({
            //       isshow: false,
            //     })
            //   }, 500);
            // }
          }
        }
      } else {
        console.log("手势未触发=====");
      }

      lastTime = nowTime;
      nowTime = new Date().getTime()
    } else {
      nowTime = new Date().getTime()
    }

  },

  /**
   * 卡片1:
   * 左滑动右滑动动画
   */
  Animation1: function(translateXX) {
    var that = this;
    if (wx.getStorageSync('shu1') == this.data.count - 1) {
      var imgIndex1 = parseInt(wx.getStorageSync('shu1')) + 1
      wx.setStorageSync('shu1', imgIndex1)
      var imgIndex = 1
    } else if (wx.getStorageSync('shu1') == this.data.count) {
      wx.setStorageSync('shu1', 1)
      var imgIndex = 2
    } else {
      var imgIndex1 = parseInt(wx.getStorageSync('shu1')) + 1
      var imgIndex = parseInt(wx.getStorageSync('shu1')) + 2
      wx.setStorageSync('shu1', imgIndex1)
      // console.log(imgIndex)
    }
    console.log(imgIndex)
    // if (imgIndex1 != 2 && imgIndex1 <= that.data.count - 1) {
    // var imgIndex2 = parseInt(wx.getStorageSync('shu2')) + 1
    // wx.setStorageSync('shu2', imgIndex2)
    wx.request({
      url: 'https://api.qyshang.com/route/getlist', // 仅为示例，并非真实的接口地址
      method: 'POST',
      dataType: 'json',
      data: {
        pagenum: imgIndex,
        pagesize: 1,
        userid: wx.getStorageSync('userid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
          console.log(res.data.data)
          that.setData({
            img3: res.data.data[0],
            like3: res.data.data[0].collectid
            // img2: res.data.data[1],
            // img3: res.data.data[0],
            // img4: res.data.data[2].positionimg,
            // title: res.data.data[2].title
          })
        }
      }
    })
    // }

    this.setData({
      ballTop1: 0,
      ballLeft1: -320,
      ballWidth1: 640,
      index1: 3,
      hot1: that.trans(that.data.img1.hots),

      ballTop2: 10,
      ballLeft2: -300,
      ballWidth2: 600,
      index2: 2,
      hot2: that.trans(that.data.img2.hots),

      ballTop3: 20,
      ballLeft3: -282.5,
      ballWidth3: 565,
      index3: 1,
      hot3: that.trans(that.data.img3.hots),
    })
    app.globalData.bgimg = that.data.img2.positionimg
    let animation = wx.createAnimation({
      duration: 680,
      timingFunction: "linear",
    });
    this.animation = animation;

    if (translateXX > 0) {
      this.animation.translateY(0).rotate(8).translateX(translateXX).opacity(0).step();
    } else {
      this.animation.translateY(0).rotate(-8).translateX(translateXX).opacity(0).step();
    }

    this.animation.translateY(0).translateX(0).opacity(1).rotate(0).step({
      duration: 10
    });

    this.setData({
      animationData1: this.animation.export(),
    });

    setTimeout(() => {
      this.setData({
        ballTop1: 20,
        ballLeft1: -282.5,
        ballWidth1: 565,
        index1: 1,
        hot1: that.trans(that.data.img1.hots),


        ballTop2: 0,
        ballLeft2: -320,
        ballWidth2: 640,
        index2: 3,
        hot2: that.trans(that.data.img2.hots),


        ballTop3: 10,
        ballLeft3: -300,
        ballWidth3: 600,
        index3: 2,
        hot3: that.trans(that.data.img3.hots),


        img4: that.data.img2.positionimg,
        title: that.data.img2.title,
        // hot: that.trans(that.data.img2.hots)
      })
      console.log(app.globalData.bgimg)
    }, 350);
  },
  Animation12: function(translateXX) {
    var that = this;
    if (wx.getStorageSync('shu1') == 1) {
      // var imgIndex1 = parseInt(wx.getStorageSync('shu1')) + 1
      wx.setStorageSync('shu1', this.data.count)
      var imgIndex = this.data.count - 1
    } else if (wx.getStorageSync('shu1') == 2) {
      var imgIndex1 = parseInt(wx.getStorageSync('shu1')) - 1
      wx.setStorageSync('shu1', imgIndex1)
      var imgIndex = this.data.count
    } else {
      var imgIndex1 = parseInt(wx.getStorageSync('shu1')) - 1
      var imgIndex = parseInt(wx.getStorageSync('shu1')) - 2
      wx.setStorageSync('shu1', imgIndex1)
      // console.log(imgIndex)
    }
    console.log(imgIndex)

    // var imgIndex2 = parseInt(wx.getStorageSync('shu2')) + 1
    // wx.setStorageSync('shu2', imgIndex2)
    wx.request({
      url: 'https://api.qyshang.com/route/getlist', // 仅为示例，并非真实的接口地址
      method: 'POST',
      dataType: 'json',
      data: {
        pagenum: imgIndex,
        pagesize: 1,
        userid: wx.getStorageSync('userid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
          console.log(res.data.data)
          that.setData({
            img2: res.data.data[0],
            like2: res.data.data[0].collectid
            // img2: res.data.data[1],
            // img3: res.data.data[0],
            // img4: res.data.data[2].positionimg,
            // title: res.data.data[2].title
          })
        }
      }
    })



    this.setData({
      ballTop1: 0,
      ballLeft1: -320,
      ballWidth1: 640,
      index1: 3,
      hot1: that.trans(that.data.img1.hots),

      ballTop2: 20,
      ballLeft2: -282.5,
      ballWidth2: 565,
      index2: 1,
      hot2: that.trans(that.data.img2.hots),

      ballTop3: 10,
      ballLeft3: -300,
      ballWidth3: 600,
      index3: 2,
      hot3: that.trans(that.data.img3.hots),
    })
    app.globalData.bgimg = that.data.img3.positionimg
    let animation = wx.createAnimation({
      duration: 680,
      timingFunction: "linear",
    });
    this.animation = animation;

    if (translateXX > 0) {
      this.animation.translateY(0).rotate(8).translateX(translateXX).opacity(0).step();
    } else {
      this.animation.translateY(0).rotate(-8).translateX(translateXX).opacity(0).step();
    }

    this.animation.translateY(0).translateX(0).opacity(1).rotate(0).step({
      duration: 10
    });

    this.setData({
      animationData1: this.animation.export(),
    });

    setTimeout(() => {
      this.setData({
        ballTop3: 0,
        ballLeft3: -320,
        ballWidth3: 640,
        index3: 3,
        hot3: that.trans(that.data.img3.hots),


        ballTop1: 20,
        ballLeft1: -282.5,
        ballWidth1: 565,
        index1: 1,
        hot1: that.trans(that.data.img1.hots),


        ballTop2: 10,
        ballLeft2: -300,
        ballWidth2: 600,
        index2: 2,
        hot2: that.trans(that.data.img2.hots),


        img4: that.data.img3.positionimg,
        title: that.data.img3.title,
        // hot: that.trans(that.data.img3.hots)
      })
    }, 350);
  },
  /**
   * 卡片2:
   * 左滑动右滑动动画
   */
  Animation2: function(translateXX) {
    var that = this;
    // console.log(wx.getStorageSync('shu'))
    if (wx.getStorageSync('shu1') == this.data.count - 1) {
      var imgIndex1 = parseInt(wx.getStorageSync('shu1')) + 1
      wx.setStorageSync('shu1', imgIndex1)
      var imgIndex = 1
    } else if (wx.getStorageSync('shu1') == this.data.count) {
      wx.setStorageSync('shu1', 1)
      var imgIndex = 2
    } else {
      var imgIndex1 = parseInt(wx.getStorageSync('shu1')) + 1
      var imgIndex = parseInt(wx.getStorageSync('shu1')) + 2
      wx.setStorageSync('shu1', imgIndex1)
      // console.log(imgIndex)
    }
    console.log(imgIndex)
    // if (imgIndex1 <= that.data.count - 1) {
    wx.request({
      url: 'https://api.qyshang.com/route/getlist', // 仅为示例，并非真实的接口地址
      method: 'POST',
      dataType: 'json',
      data: {
        pagenum: imgIndex,
        pagesize: 1,
        userid: wx.getStorageSync('userid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
          console.log(res.data.data)
          that.setData({
            img1: res.data.data[0],
            like1: res.data.data[0].collectid
            // img2: res.data.data[1],
            // img3: res.data.data[0],
            // img4: res.data.data[2].positionimg,
            // title: res.data.data[2].title
          })
        }
      }
    })
    // }

    this.setData({
      ballTop1: 20,
      ballLeft1: -282.5,
      ballWidth1: 565,
      index1: 1,
      hot1: that.trans(that.data.img1.hots),

      ballTop2: 0,
      ballLeft2: -320,
      ballWidth2: 640,
      index2: 3,
      hot2: that.trans(that.data.img2.hots),

      ballTop3: 10,
      ballLeft3: -300,
      ballWidth3: 600,
      index3: 2,
      hot3: that.trans(that.data.img3.hots),
    })
    app.globalData.bgimg = that.data.img3.positionimg
    let animation = wx.createAnimation({
      duration: 680,
      timingFunction: "linear",
    });

    this.animation = animation;

    if (translateXX > 0) {
      this.animation.translateY(0).rotate(8).translateX(translateXX).opacity(0).step();
    } else {
      this.animation.translateY(0).rotate(-8).translateX(translateXX).opacity(0).step();
    }

    this.animation.translateY(0).translateX(0).opacity(1).rotate(0).step({
      duration: 10
    });

    this.setData({
      animationData2: this.animation.export(),
    });

    setTimeout(() => {
      this.setData({
        ballTop1: 10,
        ballLeft1: -300,
        ballWidth1: 600,
        index1: 2,
        hot1: that.trans(that.data.img1.hots),


        ballTop2: 20,
        ballLeft2: -282.5,
        ballWidth2: 565,
        index2: 1,
        hot2: that.trans(that.data.img2.hots),


        ballTop3: 0,
        ballLeft3: -320,
        ballWidth3: 640,
        index3: 3,
        hot3: that.trans(that.data.img3.hots),

        img4: that.data.img3.positionimg,
        title: that.data.img3.title,
        // hot: that.trans(that.data.img3.hots)
      })
      console.log(app.globalData.bgimg)
    }, 350)
  },
  Animation22: function(translateXX) {
    var that = this;

    if (wx.getStorageSync('shu1') == 1) {
      // var imgIndex1 = parseInt(wx.getStorageSync('shu1')) + 1
      wx.setStorageSync('shu1', this.data.count)
      var imgIndex = this.data.count - 1
    } else if (wx.getStorageSync('shu1') == 2) {
      var imgIndex1 = parseInt(wx.getStorageSync('shu1')) - 1
      wx.setStorageSync('shu1', imgIndex1)
      var imgIndex = this.data.count
    } else {
      var imgIndex1 = parseInt(wx.getStorageSync('shu1')) - 1
      var imgIndex = parseInt(wx.getStorageSync('shu1')) - 2
      wx.setStorageSync('shu1', imgIndex1)
      // console.log(imgIndex)
    }
    console.log(imgIndex)
    // if (imgIndex1 != 1) {
    wx.request({
      url: 'https://api.qyshang.com/route/getlist', // 仅为示例，并非真实的接口地址
      method: 'POST',
      dataType: 'json',
      data: {
        pagenum: imgIndex,
        pagesize: 1,
        userid: wx.getStorageSync('userid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
          console.log(res.data.data)
          that.setData({
            img3: res.data.data[0],
            like3: res.data.data[0].collectid
            // img2: res.data.data[1],
            // img3: res.data.data[0],
            // img4: res.data.data[2].positionimg,
            // title: res.data.data[2].title
          })
        }
      }
    })
    // }

    this.setData({
      ballTop2: 0,
      ballLeft2: -320,
      ballWidth2: 640,
      index2: 3,
      hot2: that.trans(that.data.img2.hots),

      ballTop3: 20,
      ballLeft3: -282.5,
      ballWidth3: 565,
      index3: 1,
      hot3: that.trans(that.data.img3.hots),

      ballTop1: 10,
      ballLeft1: -300,
      ballWidth1: 600,
      index1: 2,
      hot1: that.trans(that.data.img1.hots),
    })
    app.globalData.bgimg = that.data.img1.positionimg
    let animation = wx.createAnimation({
      duration: 680,
      timingFunction: "linear",
    });
    this.animation = animation;

    if (translateXX > 0) {
      this.animation.translateY(0).rotate(8).translateX(translateXX).opacity(0).step();
    } else {
      this.animation.translateY(0).rotate(-8).translateX(translateXX).opacity(0).step();
    }

    this.animation.translateY(0).translateX(0).opacity(1).rotate(0).step({
      duration: 10
    });

    this.setData({
      animationData2: this.animation.export(),
    });

    setTimeout(() => {
      this.setData({
        ballTop1: 0,
        ballLeft1: -320,
        ballWidth1: 640,
        index1: 3,
        hot1: that.trans(that.data.img1.hots),


        ballTop2: 20,
        ballLeft2: -282.5,
        ballWidth2: 565,
        index2: 1,
        hot2: that.trans(that.data.img2.hots),


        ballTop3: 10,
        ballLeft3: -300,
        ballWidth3: 600,
        index3: 2,
        hot3: that.trans(that.data.img3.hots),


        img4: that.data.img1.positionimg,
        title: that.data.img1.title,
        // hot: that.trans(that.data.img1.hots)
      })

    }, 350);
  },
  /**
   * 卡片3:
   * 左滑动右滑动动画
   */
  Animation3: function(translateXX) {
    var that = this;

    if (wx.getStorageSync('shu1') == this.data.count - 1) {
      var imgIndex1 = parseInt(wx.getStorageSync('shu1')) + 1
      wx.setStorageSync('shu1', imgIndex1)
      var imgIndex = 1
    } else if (wx.getStorageSync('shu1') == this.data.count) {
      wx.setStorageSync('shu1', 1)
      var imgIndex = 2
    } else {
      var imgIndex1 = parseInt(wx.getStorageSync('shu1')) + 1
      var imgIndex = parseInt(wx.getStorageSync('shu1')) + 2
      wx.setStorageSync('shu1', imgIndex1)
      // console.log(imgIndex)
    }
    console.log(imgIndex)
    // if (imgIndex1 <= that.data.count - 1) {
    wx.request({
      url: 'https://api.qyshang.com/route/getlist', // 仅为示例，并非真实的接口地址
      method: 'POST',
      dataType: 'json',
      data: {
        pagenum: imgIndex,
        pagesize: 1,
        userid: wx.getStorageSync('userid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
          console.log(res.data.data)
          that.setData({
            img2: res.data.data[0],
            like2: res.data.data[0].collectid
            // img2: res.data.data[1],
            // img3: res.data.data[0],
            // img4: res.data.data[2].positionimg,
            // title: res.data.data[2].title
          })
        }
      }
    })
    // }

    this.setData({
      ballTop1: 10,
      ballLeft1: -300,
      ballWidth1: 600,
      index1: 2,
      hot1: that.trans(that.data.img1.hots),

      ballTop2: 20,
      ballLeft2: -282.5,
      ballWidth2: 565,
      index2: 1,
      hot2: that.trans(that.data.img2.hots),

      ballTop3: 0,
      ballLeft3: -320,
      ballWidth3: 640,
      index3: 3,
      hot3: that.trans(that.data.img3.hots),
    })
    app.globalData.bgimg = that.data.img1.positionimg
    let animation = wx.createAnimation({
      duration: 680,
      timingFunction: "linear",
    });

    this.animation = animation;
    if (translateXX > 0) {
      this.animation.translateY(0).rotate(8).translateX(translateXX).opacity(0).step();
    } else {
      this.animation.translateY(0).rotate(-8).translateX(translateXX).opacity(0).step();
    }

    this.animation.translateY(0).translateX(0).opacity(1).rotate(0).step({
      duration: 10
    });

    this.setData({
      animationData3: this.animation.export(),
    });

    setTimeout(() => {
      this.setData({
        ballTop1: 0,
        ballLeft1: -320,
        ballWidth1: 640,
        index1: 3,
        hot1: that.trans(that.data.img1.hots),


        ballTop2: 10,
        ballLeft2: -300,
        ballWidth2: 600,
        index2: 2,
        hot2: that.trans(that.data.img2.hots),


        ballTop3: 20,
        ballLeft3: -282.5,
        ballWidth3: 565,
        index3: 1,
        hot3: that.trans(that.data.img3.hots),


        img4: that.data.img1.positionimg,
        title: that.data.img1.title,
        // hot: that.trans(that.data.img1.hots)
      })
      console.log(app.globalData.bgimg)
    }, 350);
  },
  Animation32: function(translateXX) {
    var that = this;

    if (wx.getStorageSync('shu1') == 1) {
      // var imgIndex1 = parseInt(wx.getStorageSync('shu1')) + 1
      wx.setStorageSync('shu1', this.data.count)
      var imgIndex = this.data.count - 1
    } else if (wx.getStorageSync('shu1') == 2) {
      var imgIndex1 = parseInt(wx.getStorageSync('shu1')) - 1
      wx.setStorageSync('shu1', imgIndex1)
      var imgIndex = this.data.count
    } else {
      var imgIndex1 = parseInt(wx.getStorageSync('shu1')) - 1
      var imgIndex = parseInt(wx.getStorageSync('shu1')) - 2
      wx.setStorageSync('shu1', imgIndex1)
      // console.log(imgIndex)
    }
    console.log(imgIndex)
    wx.request({
      url: 'https://api.qyshang.com/route/getlist', // 仅为示例，并非真实的接口地址
      method: 'POST',
      dataType: 'json',
      data: {
        pagenum: imgIndex,
        pagesize: 1,
        userid: wx.getStorageSync('userid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
          console.log(res.data.data)
          that.setData({
            img1: res.data.data[0],
            like1: res.data.data[0].collectid
            // img2: res.data.data[1],
            // img3: res.data.data[0],
            // img4: res.data.data[2].positionimg,
            // title: res.data.data[2].title
          })
        }
      }
    })

    this.setData({
      ballTop3: 0,
      ballLeft3: -320,
      ballWidth3: 640,
      index3: 3,
      hot3: that.trans(that.data.img3.hots),

      ballTop1: 20,
      ballLeft1: -282.5,
      ballWidth1: 565,
      index1: 1,
      hot1: that.trans(that.data.img1.hots),

      ballTop2: 10,
      ballLeft2: -300,
      ballWidth2: 600,
      index2: 2,
      hot2: that.trans(that.data.img2.hots),
    })
    app.globalData.bgimg = that.data.img2.positionimg
    let animation = wx.createAnimation({
      duration: 680,
      timingFunction: "linear",
    });
    this.animation = animation;

    if (translateXX > 0) {
      this.animation.translateY(0).rotate(8).translateX(translateXX).opacity(0).step();
    } else {
      this.animation.translateY(0).rotate(-8).translateX(translateXX).opacity(0).step();
    }

    this.animation.translateY(0).translateX(0).opacity(1).rotate(0).step({
      duration: 10
    });

    this.setData({
      animationData3: this.animation.export(),
    });

    setTimeout(() => {
      this.setData({
        ballTop2: 0,
        ballLeft2: -320,
        ballWidth2: 640,
        index2: 3,
        hot2: that.trans(that.data.img2.hots),


        ballTop3: 20,
        ballLeft3: -282.5,
        ballWidth3: 565,
        index3: 1,
        hot3: that.trans(that.data.img3.hots),


        ballTop1: 10,
        ballLeft1: -300,
        ballWidth1: 600,
        index1: 2,
        hot1: that.trans(that.data.img1.hots),


        img4: that.data.img2.positionimg,
        title: that.data.img2.title,
        // hot: that.trans(that.data.img2.hots)
      })

    }, 350);
  },



  bindGallery: function(e) {
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      // url: '../island/island',
      url: '../gallery/gallery?id=' + id
    })
  },

  bindTrip: function(e) {
    let id = e.currentTarget.dataset.id
    // let img = e.currentTarget.dataset.img
    console.log(id)
    wx.navigateTo({
      // url: '../island/island',
      url: '../trip/trip?id=' + id,
    })
  },

  // bindIsLand: function () {
  //   wx.navigateTo({
  //     // url: '../island/island',
  //     url: '../island/island',
  //   })
  // },


  // moveimg: function(e) {
  //   var that = this;
  //   prex = e.detail.x;
  // },

  // touchendimg: function(e) {
  //   console.log(e)
  //   console.log(prex)
  //   var that = this;
  //   if (prex < -150 || prex > 150) {

  //     that.setData({
  //       hiddenimg: false,
  //     }, () => {
  //       setTimeout(function() {
  //         that.setData({
  //           hiddenimg: true,
  //           img1: that.data.img2
  //         })
  //       }, 300)
  //     })
  //   } else {
  //     setTimeout(function() {
  //       that.setData({
  //         x: 48,
  //         y: 0
  //       })
  //     }, 300)
  //   }
  // },
  //万单位
  trans: ((x) => {
    var f_x = parseFloat(x / 10000);
    if (isNaN(f_x)) {
      // alert('function:changeTwoDecimal->parameter error');
      return false;
    }
    f_x = (Math.round(f_x * 100) / 100).toFixed(1);

    return f_x;
  }),

  onLoad: function() {
    //隐藏系统tabbar
    wx.hideTabBar();
    app.editTabbar();


    // 检测是否可以调用getUpdateManager检查更新
    if (!wx.canIUse("getUpdateManager")) return;

    let updateManager = wx.getUpdateManager();
    // 获取全局唯一的版本更新管理器，用于管理小程序更新
    updateManager.onCheckForUpdate(function(res) {
      // 监听向微信后台请求检查更新结果事件 
      console.log("是否有新版本：" + res.hasUpdate);
      if (res.hasUpdate) {
        //如果有新版本                
        // 小程序有新版本，会主动触发下载操作        
        updateManager.onUpdateReady(function() {
          //当新版本下载完成，会进行回调          
          wx.showModal({
            title: '更新提示',
            content: '新版本已经准备好，单击确定重启小程序',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启小程序               
                updateManager.applyUpdate();
              }
            }
          })
        })
        // 小程序有新版本，会主动触发下载操作（无需开发者触发）        
        updateManager.onUpdateFailed(function() {
          //当新版本下载失败，会进行回调          
          wx.showModal({
            title: '提示',
            content: '检查到有新版本，但下载失败，请稍后尝试',
            showCancel: false,
          })
        })
      }
    });

    var that = this
    console.log(wx.getStorageSync('userid'))

    // wx.setStorageSync('shu', '2')
    // wx.setStorageSync('fshu', '1')
    wx.setStorageSync('shu1', '1')
    wx.setStorageSync('shu2', '0')
    wx.request({
      url: 'https://api.qyshang.com/route/getmainlist', // 仅为示例，并非真实的接口地址
      method: 'POST',
      dataType: 'json',
      data: {
        userid: wx.getStorageSync('userid')
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log('首页成功')
        console.log(res.data.data)
        // console.log()
        // console.log(that.trans(120000))
        if (res.data.code == 200) {
          that.setData({
            img1: res.data.data[0],
            img2: res.data.data[1],
            img3: res.data.data[2],
            img4: res.data.data[0].positionimg,
            title: res.data.data[0].title,
            hot1: that.trans(res.data.data[0].hots),
            hot2: that.trans(res.data.data[1].hots),
            hot3: that.trans(res.data.data[2].hots),
            like1: res.data.data[0].collectid,
            like2: res.data.data[1].collectid,
            like3: res.data.data[2].collectid,
          })
          app.globalData.bgimg = res.data.data[0].positionimg
        }
      }
    })

    wx.request({
      url: 'https://api.qyshang.com/route/getcount', // 仅为示例，并非真实的接口地址
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {
        console.log(res.data.data)
        if (res.data.code == 200) {
          that.setData({
            count: res.data.data,
          })
        }

      }
    })

  },
  onShow: function() {
    let that = this
    app.globalData.likeid.forEach(val => {
      if (val == that.data.like1) {
        that.setData({
          like1: 0
        })
      } else if (val == that.data.like2) {
        that.setData({
          like2: 0
        })
      } else if (val == that.data.like3) {
        that.setData({
          like3: 0
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {
    return {
      path: "pages/launch/launch",
      imageUrl: "http://onjuly-1257989321.cos.ap-guangzhou.myqcloud.com/route/img/6773022b7305a4abdd7b4ad7de008bb81.png"
    }
  }
})