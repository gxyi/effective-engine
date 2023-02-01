Page({
  data: {
    userInfo: ''
    
  },
  //获取本地缓存
  onLoad() {
    let user = wx.getStorageSync('user')
    console.log('进入小程序的index页面获取缓存', user)
    this.setData({
      userInfo: user
    })
  },
  // 授权登录
  login() {
    wx.getUserProfile({
      desc: '必须授权才可以继续使用',
      success:(res)=> {
        let user = res.userInfo
        // 把用户信息缓存到本地
        wx.setStorageSync('user', user)
        console.log("用户信息", user)
        this.setData({
          userInfo: user
        })
        // 登录成功提示
        wx.showToast({
          title: '登录成功',
          icon:'success',
          duration:2000
        })
      },
      fail: res => {
        wx.showToast({
          title: '授权失败',
          icon:'error',
          duration:2000
        })
        console.log('授权失败', res)
      }
    })
  },
  // 退出登录
  loginOut() {
    // this.setData({
    //   userInfo: ''
    // })
    var that=this
    wx.showModal({
      title:'温馨提示',
      content:'确定要退出登录吗？',
      success(res){
        if(res.confirm){
          that.setData({
            userInfo:null
          })
    //释放本地缓存
    wx.setStorageSync('user', null)
    wx.showToast({
      title: '退出成功',
      icon:'success',
      duration:2000
         })
       }
     }
   })
 }
})