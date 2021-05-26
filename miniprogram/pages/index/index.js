// index.js
let index = 0 
Page({
  data:{
    list:{},
    selected: 0,
    switch_list:['推荐' , '最新'],
  },
  onLoad(){
    let that = this
    wx.cloud.database().collection("Projects")
    .get()
    .then(res => {
      console.log('index请求Projects成功', res.data)
      this.setData({
        list:res.data
      })
    })
    .catch(err =>{
      console.log('index请求Projects失败', err)
    })

    if(index == 0)
      this.getDataFromProjects_Recommond()
    else
      this.getDataFromProjects_NewTime()
  },
  onShow(){
    let that = this
    wx.cloud.database().collection("Projects")
    .get()
    .then(res => {
      console.log('onShow请求Projects成功', res.data)
      this.setData({
        list:res.data
      })
    })
    .catch(err =>{
      console.log('onShow请求Projects失败', err)
    })
  },
  //切换选择框
  selected:function(e){
    console.log(e)
    let that = this
    index = e.currentTarget.dataset.index
    console.log(index)
    if(index == 0){
      this.setData({
        selected:0
      })
      this.getDataFromProjects_Recommond()
    }
    if(index == 1){
      this.setData({
        selected:1
      })
      this.getDataFromProjects_NewTime()
    }
  },
  //跳转到项目详情页
  goDetail(e){
    console.log('点击了跳转到项目detail页面',e.currentTarget.dataset.id)
    wx.navigateTo({
      url: '/pages/project_detail/project_detail?id='+e.currentTarget.dataset.id,
    })
  },
//推荐排序
  getDataFromProjects_Recommond(){
    wx.cloud.database().collection("Projects")
    .limit(5)
    .orderBy("Page_View","desc")
    .get()
    .then(res=>{
      console.log("请求成功" , res.data)
      this.setData({
        "dataArray":res.data
      })
    })
  },
  //时间排序
  getDataFromProjects_NewTime(){
    wx.cloud.database().collection("Projects")
    .limit(5)
    .orderBy("Published_Time","desc")
    .get()
    .then(res=>{
      console.log("请求成功" , res.data)
      this.setData({
        "dataArray":res.data
      })
    })
  }

})
