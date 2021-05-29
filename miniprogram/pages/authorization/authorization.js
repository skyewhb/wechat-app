const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  //不登录退出


  //获取授权信息
  clickUserProfile(){
    wx.getUserProfile({
      desc: '业务需要',
      lang:'zh_CN',
      success:res=>{        
        this.saveUserInfo(res.userInfo)
        wx.reLaunch({
          url: '/pages/index/index',
        })
      }
    })
  },



  //保存用户信息
  saveUserInfo(userInfo){
    app.globalData.userInfo=userInfo
    //console.log(app.globalData.userInfo);
    /*
    var page=getCurrentPages()[getCurrentPages().length-2];
    page.setData({
      userInfo
    })
    
    wx.cloud.callFunction({
      name:"saveuser",
      data:{
        userInfo
      }
    }).then(res=>{      
      
      wx.showToast({
        title: '授权成功'
      })
      
      setTimeout(()=>{
        this.noLogin();
      },1500)
    })*/
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