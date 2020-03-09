const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async(event, context) => {
  const execTasks = []; //创建待执行任务栈
  // 1.获取数据库中待执行的定时任务
  let taskRes = await db.collection('msgTask').limit(100).get()
  let tasks = taskRes.data;
  // 2.定时任务是否到达触发时间，时间到了便存入任务栈，并将数据库中的记录删除
  let now = new Date();
  try {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].execTime <= now) { //判断是否已经过了任务触发时间
        execTasks.push(tasks[i]); //存入待执行任务栈
        // 定时任务数据库中删除该任务
        await db.collection('msgTask').doc(tasks[i]._id).remove()
      }
    }
  } catch (e) {
    console.error(e)
  }
  // 3.处理待执行任务
  for (let i = 0; i < execTasks.length; i++) {
    let task = execTasks[i];
    if (task) { //执行发送方法
      console.log("send执行了", task.data)
      const send = require('send.js')//引入发送方法
      try {
        await send.send(task.data)//执行发送方法
      } catch (e) {
        console.error(e)
      }
    }
  }
}