Page({

  /**
   * 页面的初始数据
   */
  data: {
    picks: [{
      name: "兰州拉面"
    },
    {
      name: "螺蛳粉"
    },
    {
      name: "汉堡"
    },
    {
      name: "披萨"
    },
    {
      name: "关东煮"
    },
    {
      name: "麻辣烫"
    },
    {
      name: "方便面"
    }],
    array: ['选项1', '选项2', '选项3', '选项4'],
    index: 0,//默认显示位置
    pickFood: { name: "螺蛳粉" },
    // allFood:
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllFood();
  },
  getAllFood: function () {
    const db = wx.cloud.database()
    const that = this;
    db.collection('foods').get({
      success: function (res) {
        const allFood = res.data;
        console.log(allFood)
        that.setData({
          array: allFood
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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