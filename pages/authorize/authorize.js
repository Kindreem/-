const app = getApp();
Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function() {

  },
  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      wx.showLoading()
      //插入登录的用户的相关信息到数据库
      this.wechatSq()

    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击了“返回授权”')
          }
        }
      })
    }
  },
  wechatSq: function() {
    let that = this
    let loginFlag = wx.getStorageSync('skey')
    if (loginFlag) {
      wx.checkSession({
        success: function(res) {
          // that.wxlog()
          wx.switchTab({
            url: '/pages/index/index'
          })
          console.log(res)
        },
        fail: function(res) {
          that.wxlog()
        },
      })
    } else {
      this.wxlog()
    }
  },
  wxlog: function() {
    wx.login({
      success: function(res) {
        console.log(res)
        let wxcode = res.code
        wx.getUserInfo({
          withCredentials: true,
          lang: '',
          success: function(res) {
            console.log(res)
            let nickname = res.userInfo.nickName
            let avatarurl = res.userInfo.avatarUrl
            let gender = res.userInfo.gender
            let country = res.userInfo.country
            let province = res.userInfo.province
            let city = res.userInfo.city
            let language = res.userInfo.language
            console.log(wxcode)
            wx.request({
              url: 'https://api.qyshang.com/user/login', // 仅为示例，并非真实的接口地址
              method: 'POST',
              dataType: 'json',
              header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
              },
              data: {
                code: wxcode,
                nickname: nickname,
                avatarurl: avatarurl,
                gender: gender,
                country: country,
                province: province,
                city: city,
                language: language
              },
              success(res) {
                console.log(res)
                if (res.data.code == 200) {
                  wx.hideLoading()
                  console.log('获取信息成功')
                  wx.setStorageSync('userid', res.data.data.userid)
                  wx.setStorageSync('skey', res.data.data.token)
                  wx.setStorageSync('nickname', res.data.data.nickname)
                  wx.setStorageSync('avatarurl', res.data.data.avatarurl)
                  wx.setStorageSync('telnum', res.data.data.telnum)
                  // 跳转进入小程序首页
                  if (wx.getStorageSync('out') > 0) {
                    wx.navigateTo({
                      // url: '../island/island',
                      url: '../message/mess?id=' + wx.getStorageSync('out') + '&out=1',
                    })
                  } else {
                    wx.switchTab({
                      url: '/pages/index/index'
                    })
                  }
                }
              },
              fail: function (res) {
                console.log(res)
              }
            })
          },
          fail: function(res) {
            console.log('获取信息失败')
          },
        })
      },
      fail: function(res) {},
    })
  },
})