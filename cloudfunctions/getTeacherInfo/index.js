const cloud = require('wx-server-sdk')
// database

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection("Teachers").get()
}