Page({

  /**
   * 页面的初始数据
   */
  data: {
    d_index: null,
    visible5: false,
    openid: null,
    tasks: [],
    actions5: [{
        name: '取消'
      },
      {
        name: '删除',
        color: '#ed3f14',
        loading: false
      }
    ]
  },

  deleteTip(e) {
    let index = e.target.dataset.index
    this.setData({
      visible5: true,
      d_index: index
    });
  },

  delete({
    detail
  }) {
    if (detail.index === 0) {
      this.setData({
        visible5: false
      });
    } else {
      const action = [...this.data.actions5];
      action[1].loading = true;
      this.deleteTask(this.data.d_index)
      this.setData({
        actions5: action
      });

      setTimeout(() => {
        action[1].loading = false;
        this.setData({
          visible5: false,
          actions5: action
        });
      }, 2000);
    }
  },

  getUserInfo: function() {
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
      console.log("获取失败", res)
    })
  },

  getAllTask: function() {
    const that = this;
    wx.cloud.callFunction({
      name: 'getAllTask'
    }).then(res => {
      const all = res.result.data;
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
    })
  },
  //删除数组指定位置的元素
  arrRemove: function(arr, index) {
    console.log(arr)
    if (index > -1) {
      arr.splice(index, 1);
    }
  },

  deleteTask: function(index) {
    const that = this
    const arr = that.data.tasks
    const _id = arr[index]._id
    wx.cloud.callFunction({
      name: 'dbRemove',
      data: {
        dbName: 'msgTask',
        dbParameter: _id
      },
      success: res => {
        console.log(res)
        console.log("删除成功")
        that.arrRemove(arr, index)
        that.setData({
          tasks: arr
        })
      }
      // wx.showToast({
      //   title: '删除成功',
      //   icon: 'succes',
      //   duration: 1000,
      //   mask: true
      // })

    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getUserInfo()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})