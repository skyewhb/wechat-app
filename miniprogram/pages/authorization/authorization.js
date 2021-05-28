Page({

  data: {},

  /**
   * 授权按钮
   * [该函数用户拒绝授权后也会触发]
   * [用户拒绝授权后要做的事]
   * @return void
   */
  bindGetUserInfo:function(e)
  {

    // 用户信息
    // console.log(e.detail.userInfo)

    // 直接跳转页面(拒绝了授权)
    wx.reLaunch({
      url: '/pages/index/index',
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options)
  {

    /**
     * 检查是否已授权
     * [已授权的话] 直接跳转页面
     */

     // 检查是否授权
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {

            // 已授权(可直接调用getUserInfo获取头像昵称)
            wx.getUserInfo({
              success(res) {

                // 用户信息
                console.log(res.userInfo)

                // 直接跳转页面(不在询问)
                wx.reLaunch({
                  url: '/pages/index/index',
                })

              }
            })
          }
          // 未授权则会询问用户授权
        }
      })
  },

})
