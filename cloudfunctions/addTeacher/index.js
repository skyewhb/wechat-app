// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('Teachers').add({
    data:{
      Name: event.name,
      Major: event.major,
      Personal_Introduction: event.introduction,
      contact: event.contact,
      else: event.else,
      _openid: event.openid
    }
   })
}