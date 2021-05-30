// pages/me/me.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    openid: '',
    identity:""
  },

  dialogClose_reg(event) {
    this.setData({
      show: false
    })
    wx.switchTab({
      url: "/pages/index/index",
    })
  },

  dialogConfirm_reg(event) {
    this.setData({
      show: false
    })
    wx.navigateTo({
      url: "/pages/register/register",
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
        name: "login"
      })
      .then(res => {
        console.log("用户登陆openid：", res.result.openid)
        this.setData({
          openid: res.result.openid
        })
      })
      .catch(console.error)
    wx.cloud.callFunction({
        name: "isUser",
        data: {
          openid: this.data.openid
        }
      })
      .then(res => {
        console.log("用户登陆状态：", res.result.data.length)
        let temp = res.result.data.length
        console.log(temp)
        if (temp == 0) {
          this.setData({
            show : true
          })
        }
        else{
          this.setData({
            identity: res.result.data[0].identity
          })
          console.log("已注册，是",this.data.identity)
        }
      })
      .catch(console.error)
  },

  goInfo:function(){
    console.log(this.data.identity)
    if (this.data.identity == "teacher"){
      wx.navigateTo({
        url: '/pages/me/info_teacher?openid='+this.data.openid,
      })
    }
    else if (this.data.identity == "student"){
      wx.navigateTo({
        url: '/pages/me/info_student?openid='+this.data.openid,
      })
    }
  },

  goReleased:function(){
    wx.navigateTo({
      url: '/pages/me/released?openid='+this.data.openid,
    })
  },

  onShow: function () {
    this.onLoad()
  },

})