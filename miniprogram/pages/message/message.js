var openid_ = 'oVYv35BJyyCtb3Q2TDiukBGFBdEA';
let already_length1 = 0; //用于记录groupid和another——openid-list的长度
let already_length2 = 0;
const db = wx.cloud.database();
Page({
  data: {
    //房间号的数组
    groupId_list: [],

    //另一个人的信息集合
    another_info: [],

    //另一个人的openid的数组
    another_openid_list: [],

    //最后一条消息的集合
    message_list: [],
  },
  async onLoad() {
    var that = this;
    var i;
    var j;
    var len;
    var another = '';
    //获取当前使用者的用户openid
    this.onGetOpenid();

    //在chatroom_message库中，当前用户作为项目接收人的openid寻找到全部的groupid和另一人的openid,并存入groupId_list数组和another_openid_list
    const res = await db.collection("chatroom_message")
      .where({
        _openid: openid_
      })
      .get();
    for (j = 0, len = res.data.length; j < len; j++) {
      var param = {};
      var param1 = {};
      var string = "groupId_list[" + that.data.groupId_list.length + "]";
      var string1 = "another_openid_list[" + that.data.another_openid_list.length + "]";
      param[string] = res.data[j].groupid;
      param1[string1] = res.data[j].openid1;
      that.setData(param)
      that.setData(param1)
    }
    already_length1 = res.data.length;

    //在chatroom_message库中，当前用户作为项目发起人的openid寻找到全部的groupid和另一人的openid,并存入groupId_list数组和another_openid_list
    const res3 = await db.collection("chatroom_message")
      .where({
        openid1: openid_
      })
      .get();
    for (i = 0, j = already_length1, len = res3.data.length; j < already_length1 + len; i++, j++) {
      var param = {};
      var param1 = {};
      var string = "groupId_list[" + that.data.groupId_list.length + "]";
      var string1 = "another_openid_list[" + that.data.another_openid_list.length + "]";
      param[string] = res3.data[i].groupid;
      param1[string1] = res3.data[i]._openid;
      that.setData(param)
      that.setData(param1)
    }
    console.log("groupId = ", that.data.groupId_list);
    console.log("another", that.data.another_openid_list);

    //根据another_openid_list中的openid去老师库寻找对应的个人信息
    for (j = 0, len = that.data.another_openid_list.length; j < len; j++) {
      var temp_another_openid1 = that.data.another_openid_list[j];
      const res1 = await db.collection("Teachers")
        .where({
          _openid: temp_another_openid1
        })
        .get();
      var param2 = {};
      var string2 = "another_info[" + that.data.another_info.length + "]";
      if (res1.data.length == 0) {
        param2[string2] = null;
      } else {
        param2[string2] = res1.data[0];
      }
      that.setData(param2)
    }
    already_length2 = that.data.another_openid_list.length;

    //根据another_openid_list中的openid去学生库寻找对应的个人信息
    for (i = 0, j = already_length2; j < 2 * already_length2; i++, j++) {
      var temp_another_openid2 = that.data.another_openid_list[i];
      const res2 = await db.collection("Students")
        .where({
          openid: temp_another_openid2
        })
        .get();
      var param3 = {};
      var string3 = "another_info[" + that.data.another_info.length + "]";
      if (res2.data.length == 0) {
        param3[string3] = null;
      } else {
        param3[string3] = res2.data[0];
      }
      that.setData(param3)
    }
    console.log("another info = ", that.data.another_info)

    //根据groupid在chatroom里面找到最后一条消息
    for (j = 0, len = that.data.groupId_list.length; j < len; j++) {
      var temp_groupId = that.data.groupId_list[j];
      console.log("groupid = ", temp_groupId)
      const res4 = await db.collection("chatroom")
        .where({
          groupId: temp_groupId + ''
        })
        .orderBy("sendTime", "desc")
        .get();
      var param4 = {};
      var string4 = "message_list[" + that.data.message_list.length + "]";
      console.log("res4 = ", res4.data[0])
      param4[string4] = res4.data[0];
      that.setData(param4)
    }
    console.log("message info = ", that.data.message_list)

  },

  onGetOpenid: function () {
    // 调用云函数获取openid
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        this.setData({
          openid: res.result.openid
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  //跳转到项目详情页
  goMessageDetail(event) {
    wx.navigateTo({
      url: '../project_detail/room/room?groupid=' + event.currentTarget.dataset.groupid
    });
    return;
  }
})