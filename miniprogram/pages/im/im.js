const app = getApp();
const db = wx.cloud.database();


Page({
  data: {
    openid:null,//系统自动获取
    openid1: "oVYv35Ne8fo7mS03CZ6XYSuZVZiI",//外部给的
    groupid: null,//房间号
  },

  onLoad: function (options) {
    this.onGetOpenid();//加载时自动获取openid
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