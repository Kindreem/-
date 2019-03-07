// pages/custom_destination/custom_destination.js 制定目的地
import WxValidate from '../../utils/WxValidate.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data1: "", //初始生日时间
    array: '',
    array1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    array2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
    index: 0,
    index1: 0,
    index2: 0,
    place: "",
    currentdate: '',
    touristspot: '',
    number: 1,
    traveldays: 1,
    riderCommentList: [],
    isa:true,
   
  },
  startA: function() {
     this.setData({
       isa: !this.data.isa
     })
  },
  
  // checkboxChange(e) {
  //   console.log('checkboxChange e:', e);
  //   let string = "riderCommentList[" + e.target.dataset.index + "].selected"
  //   this.setData({
  //     [string]: !this.data.riderCommentList[e.target.dataset.index].selected
  //   })
  //   let detailValue = this.data.riderCommentList.filter(it => it.selected).map(it => it.value).join(' ')
  //   this.setData({
  //     touristspot: detailValue
  //   })
  //   console.log('所有选中的值为：', detailValue)
  // },
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      data1: e.detail.value
    })
    console.log(this.data.data1)
  },
  // bindPickerChange(e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     index: e.detail.value,
  //     touristspot: this.data.array[e.detail.value].scenic
  //   })
  // },
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
      departure: {
        required: true
      },
    }
    const messages = {
      departure: {
        required: '请填写出发地'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  //调用验证函数
  formSubmit(e) {
    console.log(2)
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
    console.log(that.data.touristspot)
 
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
              destination: that.data.place,
              departure: e.detail.value.departure,
              number: that.data.number,
              traveldays: that.data.traveldays,
              departuretime: e.detail.value.departuretime,
              grouppermissions: e.detail.value.grouppermissions
            },
            success(res) {
              if (res.data.code == 200) {
                console.log(res.data.data)
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) { 
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
    var data1 = date.getFullYear() + seperator + month + seperator + (strDate)
    console.log(currentdate)
    console.log(data1)
    this.setData({
      data1: data1,
      currentdate: currentdate
    })

    wx.request({
      url: 'https://api.qyshang.com/customize/getscenic', // 仅为示例，并非真实的接口地址
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        placeid: options.id
      },
      success(res) {
        if (res.data.code == 200) {
          console.log(res.data.data)
          // let riderCommentList = []
          //   res.data.data.forEach((val)=>{
          //     riderCommentList.push({value: val.scenic, selected: false})
          //   })
          
          that.setData({
            riderCommentList: res.data.data,
            touristspot: res.data.data[0].scenic,
            place: options.place
          })
        }
      }
    })

    this.initValidate() //验证规则函数
  },

  bindBack: function() {
    wx.navigateBack({
      delta: 0
    })
  },

  bindIsLand: function() {
    wx.navigateTo({
      url: '../travel_order_detail/travel_order_detail',
    })
  }
})