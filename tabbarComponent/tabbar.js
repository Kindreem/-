// tabBarComponent/tabBar.js
const app = getApp();
Component({
  
  //  组件的属性列表
   
  properties: {
    tabbar: {
      type: Object,
      // value: {
      //   "backgroundColor": "#ffffff",
      //   "color": "#979795",
      //   "selectedColor": "#1c1c1b",
      //   "list": [{
      //       "pagePath": "pages/index/index",
      //       "iconPath": "icon/icon_home.png",
      //       "selectedIconPath": "icon/icon_home_HL.png",
      //       // "text": "首页"
      //     },
      //     {
      //       "pagePath": "pages/island/island",
      //       "iconPath": "icon/icon_release.png",
      //       "isSpecial": true,
      //       // "text": "日志"
      //     },
      //     {
      //       "pagePath": "pages/myself/myself",
      //       "iconPath": "icon/icon_mine.png",
      //       "selectedIconPath": "icon/icon_mine_HL.png",
      //       // "text": "我的"
      //     }
      //   ]
      // }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // isIphoneX: app.globalData.systemInfo.model == "iPhone X" ? true : false,
    isshow: false
  },
  lifetimes: {
  attached: function() {
    
    if (wx.getStorageSync('telnum') == null || wx.getStorageSync('telnum')=='') {
      console.log(123)
      this.setData({
        isshow: true
      })
    }else {
      this.setData({
        isshow: false
      })
    }
  }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    getPhoneNumber: function(e) {
      let that =this
      if (e.detail.encryptedData) {
        //用户按了允许授权按钮
        console.log(1)
        console.log(e.detail.errMsg)
        console.log(e.detail.iv)
        console.log(e.detail.encryptedData)
        wx.request({
          url: 'https://api.qyshang.com/user/getphone', // 仅为示例，并非真实的接口地址
          method: 'POST',
          dataType: 'json',
          header: {
            'content-type': 'application/x-www-form-urlencoded' // 默认值
          },
          data: {
            userid: wx.getStorageSync('userid'),
            encryptedData: e.detail.encryptedData,
            iv: e.detail.iv
          },
          success(res) {
            console.log(res)
            if (res.data.code == 200) {
              wx.setStorageSync('telnum', res.data.data)
              that.setData({
                isshow: false
              })
              wx.navigateTo({
                // url: '../island/island',
                url: '../island/island',
              })
            }

          }
        })
       
      } else {
        //用户按了拒绝按钮

        wx.showModal({
          title: '警告',
          content: '您点击了拒绝授权，将无法生成订单，请授权之后再生成!!!',
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
  }
})