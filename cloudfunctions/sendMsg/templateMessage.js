const cloud = require('wx-server-sdk')
const sendTemplateMsg = async (templateId, msgData, openid, page) => {
  console.log("发送数据", "templateId:", templateId, "msgData:", msgData, "openid:", openid, "page:", page)
  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: openid,
      page: page,
      lang: 'zh_CN',
      data: msgData,
      templateId: templateId,
      // miniprogramState: 'developer'
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}
module.exports = {
  sendTemplateMsg: sendTemplateMsg
}