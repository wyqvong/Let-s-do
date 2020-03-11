const cloud = require('wx-server-sdk')
const templateMessage = require('templateMessage.js')//引入发送消息方法
const templateId = 'hzkDjEh9rV9ljQW5zIFoyLGr3RtmLv28L4vjqaSz3bg';//要发送的消息的模板ID
cloud.init()
const db = cloud.database()
const send = async data => {
    let openid = data._openid//获取用户openid
    let page = 'pages/market/market';//模板消息的打开页
    let msgData = {//根据需求自定模板消息的数据
        thing2: {
            value: data.formData.course
        },
        thing10: {
            value: data.formData.address
        },
        thing7: {
            value: data.formData.room
        },
        date8: {
            value: data.formData.date
        },
        date5: {
            value: data.formData.time
        }
    };
    await templateMessage.sendTemplateMsg(templateId, msgData, openid, page);//调用发送订阅消息方法
}
module.exports = {
    send: send,
}