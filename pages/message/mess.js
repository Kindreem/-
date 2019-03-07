// pages/message/mess.js
import WxValidate from '../../utils/WxValidate.js'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    list1: [],
    array: [],
    array1: [],
    index: '请选择',
    index1: '',
    ishid: true,
    price: 0,
    adultprice: '',
    childrenprice: '',
    ashu: 1,
    cshu: 0,
    routeid: '',
    userid: '',
    out: '',
    title: '',
    showModal: false,
    tihuoWay: '成人',
    select: false,
    mingxi: '',
    openpick: false,
  },

  bindBack: function() {
    if (this.data.out === 1) {
      wx.navigateBack({
        delta: 2
      })
    } else {
      wx.navigateBack({
        delta: 0
      })
    }
  },
  pickertap: function() {
    this.setData({
      openpick: true
    })
  },
  cancleCallBack: function() {
    this.setData({
      openpick: false
    })
  },
  bindPickerChange: function(e) {
    console.log(e.detail.choosedData[0])
    if (e.detail.choosedData[0].setouttime == '请选择') {
      this.setData({
        childrenprice: 0,
        adultprice: 0,
        openpick: false,
        index: e.detail.choosedData[0].setouttime
      })
    } else {
      if (e.detail.choosedData[0].isok == false) {
        this.setData({
          // childrenprice: '',
          // adultprice: '',
          openpick: false
          // index: e.detail.choosedData[0].setouttime
        })
        this.showModal({
          msg: '该批次已结束报名'
        })
        return false
      }
      console.log('picker发送选择改变，携带值为', e)
      this.setData({
        index1: e.detail.choosedData[0].routetimeid,
        index: e.detail.choosedData[0].index,
        adultprice: e.detail.choosedData[0].adultprice,
        childrenprice: e.detail.choosedData[0].childrenprice,
        price: e.detail.choosedData[0].adultprice * this.data.ashu + e.detail.choosedData[0].childrenprice * this.data.cshu,
        openpick: false
      })
      console.log(this.data.ashu)
    }

  },

  jia: function() {
    let that = this
    let arr = this.data.list1
    arr.push({
      name: '',
      phonenumber: '',
      idcard: '',
      pstatus: 1,
    })
    this.setData({
      list: arr,
      list1: arr,
      ashu: this.data.ashu + 1,
      price: [this.data.adultprice * (this.data.ashu + 1) * 1000 + this.data.childrenprice * this.data.cshu * 1000] / 1000
    })
    console.log(this.data.ashu)
  },

  jian: function(e) {
    let that = this
    let id = e.currentTarget.dataset.id
    let arr = this.data.list1
    console.log(id)
    if (id === 0 && this.data.list1.length < 2) {
      return false
    } else {

      if (arr[id].pstatus == 0) {
        this.setData({
          cshu: this.data.cshu - 1
        })
      } else if (arr[id].pstatus == 1) {
        this.setData({
          ashu: this.data.ashu - 1
        })
      }
      arr.splice(id, 1)
      this.setData({
        list: arr,
        list1: arr,
        price: (this.data.adultprice * this.data.ashu * 1000 + this.data.childrenprice * this.data.cshu * 1000) / 1000
      })
    }

  },
  preventTouchMove: function() {
    this.setData({
      showModal: false
    })
  },

  open_mask: function() {
    this.setData({
      showModal: !this.data.showModal
    })
  },



  // close_mask: function () {
  //   this.setData({
  //     showModal: false
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad(options) {
    let that = this
    console.log(options.title)
    this.setData({
      title: options.title
    })
    // this.getuser()

    if (options.out == 1) {
      console.log('out')
      this.setData({
        out: 1
      })
    }

    wx.request({
      url: 'https://api.qyshang.com/route/getexpensedetail', // 仅为示例，并非真实的接口地址
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        routeid: options.id
      },
      success(res) {
        console.log(res.data.data)
        if (res.data.code == 200) {
          that.setData({
            mingxi: res.data.data,
          })
        }

      }
    })

    wx.request({
      url: 'https://api.qyshang.com/route/gettime', // 仅为示例，并非真实的接口地址
      method: 'POST',
      dataType: 'json',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      data: {
        routeid: options.id
      },
      success(res) {
        if (res.data.code == 200) {
          console.log(res.data.data)
          let array = res.data.data


          // array.unshift({ setouttime: "请选择" })
          let newarr = []
          array.forEach((val) => {

            var timestamp1 = new Date(val.enrollendtime.replace(/-/g, '/'))
            var timestamp2 = new Date()
            console.log(timestamp1)
            console.log(timestamp2)
            var d = timestamp1.getTime() - timestamp2.getTime();
            console.log(d)
            if (d > 0) {
              newarr.push({
                routetimeid: val.routetimeid,
                setouttime: `${val.setouttime.substring(0, 10)}(${val.explain} 成人：${val.adultprice}/人 儿童：${val.childrenprice})/人`,
                index: `${val.setouttime.substring(0, 10)}(${val.explain})`,
                isok: true,
                adultprice: val.adultprice,
                childrenprice: val.childrenprice,
                explain: val.explain
              })
            } else {
              newarr.push({
                routetimeid: val.routetimeid,
                setouttime: `${val.setouttime.substring(0, 10)} (已截止)`,
                isok: false,
                adultprice: val.adultprice,
                childrenprice: val.childrenprice,
                explain: val.explain
              })
            }
          })

          newarr.unshift({
            childrenprice: 0,
            adultprice: 0,
            setouttime: "请选择"
          })
          console.log(newarr)
          that.setData({
            // array1: [newarr],
            array: [newarr]
          })
        }
      }
    })

    this.setData({
      routeid: options.id,
      userid: wx.getStorageSync('userid'),
      list: [{
        name: '',
        phonenumber: '',
        idcard: '',
        pstatus: 1
      }],
      list1: [{
        name: '',
        phonenumber: '',
        idcard: '',
        pstatus: 1
      }]
    })
    this.initValidate() //验证规则函数
    console.log(this.data.list)
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
      name: {
        required: true,
        minlength: 2
      },
      phonenumber: {
        required: true,
        tel: true
      },
      idcard: {
        required: true,
        idcard: true
      },
    }
    const messages = {
      name: {
        required: '请填写姓名',
        minlength: '请输入正确的名称'
      },
      phonenumber: {
        required: '请填写手机号',
        tel: '请填写正确的手机号'
      },
      idcard: {
        required: '请填写身份证号',
        tel: '请填写正确的身份证号'
      }
    }
    this.WxValidate = new WxValidate(rules, messages)
  },
  //调用验证函数
  formSubmit: function(e) {
    let that = this
    let can = 3
    console.log(this.data.list1)
    console.log(this.data.price)
    this.setData({
      list: that.data.list1
    })
    if (this.data.index == '请选择') {
      this.showModal({
        msg: '请选择出发日期'
      })
      return false
    }

    const params = this.data.list
    params.forEach((val, index) => {
      //校验表单
      if (!this.WxValidate.checkForm(val)) {
        const error = this.WxValidate.errorList[0]
        this.showModal(error)
        can = false
        return false
      }
    })
    console.log(can)
    if (can === false) {
      return false
    }
    let data = {
      "list": that.data.list1,
      "routeid": that.data.routeid,
      "routetimeid": that.data.index1,
      "totalprice": that.data.price,
      "userid": that.data.userid
    }
    // console.log(data)
    let data1 = JSON.parse(JSON.stringify(data))
    console.log('到不了')
    wx.request({
      url: 'https://api.qyshang.com/order/signup', // 仅为示例，并非真实的接口地址
      method: 'POST',
      dataType: 'json',
      data: data1,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data.code == 200) {
          console.log(res)
          console.log(1)
          wx.requestPayment({
            'timeStamp': res.data.data.timeStamp,
            'nonceStr': res.data.data.nonceStr,
            'package': res.data.data.packagevaule,
            'signType': res.data.data.signType,
            'paySign': res.data.data.paySign,
            'success': function(res) {
              wx.navigateTo({
                url: '../trip/trip?id=' + that.data.routeid
              })
              console.log(res)
            },
            'fail': function(res) {
              console.log(2)
              console.log(res)
            },
            'complete': function(res) {
              console.log(3)
              console.log(res)
            }
          })
        }
      }
    })

  },
  accMul(arg1, arg2) {
    var m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length
    } catch (e) {}
    try {
      m += s2.split(".")[1].length
    } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    let id = e.currentTarget.dataset.id
    let arr = this.data.list1
    let newarr = []
    if (e.detail.value == 1) {
      this.setData({
        ashu: this.data.ashu + 1,
        cshu: this.data.cshu - 1,
        price: [this.data.adultprice * (this.data.ashu + 1) * 1000 + this.data.childrenprice * (this.data.cshu - 1) * 1000] / 1000
      })
    } else if (e.detail.value == 0) {
      this.setData({
        ashu: this.data.ashu - 1,
        cshu: this.data.cshu + 1,
        price: [this.data.adultprice * (this.data.ashu - 1) * 1000 + this.data.childrenprice * (this.data.cshu + 1) * 1000] / 1000
      })
    }
    arr.forEach((val, index) => {
      if (id === index) {
        newarr.push({
          name: val.name,
          phonenumber: val.phonenumber,
          idcard: val.idcard,
          pstatus: e.detail.value
        })
      } else {
        newarr.push({
          name: val.name,
          phonenumber: val.phonenumber,
          idcard: val.idcard,
          pstatus: val.pstatus
        })
      }
      this.setData({
        list1: newarr
      })
    })
    console.log(this.data.price)
    console.log(this.data.adultprice)
    console.log(this.data.ashu)
    console.log(this.data.childrenprice)
    console.log(this.data.cshu)
  },
  bindKeyInput1(e) {
    let id = e.currentTarget.dataset.id
    let arr = this.data.list1
    let newarr = []
    // console.log(e.detail.value)
    arr.forEach((val, index) => {
      if (id === index) {
        newarr.push({
          name: e.detail.value,
          phonenumber: val.phonenumber,
          idcard: val.idcard,
          pstatus: val.pstatus
        })
      } else {
        newarr.push({
          name: val.name,
          phonenumber: val.phonenumber,
          idcard: val.idcard,
          pstatus: val.pstatus
        })
      }
      this.setData({
        list1: newarr
      })
    })
  },

  bindKeyInput2(e) {
    let id = e.currentTarget.dataset.id
    let arr = this.data.list1
    let newarr = []
    // console.log(e.detail.value)
    arr.forEach((val, index) => {
      if (id === index) {
        newarr.push({
          name: val.name,
          phonenumber: e.detail.value,
          idcard: val.idcard,
          pstatus: val.pstatus
        })
      } else {
        newarr.push({
          name: val.name,
          phonenumber: val.phonenumber,
          idcard: val.idcard,
          pstatus: val.pstatus
        })
      }
      this.setData({
        list1: newarr
      })
    })
  },

  bindKeyInput3(e) {
    let id = e.currentTarget.dataset.id
    let arr = this.data.list1
    let newarr = []
    // console.log(e.detail.value)
    arr.forEach((val, index) => {
      if (id === index) {
        newarr.push({
          name: val.name,
          phonenumber: val.phonenumber,
          idcard: e.detail.value,
          pstatus: val.pstatus
        })
      } else {
        newarr.push({
          name: val.name,
          phonenumber: val.phonenumber,
          idcard: val.idcard,
          pstatus: val.pstatus
        })
      }
      this.setData({
        list1: newarr
      })
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

  }


})