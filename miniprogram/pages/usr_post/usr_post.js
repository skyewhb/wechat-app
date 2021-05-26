// pages/usr_post/usr_post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectName: '',
    orientation: '',
    request: '',
    period: '',
    detail: '',
    openid: '',
    show: false,
  },

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
    console.log(this.data)
    console.log(this.data.orientation)
    console.log(this.data.detail)
  },

  dateFormat: function (date) { //author: meizz   

    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds()
    var realMonth = month > 9 ? month : "0" + month
    return year + "-" + realMonth + "-" + day + " " + hour + ":" + minutes + ":" + seconds

  },

  dialogClose(event) {
    this.setData({
      show: false
    })
  },

  dialogConfirm(event) {
    var date = this.dateFormat(new Date())
    console.log(date)
    this.setData({
      show: false
    })
    wx.cloud.callFunction({
        name: "usrpost",
        data: {
          projectName: this.data.projectName,
          orientation: this.data.orientation,
          request: this.data.request,
          period: this.data.period,
          detail: this.data.detail,
          openid: this.data.openid,
          date: date
        }
      })
      .then(res => {
        console.log("调用usrpost成功", res)
      }).catch(console.error)
      wx.navigateTo({
        url: "/pages/library/library",
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
    //判断是否登陆
    wx.cloud.callFunction({
        name: "isTeacher",
        data: {
          openid: this.data.openid
        }
      })
      .then(res => {
        console.log("用户登陆状态：", res)
      })
      .catch(console.error)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

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