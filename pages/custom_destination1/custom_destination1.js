// pages/custom_destination/custom_destination.js 制定目的地
import WxValidate from '../../utils/WxValidate.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data1: "", //初始生日时间
    array1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    array2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    index1: 0,
    index2: 0,
    currentdate: '',
    number: 1,
    traveldays: 1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      data1: e.detail.value
    })
    console.log(this.data.data1)
  },
  bindPickerChange1(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value,
      number: this.data.array1[e.detail.value]
    })
  },
  bindPickerChange2(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index2: e.detail.value,
      traveldays: this.data.array2[e.detail.value]
    })
  },


  onLoad: function (options) {
    let that = this

    //获取时间
    var date = new Date();
    var seperator = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator + month + seperator + strDate
    var data1 = date.getFullYear() + seperator + month + seperator + (strDate + 1)
    console.log(currentdate)
    console.log(data1)
    this.setData({
      data1: data1,
      currentdate: currentdate
    })

    this.initValidate() //验证规则函数
  },

  //报错 
  showModal(error) {
    wx.showModal({
      content: error.msg,
      showCancel: false,
    })
  },
  //验证函数
  initValidate() {
    const rules = {
      destination: {
        required: true,
      },
      departure: {
        required: true
      },
    }
    const messages = {
      destination: {
        required: "请填写目的地",
      },
      departure: {
        required: '请填写出发地'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  //调用验证函数
  formSubmit(e) {
    let that = this
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    const params = e.detail.value

    console.log(params)

    // 传入表单数据，调用验证方法
    if (!this.WxValidate.checkForm(params)) {
      const error = this.WxValidate.errorList[0]
      this.showModal(error)
      return false
    }
    
    wx.showModal({
      title: '提示',
      content: '确认生成预订单',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: 'https://api.qyshang.com/customize/add', // 仅为示例，并非真实的接口地址
            method: 'POST',
            dataType: 'json',
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            data: {
              userid: wx.getStorageSync('userid'),
              destination: e.detail.value.destination,
              departure: e.detail.value.departure,
              number: that.data.number,
              traveldays: that.data.traveldays,
              departuretime: e.detail.value.departuretime,
              grouppermissions: e.detail.value.grouppermissions
            },
            success(res) {
              console.log(res)
              if (res.data.code == 200) {
                wx.navigateTo({
                  url: '../travel_order/travel_order',
                })
              }
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },

  bindBack:function(){
    wx.navigateBack({
      delta: 0
    })
  },


  bindIsLand:function(){
    wx.navigateTo({
      url: '../travel_order_detail/travel_order_detail',
    })
  }
})