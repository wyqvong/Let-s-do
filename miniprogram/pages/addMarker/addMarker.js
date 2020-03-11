// pages/addMarker/addMarker.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: '',
    longitude: '',
    address: '',
    name: '请输入地址别名',
    id: null
  },

  getLastId: function () {
    const that = this
    const db = wx.cloud.database()
    db.collection('places').where({}).orderBy('id', 'desc').limit(1).get({
      success: function (res) {
        const id = (res.data[0].id) + 1
        console.log(id)
        that.setData({
          id: id
        })
      }
    })

  },

  bindKeyInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  formSubmit: function () {
    const that = this
    console.log(this.data)
    const db = wx.cloud.database()
    db.collection('places').add({
      data: {
        id: that.data.id,
        placeAddress: that.data.address,
        placeLatitude: that.data.latitude,
        placeLongitude: that.data.longitude,
        placeName: that.data.name
      }
    })

  },
  mapclick: function () {
    const that = this;
    console.log("地图点击");
    wx.chooseLocation({
      success: function (res) {
        console.log("地图点击事件：" + JSON.stringify(res));
        var longitude = res.longitude.toString();
        var latitude = res.latitude.toString();
        var address = res.address;
        that.setData({
          latitude: latitude,
          longitude: longitude,
          address: address,
        });
        //移动marker
        that.mapCtx.moveToLocation();
      },
      fail: function (res) {
        console.log("点击地图fail:" + JSON.stringify(res));
      },
      complete: function (res) {        // complete
        console.log("点击地图complete:" + JSON.stringify(res));
      }
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLastId()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('map')

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