//app.js
App({
  onLaunch: function() {
    //隐藏系统tabbar
    wx.hideTabBar();
    //获取设备信息
    this.getSystemInfo();
    //登录
    this.wechatSq();

  },

  wechatSq: function() {
    let that =this
    let loginFlag = wx.getStorageSync('skey')
    if (loginFlag) {
      wx.checkSession({
        success: function(res) {
          // that.wxlog()
          console.log('成功')
        },
        fail: function(res) {
          console.log('失败')
          that.wxlog()
        },
      })
    } else {
      this.wxlog()
    }
  },
  wxlog: function() {
    wx.login({
      success: function (res) {
        console.log(res)
        let wxcode = res.code
        wx.getUserInfo({
          withCredentials: true,
          lang: '',
          success: function (res) {
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
                console.log('获取信息成功')
                if (res.data.code == 200) {
                wx.setStorageSync('skey', res.data.data.token)
                wx.setStorageSync('nickname', res.data.data.nickname)
                wx.setStorageSync('avatarurl', res.data.data.avatarurl)
                wx.setStorageSync('userid', res.data.data.userid)
                }
              }
            })
          },
          fail: function (res) {
            console.log('获取信息失败')
          },
        })
      },
      fail: function (res) { },
    })
  },
  getSystemInfo: function() {
    let t = this;
    wx.getSystemInfo({
      success: function(res) {
        t.globalData.systemInfo = res;
      }
    });
  },
  editTabbar: function() {
    let tabbar = this.globalData.tabBar;
    let currentPages = getCurrentPages();
    let _this = currentPages[currentPages.length - 1];
    let pagePath = _this.route;

    (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);


    // if(pagePath.indexOf('/') != 0){
    //   pagePath = '/' + pagePath;
    // } 

    for (let i in tabbar.list) {
      tabbar.list[i].selected = false;
      (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
    }
    _this.setData({
      tabbar: tabbar
    });
  },
  globalData: {
    systemInfo: null, //客户端设备信息
    userInfo: null,
    bgimg: '',
    likeid: [],
    tabBar: {
      "backgroundColor": "#ffffff",
      "color": "#979795",
      "selectedColor": "#1c1c1b",
      "list": [{
          "pagePath": "/pages/index/index",
          "iconPath": "icon/home2.png",
          "selectedIconPath": "icon/home1.png",
          // "text": "首页"
        },
        {
          "pagePath": "/pages/island/island",
          "iconPath": "icon/icon_release.png",
          "isSpecial": true,
          // "text": "日志"
        },
        {
          "pagePath": "/pages/myself/myself",
          "iconPath": "icon/my2.png",
          "selectedIconPath": "icon/my1.png",
          // "text": "我的"
        }
      ]
    }
  },

})