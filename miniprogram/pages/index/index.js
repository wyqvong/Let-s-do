Page({

  /**
   * 页面的初始数据
   */
  data: {
    picks: [],
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
    pick: { name: " 点击下方按钮冲冲冲！" },
  },
  //普通选择器
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  //查找数组元素位置
  arrIndexOf: function (arr, val) {
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] == val) return i;
    }
    return -1;
  },

  //删除数组指定位置的元素
  arrRemove: function (arr, index) {
    console.log(arr)
    if (index > -1) {
      arr.splice(index, 1);
    }
  },

  // 点击pick按钮
  formSubmit1: function (e) {
    const that = this
    const index = that.data.index
    const news = that.data.array[index].name
    that.addpicks(news)
    that.setData({
      index: 0
    })
    wx.showToast({
      title: '添加成功',
      icon: 'succes',
      duration: 1000,
      mask: true
    })
  },
  // 点击add pick按钮
  formSubmit2: function (e) {
    const that = this
    let value = e.detail.value.news
    // console.log(value)
    if (value == '') {
      wx: wx.showToast({
        title: '请输入食物名字',
        duration: 1000,
        icon: 'loading'
      })
      return false
    } else {
      that.addpicks(e.detail.value.news)
      that.setData({
        value: ''
      })
      wx.showToast({
        title: '添加成功',
        icon: 'succes',
        duration: 1000,
        mask: true
      })
    }

  },

  //删除已选食物
  delect: function (e) {
    const that = this;
    console.log(e.target.dataset.index)
    const index = e.target.dataset.index
    const arr = that.data.picks
    this.arrRemove(arr, index)
    that.setData({
      picks: arr
    })
    wx.showToast({
      title: '删除成功',
      icon: 'succes',
      duration: 1000,
      mask: true
    })
  },

  //修改备选食物
  addpicks: function (news) {
    const that = this
    // console.log(e)
    const picks = that.data.picks
    const newsf = { name: news }
    picks.push(newsf)
    that.setData({
      picks: picks
    })
  },

  // 查询所有食物
  getAll: function () {
    const db = wx.cloud.database()
    const that = this;
    db.collection('foods').get({
      success: function (res) {
        const all = res.data;
        console.log(all)
        that.setData({
          array: all
        })
      }
    })
  },

  //随机选择幸运食物
  getLucky: function () {
    const that = this;
    const arr = that.data.picks
    const lucky = arr[Math.floor(Math.random() * arr.length)]
    // console.log(lucky)
    if (that.data.picks.length == 0) {
      wx.showToast({
        title: '请先添加食物',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
    } else {
      wx.showToast({
        title: '嘟嘟嘟嘟嘟',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(that.setData({
            pick: lucky
          }))
        }, 1000)
      })
    }

  },

  //判断食物是否已选
  judgePicks: function () {
    const that = this
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAll();
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