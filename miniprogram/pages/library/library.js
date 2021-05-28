// pages/library/library.js

Page({
  /**
   * 页面的初始数据
   */
  data: {
    project_data:[],
    tabs: ['项目库', '导师库', '学生库'],
    activeIndex: 0,
    showPwdPop: false,
    cloudFunctionName:'getProjects',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  tabClick(event){
    console.log("点击了页面",event.detail.index)
    let index = event.detail.index
    if (index == 0){
      this.setData({
        cloudFunctionName : "getProjects",
        activeIndex: 0
      })
      console.log(this.data.cloudFunctionName)
      this.onLoad()
    }
    else if (index == 1){
      this.setData({
        cloudFunctionName : "getTeacherInfo",
        activeIndex: 1
      })
      console.log(this.data.cloudFunctionName)
      this.onLoad()
    }
    else if (index == 2){
      this.setData({
        cloudFunctionName : "getStudentInfo",
        activeIndex: 2
      })
      console.log(this.data.cloudFunctionName)
      this.onLoad()
    }
  },
  onLoad: function (options) {
    wx.cloud.callFunction({
        name: this.data.cloudFunctionName
      })
      .then(res => {
        console.log("调用数据库返回结果：", res.result.data)
        this.setData({
          project_data: res.result.data
        })
      })
      .catch(console.error)
  },
  click_project: function (e) {
    console.log("点击了项目库，访问详情页", e.currentTarget.dataset.info._id)
    wx.navigateTo({
      url:'/pages/library/project_detail/project_detail?id='+e.currentTarget.dataset.info._id
    })
  },
  click_teacher: function (e) {
    console.log("点击了导师库，访问详情页", e.currentTarget.dataset.info._id)
    wx.navigateTo({
      url:'/pages/library/teacher_detail/teacher_detail?id='+e.currentTarget.dataset.info._id
    })
  },
  click_student: function (e) {
    console.log("点击了学生库，访问详情页", e.currentTarget.dataset.info._id)
    wx.navigateTo({
      url:'/pages/library/student_detail/student_detail?id='+e.currentTarget.dataset.info._id
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