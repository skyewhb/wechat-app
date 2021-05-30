// pages/usr_post/usr_post.js
var app = getApp();

Page({
  // 判断是否已注册 注册->可以发，没注册->page.register
  /**
   * 页面的初始数据
   */
  data: {
    fileList: [],
    projectName: '',
    orientation: '',
    request: '',
    period: '',
    detail: '',
    openid: '',
    page_view: 0,
    show: false,
    show_reg: false
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
  uploadToCloud() {
    wx.cloud.init();
    const {
      fileList
    } = this.data;
    if (!fileList.length) {
      wx.showToast({
        title: '请选择图片',
        icon: 'none'
      });
    } else {
      const uploadTasks = fileList.map((file, index) => this.uploadFilePromise(`my-photo${index}.png`, file));
      Promise.all(uploadTasks)
        .then(data => {
          wx.showToast({
            title: '上传成功',
            icon: 'none'
          });
          const newFileList = data.map(item => {
            url: item.fileID
          });
          this.setData({
            cloudPath: data,
            fileList: newFileList
          });
        })
        .catch(e => {
          wx.showToast({
            title: '上传失败',
            icon: 'none'
          });
          console.log(e);
        });
    }
  },

  uploadFilePromise(fileName, chooseResult) {
    return wx.cloud.uploadFile({
      cloudPath: fileName,
      filePath: chooseResult.url
    });
  },

  afterRead(event) {
    const { file } = event.detail;
    console.log(app.globalData.userInfo)
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.cloud.uploadFile({
      cloudPath: 'profile_img/' + this.data.projectName, 
      filePath: file.url,
      success(res) {
        // 上传完成需要更新 fileList
        console.log('已上传',res)
        this.setData({
          url: res.fileID
        })
        const { fileList = [] } = this.data;
        fileList.push({ ...file, url: res.data });
        this.setData({ fileList });
      },fail(res){
        console.log(res)
      }
    });
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
          url : this.data.url,
          date: date,
          page_view: 0
        }
      })
      .then(res => {
        console.log("调用usrpost成功", res)
      }).catch(console.error)
    wx.navigateTo({
      url: "/pages/library/library",
    })
  },

  dialogClose_reg(event) {
    this.setData({
      show_reg: false
    })
    wx.navigateTo({
      url: "/pages/index/index",
    })
  },

  dialogConfirm_reg(event) {
    this.setData({
      show_reg: false
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
    //判断是否登陆
    wx.cloud.callFunction({
        name: "isUser",
        data: {
          openid: this.data.openid
        }
      })
      .then(res => {
        console.log("用户登陆状态：", res.result.data.length)
        if (res.result.data.length == 0) {
          //跳转至注册
          this.setData({
            show_reg: true
          })
        }
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