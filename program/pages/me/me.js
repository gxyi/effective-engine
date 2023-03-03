// pages/me/me.js
Page({
  data: {
      user:{
      
      }
  },
  onShow: function (){
    // 取缓存
    let user=wx.getStorageSync('user')
    console.log('缓存的user',user)
    this.setData({
      user: user
    })
  },
  // 登录
  login(){
    wx.navigateTo({
      url: '/pages/login2/login2',
    })
  },
  //跳到修改资料页面
  change(){
    wx.navigateTo({
      url: '/pages/change/change',
    })
  },
  // 退出登录
  loginOut(){
    this.setData({
      user:null
    })
    // 清缓存
    wx.setStorageSync('user', null)
  },
  onShareAppMessage() {

  }
})