// pages/register/teacher.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    apartment: '',
    student_id: '',
    else: '',
    openid: '',
    skill: '',
    url: '',
    identity: 'student',
    show: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onBlur(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    console.log(event.currentTarget.dataset.fieldname);
    let fieldName = event.currentTarget.dataset.fieldname
    let val = event.detail.value;
    let data = {};
    data[fieldName] = val
    this.setData(data)
  },
  onClick(event) {
    this.setData({
      show: true
    })

  },
  dialogClose(event) {
    this.setData({
      show: false
    })
  },

  dialogConfirm(event) {
    this.setData({
      show: false
    })
    wx.cloud.callFunction({
        name: "addStudent",
        data: {
          name: this.data.name,
          apartment: this.data.apartment,
          skill: this.data.skill,
          else: this.data.else,
          openid: this.data.openid,
          student_id: this.data.student_id,
        }
      })
      .then(res => {
        console.log("调用addstudent成功", res)
      }).catch(console.error)

    wx.cloud.callFunction({
        name: "addUser",
        data: {
          name: this.data.name,
          url: this.data.url,
          openid: this.data.openid,
          identity: this.data.identity,
        }
      })
      .then(res => {
        wx.showToast({
          title: "注册成功",
          icon: 'success', //图标，支持"success"、"loading"
        })
        
        console.log("调用addUser成功", res)
      }).catch(console.error)
      wx.switchTab({
        url: "/pages/index/index",
      })
    
    console.log("跳转")
  },


  onLoad: function (options) {
    console.log(app.globalData)
    this.setData({
      url: app.globalData.userInfo.avatarUrl
    })
    let that = this
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
    wx.getUserInfo({
      success: function (res) {
        that.setData({
          url: res.userInfo.avatarUrl
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})