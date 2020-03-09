const cloud = require('wx-server-sdk')
const templateMessage = require('templateMessage.js')//引入发送模板消息方法
const COLL_FIELD_NAME = 'accessToken';//存放accessToken的数据集
const FIELD_NAME = 'ACCESS_TOKEN'//数据类型
const MSGID = 'hzkDjEh9rV9ljQW5zIFoyNXI59FIykQRRUK0KNrKPnY';//要发送的模板消息的模板ID
cloud.init()
const db = cloud.database()
const send = async data => {
    let openid = data._openid//获取用户openid
    let formid = data.formid//获取formid
    let tokenRes = await db.collection(COLL_FIELD_NAME).where({
        type: FIELD_NAME
    }).get()// 从数据库中获取AccessToken
    let token = tokenRes.data[0].token; // access_token
    let page = 'pages/market/market';//模板消息的打开页
    let msgData = {//根据需求自定模板消息的数据
        thing2: {
            value: data.formData.course
        },
        date8: {
            value: data.formData.courseDate
        },
        date5: {
            value: data.formData.courseTime
        },
        thing10: {
            value: data.formData.address
        }
    };
    await templateMessage.sendTemplateMsg(token, MSGID, msgData, openid, formid, page);//调用发送模板消息方法
}
module.exports = {
    send: send,
}