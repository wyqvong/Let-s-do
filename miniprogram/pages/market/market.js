var dateTimePicker = require('../../utils/dateTimePicker.js')
// pages/market/market.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: '113.456706',
    latitude: '23.259104',
    markers: [], //标记集合
    scale: '16', //地图视野范围
    locations: [], //地点集合
    course: '',
    address: '',
    room: '',
    //选择器
    date: '',
    time: '',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2020,
    endYear: 2030
  },

  //获取当前时间
  getNewDate(){
    var newTime = dateTimePicker.getNewDateArry()
    this.setData({
      date: newTime[0]+'-'+newTime[1]+'-'+newTime[2],
      time: newTime[3]+':'+newTime[4]
    })
  },

  bindKeyInput1: function(e) {
    this.setData({
      course: e.detail.value
    })
  },

  bindKeyInput2: function(e) {
    this.setData({
      address: e.detail.value
    })
  },

  bindKeyInput3: function(e) {
    this.setData({
      room: e.detail.value
    })
  },

  changeDate(e) {
    this.setData({
      date: e.detail.value
    });
  },
  changeTime(e) {
    this.setData({
      time: e.detail.value
    });
  },

  // 查询数据库的地址集合
  getLocations: function() {
    const that = this
    wx.cloud.callFunction({
      name: 'getAdminLocations'
    }).then(res1 => {
      wx.cloud.callFunction({
        name: 'getUserLocations'
      }).then(res2 =>{
        const locations = res1.result.data.concat(res2.result.data[0].marker)
        that.setData({
          locations: locations
        })
        // 形成maekers数组集合
      wx.getLocation({
        type: 'wgs84', //返回可以用于wx.openLocation的经纬度
        success: (res) => {
          that.setData({
            markers: that.getSchoolMarkers(),
            // scale: 12,
            // longitude: res.longitude,
            // latitude: res.latitude
            // longitude: '108.653665',
            // latitude: '35.067043'
          })
        }
      })
      })
    })
  },

  addMarker: function() {
    wx.navigateTo({
      url: '../addMarker/addMarker',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        console.log("成功跳转到addMarker")
      }
    })
  },

  formSubmit: function(e) {
    let that = this
    if (that.data.course && that.data.address && that.data.time && that.data.date && that.data.room) {
      new Promise((reslove,reject)=>{
        wx.requestSubscribeMessage({
          tmplIds: ['hzkDjEh9rV9ljQW5zIFoyLGr3RtmLv28L4vjqaSz3bg'], //消息模板
          success(res) {
            reslove(res)
          },
          fail(res) {
            reject(res)
          }
        })
      }).then((res) => {
        wx.cloud.callFunction({
          name: 'getUserInfo',
        }).then(res => {
          let openid = res.result.openid
          console.log('云函数获取到的openid: ', openid)
          const formData = {
            date: that.data.date,
            time: that.data.time,
            course: that.data.course,
            address: that.data.address,
            room: that.data.room
          }
          that.send(openid, formData)
        }).catch(res => {
          console.log("获取openid失败", res)
        })
      },(res)=>{
        console.log('失败' + res)
      })

    } else {
      wx.showToast({
        title: '表单不能为空',
        icon: 'none',
        duration: 2000
      })
    }

  },

  //用户授权订阅消息
  shouquan: function(reslove, reject) {
    wx.requestSubscribeMessage({
      tmplIds: ['hzkDjEh9rV9ljQW5zIFoyLGr3RtmLv28L4vjqaSz3bg'], //消息模板
      success(res) {
        console.log('授权成功', res)
        reslove(res)
      },
      fail(res) {
        console.log('授权失败', res)
        reject(res)
      }
    })
  },

  //获取用户id并发送消息
  // getOpenidToSendMsg: function () {
  //   let that = this
  //   wx.cloud.callFunction({
  //     name: 'getUserInfo',
  //   }).then(res => {
  //     let openid = res.result.openid
  //     console.log('云函数获取到的openid: ', openid)
  //     that.send(openid, that.data.course, that.data.courseDate, that.data.courseTime, that.data.address)
  //   }).catch(res => {
  //     console.log("获取openid失败", res)
  //   })
  // },


  //发送数据到云数据库
  send(openid, data) {
    const that = this
    wx.cloud.callFunction({
      name: "saveFormData",
      data: {
        openid: openid,
        formData: data
      }
    }).then(res => {
      console.log("发送信息到云函数成功", res)
      wx.showToast({
        title: '提交成功',
      })
      that.setData({
        course: '',
        address: '',
        room: '',
        date: '2020-03-12',
        time: '12:00',
      })
    }).catch(res => {
      console.log("发送信息到云函数失败", res)
    })
  },


  // 点击控件时触发
  controltap(e) {
    this.moveToLocation()
  },

  //点击标记点时触发
  markertap(e) {
    const that = this
    let markerId = e.markerId; // 获取点击的markers  id
    let markername = this.data.markers[markerId - 1].title; // 获取markers名称
    that.setData({
      address: markername
    })
  },

  //通过location集合处理后变成marker集合
  getSchoolMarkers() {
    var market = []
    var id = 1
    for (let item of this.data.locations) {
      let marker1 = this.createMarker(item,id)
      market.push(marker1)
      id++
    }
    return market
  },

  // 移动到用户当前位置
  moveToLocation: function() {
    this.mapCtx.moveToLocation()
  },

  // 处理横坐标
  strSub: function(a) {
    var str = a.split(".")[1]
    str = str.substring(0, str.length - 1)
    return a.split(".")[0] + '.' + str
  },

  createMarker(point,id) {
    let latitude = this.strSub(point.placeLatitude)
    let longitude = point.placeLongitude
    let marker = {
      iconPath: point._id?"/images/bj1.png":"/images/bj2.png",
      id: id || 0,
      title: point.placeAddress || '',
      latitude: latitude,
      longitude: longitude,
      label: {
        x: -24,
        y: -26,
        content: point.placeName,
        color: "#575757",
        bgColor: "#ffffff"
      },
      width: 30,
      height: 30
    }
    return marker
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)


    // wx.getSystemInfo({
    //   success: function (res) {
    //     //设置map高度，根据当前设备宽高满屏显示
    //     that.setData({
    //       view: {
    //         Height: res.windowHeight
    //       },

    //     })
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.getNewDate()
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    //获取当前位置和标记点
    this.getLocations()
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('myMap')
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

  }
})