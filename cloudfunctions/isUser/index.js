// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  let res = await db.collection('User').where({_openid: event.userInfo.openId}).get()
  //let res = await db.collection('User').where({
    //_openid: "11"
  //}).get()
  return res
}