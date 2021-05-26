// pages/project_detail/project_detail.js
const app = getApp();
const db = wx.cloud.database();
const regeneratorUntime = require('../../utils/runtime.js') 
let Page_View1 = 1;
var id_static = "";
var teacher_name = "";
Page({
  data() {
    openid:null//系统自动获取
    openid1: null//外部给的
    groupid: null//房间号
    detail: {}
    teacher: {}
  },
  async onLoad(options) {
    var id = options.id
    var that = this
    this.onGetOpenid();//加载时自动获取openid
    await wx.cloud.database().collection("Projects")
      .doc(id)
      .get()
      .then(res1 => {
        console.log('project detail请求Projects成功', res1.data)
        this.setData({
          detail: res1.data,
        })
        Page_View1 = res1.data.Page_View
        id_static = id
        teacher_name = res1.data.Teacher
      })
      .catch(err1 => {
        console.log('project detail请求Projects失败', err1)
      })

    wx.cloud.database().collection("Teachers")
      .where({
        Name : teacher_name
      })
      .get()
      .then(res2 => {
        console.log('project detail请求Teachers成功', res2.data)
        this.setData({
          teacher: res2.data,
          
        })
        that.data.openid1 = res2.data[0]._openid
      })
      .catch(err2 => {
        console.log('project detail请求Teachers失败', err2)
      })


    // wx.cloud.database().collection("Projects")
    // .add({
    //   data:{
    //     Detail_Information:'Something not just like this' ,
    //     Limitation:'本科在读',
    //     Project_Time:'三个月',
    //     Published_Time:'12132253',
    //     Teacher:'小明',
    //     Work_Orientation:'数据库',
    //     Work_Time:'一周6小时',
    //     Page_View: 125 ,
    //     Published_Time: "2021-05-20 10:17:49"
    //   }
    // })
    // .then(res4 => {
    //   console.log('Projects添加成功', res4)
    // })
    // .catch(err4 => {
    //   console.log('Projects添加失败', err4)
    // })
  },

  //关闭时更新数据的浏览量
  onUnload: function () {
    Page_View1++
    wx.cloud.database().collection("Projects")
      .doc(id_static)
      .update({
        data: {
          Page_View: Page_View1
        }
      })
      .then(res3 => {
        console.log('修改成功', res3)
      })
      .catch(err3 => {
        console.log('修改失败', err3)
      })

    // 刷新上一页的数据，更新浏览量
    var pages = getCurrentPages()
    var prevpage = pages[pages.length - 1]
    prevpage.setData({
      "list": []
    })
    wx.navigateBack({
      delta: 1,
      success: function (event) {
        var page = getCurrentPages().pop();
        page.onLoad();
      }
    })
  },

  goMessage() {
    wx.switchTab({
      url: '/pages/message/message',
    })
  },

//修改数据
upData:async function(){
  var id="79550af260a9e3d71952cc1b02f94b73";
  const res=await db.collection("global_data").doc(id).get();
  var GID=res.data.GID;//读取global group id
  GID++;//增加一个房间
  this.setData({
    groupid:GID,//存到page本身的变量中
  })
  //console.log(this.data.groupid);
  db.collection('global_data').doc(id).update({
    data:{
      GID:this.data.groupid,//更新数据库里数据
    },
    success(res){
      console.log("修改成功", res)
    },
    fail(res){
      console.log("修改失败", res)
    }
  })
},

onGetOpenid: function() {
// 调用云函数获取openid
wx.cloud.callFunction({
  name: 'login',
  data: {},
  success: res => {
    console.log('[云函数] [login] user openid: ', res.result.openid)
    app.globalData.openid = res.result.openid
    this.setData({
      openid: res.result.openid
    })
  },
  fail: err => {
    console.error('[云函数] [login] 调用失败', err)
  }
})
},

//保存房间信息
saveRoom: async function(event) {
var that=this;
var j;
var len;
//2对2匹配
try{
  const res= await db.collection('chatroom_message').where({
    _openid: this.data.openid,//openid和数据库里openid对比
  }).get();
  for(j=0,len=res.data.length;j<len;j++){
    if(res.data[j].openid1==that.data.openid1){
      that.setData({
        groupid:res.data[j].groupid,
      })
      //匹配到了，直接跳转
      wx.navigateTo({
        url: './room/room?groupid='+that.data.groupid});
      return;
    }
  }
  const res1= await db.collection('chatroom_message').where({
    _openid:this.data.openid1,//openid1和数据库里openid对比
  }).get();
  console.log(this.data.openid1);
  console.log(res1);
  for(j=0,len=res1.data.length;j<len;j++){
    if(res1.data[j].openid1==that.data.openid){
      that.setData({
        groupid:res1.data[j].groupid,
      })
      //匹配到了，直接跳转
      wx.navigateTo({
        url: './room/room?groupid='+that.data.groupid});
      return;
    }
  }

  //已经有对话直接进房间，从未对话继续执行

  console.log("未匹配到房间！！！！！！");
  
    //未匹配到，更新计数，创建房间，并写入数据库
  await this.upData();//更新全局groupid

  db.collection('chatroom_message').add({
  // data 字段表示需新增的 JSON 数据
  data: {
    openid1:this.data.openid1,
    groupid:this.data.groupid,
  },
  success: function(res) {
    // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
    console.log(res)
    wx.navigateTo({
      url: './room/room?groupid='+that.data.groupid});
    return;
  },
  fail: console.error
})
}
catch (e) {
  console.log("失败", e);
  return -1;
}
},


})