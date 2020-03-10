// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
        return save(event)
}
async function save(event) {
  let time = new Date();
  time.setHours(14, 0, 0, 0)//设定推送时间，可根据需求调整
  console.log(event)
  return await db.collection('msgTask').add({//将定时任务存入云函数数据库
    data: {
      data: {
        _openid: event.userInfo.openId,
        formData: event.formData
      },
      execTime: time,
      // taskType: "1",//可根据需求自定
      _openid: event.userInfo.openId,
    }
  })
}