// pages/addMarker/addMarker.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lagitude: '',
    longitude: '',
    address: '',
    name:'请输入地址别名',
    id:0
  },

  bindKeyInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  formSubmit:function(){
    console.log(this.data)
  },

  mapclick: function () {
    const that = this;
    console.log("地图点击");
    wx.chooseLocation({
      success: function (res) {
        console.log("地图点击事件：" + JSON.stringify(res));
        var longitude = res.longitude;
        var lagitude = res.latitude;
        var address = res.address;
        that.setData({
          lagitude: lagitude,
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