// pages/market/market.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: '',
    latitude: '',
    markers: [],
    scale: '15',
    locations: []
  },

  getLocations: function () {
    const that = this
    const db = wx.cloud.database()
    db.collection('places').get({
      success: function (res) {
        const locations = res.data
        that.setData({
          locations: locations
        })
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this

    this.getLocations()

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
    for (let item of this.data.locations) {
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