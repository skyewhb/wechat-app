// pages/me/released.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    project_data : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //读数据库根据id 显示
    var openid = options.openid
    wx.cloud.database().collection('Projects')
      .where({_openid: openid})
      .get()
      .then(res => {
        this.setData({
          project_data: res.data
        })
        console.log("我的发布页面：", res.data)
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