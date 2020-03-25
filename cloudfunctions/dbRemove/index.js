// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var id = event.dbParameter
  try{
    await db.collection('msgTask').doc(id).remove()
  }catch(err){
    return(err)
  }
}