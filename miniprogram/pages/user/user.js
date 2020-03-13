Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: null,
    tasks: []
  },

  getUserInfo: function () {
    let that = this
    wx.cloud.callFunction({
      name: 'getUserInfo',
    }).then(res => {
      let openid = res.result.openid
      console.log('云函数获取到的openid: ', openid)
      that.setData({
        openid: openid
      })
      this.getAllTask()
    }).catch(res => {
      console.log("获取openid失败", res)
    })
  },

  getAllTask: function () {
    const db = wx.cloud.database()
    const that = this;
    db.collection('msgTask').where({
      _openid: this.data.openid
    }).get({
      success: function (res) {
        const all = res.data;
        let tasks = [];
        for (let i = 0; i < all.length; i++) {
          let item = {
            _id: all[i]._id,
            course: all[i].data.formData.course,
            time: all[i].data.formData.time,
            date: all[i].data.formData.date,
            address: all[i].data.formData.address,
            room: all[i].data.formData.room
          }
          tasks.push(item)
        }
        that.setData({
          tasks: tasks
        })

      }
    })
  },
  //删除数组指定位置的元素
  arrRemove: function (arr, index) {
    console.log(arr)
    if (index > -1) {
      arr.splice(index, 1);
    }
  },

  deleteTask: function (e) {
    const that = this
    const index = e.target.dataset.index
    console.log(e.target.dataset)
    const arr = that.data.tasks
    const _id = arr[index]._id
    const db = wx.cloud.database()
    db.collection('msgTask').doc(_id).remove()
    this.arrRemove(arr, index)
    that.setData({
      tasks: arr
    })
    wx.showToast({
      title: '删除成功',
      icon: 'succes',
      duration: 1000,
      mask: true
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
    this.getUserInfo()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getAllTask()
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