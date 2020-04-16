// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection('users').where({
    _openid: event.userInfo.openId
  }).get({
    success: function (res) {
      return res.data
    }
  })
}