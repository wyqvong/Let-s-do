// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  event.data.res.push({
    "placeAddress": event.data.placeAddress,
    "placeLatitude": event.data.placeLatitude,
    "placeLongitude": event.data.placeLongitude,
    "placeName": event.data.placeName
  })
  return db.collection(event.dbName).where({
    _openid:  event.userInfo.openId
  }).update({
    data:{
      marker: event.data.res
    }
  })
}