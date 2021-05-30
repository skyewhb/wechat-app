// 云函数入口文件
const cloud = require('wx-server-sdk')
// database

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  res = db.collection('Projects').get()
  return res
  //return db.collection("Projects").get()
}