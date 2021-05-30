var openid = 'oVYv35BJyyCtb3Q2TDiukBGFBdEA';
let i = 0;
let index = 0;
Page({
  data: {
    groupId_list: {},
    groupId_list_len: 0,
    _openid_list: {},
    message_list: [
      {
        nickName : "测试号🐼" , 
        sendTime : "2021-12-25",
        textContent : "qaaaaaaaq"
      },
      {
        nickName : "测试号🐼" , 
        sendTime : "2011-12-25",
        textContent : "qaq"
      }
    ],

    anther: '',
  },
  async onLoad() {
    var that = this;
    var j;
    var len;
    var anther = '';
    this.onGetOpenid();
    await wx.cloud.database().collection("chatroom_message")
      .where({
        openid1: openid
      })
      .get()
      .then(res => {
        for (j = 0, len = res.data.length; j < len; j++) {
          that.data.groupId_list[j] = res.data[j].groupid;
        }
        that.data.groupId_list_len = len;
      })
      .catch(err => {
        console.log('message请求chatroom失败', err)
      })

    for (j = 0, len = that.data.groupId_list_len; j < len; j++) {
      that.getOpenid_alter(that.data.groupId_list[j], j)
    }

    setTimeout(() => {
      this.getChatRecord()
    }, 500);


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
  goMessageDetail(e) {
    console.log('点击了跳转到聊天detail页面', e.currentTarget.dataset.groupId)
    wx.navigateTo({
      url: '/pages/message_detail/message_detail?groupId=' + e.currentTarget.dataset.groupId,
    })
  },

  //获取另一个人聊天的openid
  getOpenid_alter(e, j) {
    var that = this;
    wx.cloud.database().collection("chatroom")
      .where({
        groupId: e + ''
      })
      .get()
      .then(res => {
        that.setData({
          anther: res.data[i]._openid
        })
        console.log("anther._openid = ", that.data.anther);
        i++;
      })
      .catch(err => {})
  },

  //从chatroom获取最后一条聊天记录
  getChatRecord() {
    let that = this
    console.log("anther = ", that.data.anther)
    wx.cloud.database().collection("chatroom")
      .where({
        _openid: that.data.anther
      })
      .orderBy("sendTime", "desc")
      .get()
      .then(res => {
        console.log("chatroom请求成功", res.data[0]);
        that.data.message_list[index] = res.data[0];
        index++;
      })
  },

})