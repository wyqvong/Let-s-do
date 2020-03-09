cloud = require('wx-server-sdk');
const rq = require('request-promise')//通过npm引入request-promise包,可用可不用
cloud.init()
const db = cloud.database();
const APPID = 'wx9339985e6fae83dc';
const APPSECRET = 'a94949a0d3da0871ea9a3aa8f93958eb';
const COLLNAME = 'accessToken';//云函数数据库的数据集名
const FIELDNAME = 'ACCESS_TOKEN'//数据type 
exports.main = async (event, context) => {
  try {
    let res = await rq({
      method: 'GET',
      uri: "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=" + APPID + "&secret=" + APPSECRET,
    });
    res = JSON.parse(res)//获取AccessToken
    let now = new Date();//当前时间
    let resUpdate = await db.collection(COLLNAME).where({
      type: FIELDNAME
    }).update({//存入云函数数据库
      data: {
        token: res.access_token,
        time: now,
      }
    })
  } catch (e) {
    console.error(e)
  }
}