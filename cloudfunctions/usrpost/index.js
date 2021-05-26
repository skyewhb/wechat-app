// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection('Projects').add({
    data:{
      //name: event.projectName,
      name: event.projectName,
      Work_Orientation: event.orientation,
      request: event.request,
      Project_Time: event.period,
      Detail_Information: event.detail,
      Published_Time: event.date,
      _openid: event.openid
    }
   })
}