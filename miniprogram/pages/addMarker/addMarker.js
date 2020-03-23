// pages/addMarker/addMarker.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scale: '20',//地图视野范围
    longitude: '113.456706',
    latitude: '23.259104',
    address: '',
    name: '',
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
    if (that.data.name && that.data.address && that.data.latitude && that.data.longitude) {
      try {
        function p(res, rej) {
          wx.cloud.callFunction({
            name: 'dbAdd',
            data: {
              dbName: 'places',
              data: {
                id: that.data.id,
                placeAddress: that.data.address,
                placeLatitude: that.data.latitude,
                placeLongitude: that.data.longitude,
                placeName: that.data.name
              }
            }
          }).then(res=>{
            console.log(res)
          })
          res(true)
        }
        new Promise(p).then(res => {
          wx.showToast({
            title: '提交成功',
          })
          that.setData({
            id: that.data.id + 1,
            address: '',
            latitude: '23.259104',
            longitude: '113.456706',
            name: '',
          })
        })
      } catch (e) {
        console.error(e)
      }

    } else {
      wx.showToast({
        title: '表单不能为空',
        icon: 'none',
        duration: 2000
      })
    }


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