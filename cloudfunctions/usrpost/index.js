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
      Img: event.url,
      Detail_Information: event.detail,
      Published_Time: event.date,
      Page_View: event.page_view,
      _openid: event.openid
    }
   })
}