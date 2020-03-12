// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  return save(event)
}

// function convertDateFromString(dateString) {
//   if (dateString) {
//     var date =  dateString.substring(0,19).replace(/-/g,'/'); 
//     let time = new Date(date);
//     return time;
//   }
// }

async function save(event) {
  var date = event.formData.date + ' ' + event.formData.time + ':00'//2020-02-02 12:00:00
  var time = Date.parse(date)
  var execTime = new Date(Date.parse(date.replace(/-/g, "/"))) 
  var hours = (execTime.getHours())-8
  var minutes = execTime.getMinutes()
  // 设定推送时间
  if (minutes >= 30) {
    execTime.setMinutes(minutes - 30)
  } else {
    execTime.setHours(hours - 1)
    execTime.setMinutes(30 + minutes)
  }

  return await db.collection('msgTask').add({//将定时任务存入云函数数据库
    data: {
      data: {
        _openid: event.userInfo.openId,
        formData: event.formData
      },
      execTime: execTime,
      // taskType: "1",//可根据需求自定
      _openid: event.userInfo.openId,
    }
  })
}