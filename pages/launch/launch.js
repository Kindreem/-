// pages/launch/launch.js 启动页
//获取应用实例
const app = getApp()
Page({
  // 首页定时跳转
  onLoad: function () {
    var that = this;
    setTimeout(function () {
      
      // 查看是否授权
      wx.getSetting({
        success: function (res) {
          if (res.authSetting['scope.userInfo']) {
            console.log(1)
            //用户已经授权过
            wx.switchTab({
              url: '../index/index',
            });
            
          } else {
            console.log(2)
            wx.redirectTo({
              url: '../authorize/authorize'
            })
          }
        }
      })

      
    }, 2000) //延迟时间 这里是2秒
  }
})