// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: 'true'
  },

  teacher(event) {
    this.setData({
      show: false
    })
    wx.navigateTo({
      url: "/pages/register/teacher",
    })
  },

  student(event) {
    this.setData({
      show: false
    })
    wx.navigateTo({
      url: "/pages/register/student",
    })
  },

  changeData: function () {

    this.onLoad(); //最好是只写需要刷新的区域的代码，onload也可，效率低，有点low

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      show: "true"
    })
    console.log("注册选择页")   
  
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
    this.onLoad();
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