// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: event.openid,//推送的用户
      page: 'pages/market/market',//跳转的页面
      data: {
        phrase1: {
          value: '王大大'
        },
        date5: {
          value: '17:15'
        },
        date8: {
          value: '2020-03-09'
        },
        thing10: {
          value: '天院教学楼11栋304'
        }
      },
      templateId: 'hzkDjEh9rV9ljQW5zIFoyHvGpjykgEiZpjmd-zsCh1A'
    })
    console.log(result)
    return result
  }catch(err){
    console.log(err)
    return err
  }
}