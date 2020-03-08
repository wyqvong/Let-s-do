// pages/market/market.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: '108.653665',
    latitude: '35.067043',
    markers: [],
    scale: '15',
    listData: [
      {
        "id": 1,
        "placeName": "照金国际滑雪场",
        "placeOpenTime": 1505854800,
        "placeCloseTime": 1505919600,
        "placeAddress": "照金国际滑雪场",
        "placeLongitude": "108.653665",
        "placeLatitude": "35.067043"
      }, {
        "id": 2,
        "placeName": "竹林畔滑雪场",
        "placeOpenTime": 1506286800,
        "placeCloseTime": 1506258000,
        "placeAddress": "竹林畔滑雪场",
        "placeLongitude": "109.265771",
        "placeLatitude": "34.013217"
      }, {
        "id": 3,
        "placeName": "西安翠华山滑雪场",
        "placeOpenTime": 1506200400,
        "placeCloseTime": 1506265200,
        "placeAddress": "西安翠华山滑雪场",
        "placeLongitude": "109.030145",
        "placeLatitude": "33.974409"
      }, {
        "id": 4,
        "placeName": "袁家村九嵕山必捷滑雪场",
        "placeOpenTime": 1506243600,
        "placeCloseTime": 1506265200,
        "placeAddress": "袁家村九嵕山必捷滑雪场",
        "placeLongitude": "108.532186",
        "placeLatitude": "34.613629"
      }, {
        "id": 5,
        "placeName": "白鹿原滑雪场",
        "placeOpenTime": 1506286800,
        "placeCloseTime": 1506351600,
        "placeAddress": "西安市灞桥区纺织城南6公里处",
        "placeLongitude": "109.101024",
        "placeLatitude": "34.222726"
      }
    ]
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    // var data = JSON.stringify({
    //   page: 1,
    //   pageSize: 10,
    //   request: {
    //     placeLongitude: app.globalData.longitude,
    //     placeLatitude: app.globalData.latitude,
    //     userId: app.globalData.userId
    //   }
    // })

    wx.getLocation({
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        that.setData({
          markers: that.getSchoolMarkers(),
          scale: 12,
          // longitude: res.longitude,
          // latitude: res.latitude
          longitude: '108.653665',
          latitude: '35.067043'
        })
      }
    })

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


  controltap(e) {
    this.moveToLocation()
  },

  getSchoolMarkers() {
    var market = []
    for (let item of this.data.listData) {
      let marker1 = this.createMarker(item)
      market.push(marker1)
    }
    return market
  },

  moveToLocation: function () {
    this.mapCtx.moveToLocation()
  },

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
      name: point.placeName || '',
      title: point.placeName || '',
      latitude: latitude,
      longitude: longitude,
      label: {
        x: -24,
        y: -26,
        content: point.placeName
      },
      width: 30,
      height: 30
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