// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {

  return db.collection('places').where({}).orderBy('id', 'desc').limit(1).get({
    success: function (res) {
      return res
    }
  })
}