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
    array: [{
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
    index: 0,//默认显示位置
    pickFood: { name: "螺蛳粉" }
  },
  //选择器
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  // 点击add pick按钮
  formSubmit1:function(e){
    const index = this.data.index
    const newsfood = this.data.array[index].name
    this.changepicks(newsfood)
  },
  formSubmit2:function(e){
    this.changepicks(e.detail.value.newsfood)
  },

  //修改备选食物
  changepicks: function (newsfood) {
    const that = this
    // console.log(e)
    const picks = that.data.picks
    const newsf = { name: newsfood   }
    picks.push(newsf)
    that.setData({
      picks: picks
    })
  },

  // 查询所有食物
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.getAllFood();
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