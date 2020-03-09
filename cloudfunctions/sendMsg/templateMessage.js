const rp = require('request-promise');//npm引用request-promise包,可用可不用
const sendTemplateMsg = async (token, msgid, msgData, openid, formid, page) => {
  console.log("发送数据", "token:", token, "msgid:", msgid, "msgData:", msgData, "openid:", openid, "formid:", formid,"page:" ,page)
  await rp({
    json: true,
    method: 'POST',
    uri: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + token,
    body: {
      touser: openid,
      template_id: msgid,
      page: page,
      form_id: formid,
      data: msgData
    }
  }).then(res => {
    console.log("发送成功", res)
  }).catch(err => {
    console.error(err)
  })
}
module.exports = {
  sendTemplateMsg: sendTemplateMsg
}