var dateTimePicker = require('../../utils/dateTimePicker.js')
// pages/market/market.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: '',
    latitude: '',
    markers: [],//标记集合
    scale: '15',//地图视野范围
    locations: [],//地点集合
    course: '软件工程',
    address: '天院教学楼11栋',
    //选择器
    date: '2020-01-01',
    time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2020,
    endYear: 2030
  },

  // onLoad() {
  //   // 获取完整的年月日 时分秒，以及默认显示的数组
  //   var obj = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
  //   var obj1 = dateTimePicker.dateTimePicker(this.data.startYear, this.data.endYear);
  //   // 精确到分的处理，将数组的秒去掉
  //   var lastArray = obj1.dateTimeArray.pop();
  //   var lastTime = obj1.dateTime.pop();

  //   this.setData({
  //     dateTime: obj.dateTime,
  //     dateTimeArray: obj.dateTimeArray,
  //     dateTimeArray1: obj1.dateTimeArray,
  //     dateTime1: obj1.dateTime
  //   });
  // },

  changeDate(e) {
    this.setData({ date: e.detail.value });
  },
  changeTime(e) {
    this.setData({ time: e.detail.value });
  },

  // 查询数据库的地址集合
  getLocations: function () {
    const that = this
    const db = wx.cloud.database()
    db.collection('places').get({
      success: function (res) {
        const locations = res.data
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
              longitude: res.longitude,
              latitude: res.latitude
              // longitude: '108.653665',
              // latitude: '35.067043'
            })
          }
        })
      }
    })
  },


  formSubmit: function (e) {
    let that = this
    wx.cloud.callFunction({
      name: 'getUserInfo',
    }).then(res => {
      let openid = res.result.openid
      console.log('云函数获取到的openid: ', openid)
      const formData = {
        date: that.data.date,
        time: that.data.time,
        course: that.data.course,
        address: that.data.address
      }
      that.send(openid, formData)
    }).catch(res => {
      console.log("获取openid失败", res)
    })
  },

  //用户授权订阅消息
  shouquan: function () {
    wx.requestSubscribeMessage({
      tmplIds: ['hzkDjEh9rV9ljQW5zIFoyNXI59FIykQRRUK0KNrKPnY'],//消息模板
      success(res) {
        console.log('授权成功', res)
      },
      fail(res) {
        console.log('授权失败', res)
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
    wx.cloud.callFunction({
      name: "saveFormData",
      data: {
        openid: openid,
        formData: data
      }
    }).then(res => {
      console.log("发送信息到云函数成功", res)
    }).catch(res => {
      console.log("发送信息到云函数失败", res)
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this

    // this.getLocations()

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
  onReady: function () {
    // 使用 wx.createMapContext 获取 map 上下文 
    this.mapCtx = wx.createMapContext('myMap')
  },

  // 
  controltap(e) {
    this.moveToLocation()
  },

  //通过location集合处理后变成marker集合
  getSchoolMarkers() {
    var market = []
    for (let item of this.data.locations) {
      let marker1 = this.createMarker(item)
      market.push(marker1)
    }
    return market
  },

  // 移动到用户当前位置
  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },

  // 处理横坐标
  strSub: function (a) {
    var str = a.split(".")[1]
    str = str.substring(0, str.length - 1)
    return a.split(".")[0] + '.' + str
  },

  createMarker(point) {
    let latitude = this.strSub(point.placeLatitude)
    let longitude = point.placeLongitude
    let marker = {
      iconPath: "/images/bj1.png",
      id: point.id || 0,
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
      width: 20,
      height: 20
    }
    return marker
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})