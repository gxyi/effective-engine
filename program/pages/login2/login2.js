// pages/login2/login2.js
Page({
  data:{
    phone:'',
    password:''
  },
  //获取用户的手机号
  getPhone(e){
    console.log(e.detail.value)
    this.setData({
      phone:e.detail.value
    })
  },
  //获取用户的手机号
  getPsw(e){
    console.log(e.detail.value)
    this.setData({
      password:e.detail.value
    })
  },
  //点击了登录
  login(){
    let phone = this.data.phone
    let password = this.data.password
    // 没有输入手机号提示
    if(!phone){
      wx.showToast({
        icon:'error',
        title: '请输入手机号',
      })
      return
    }
    // 没有输入密码提示
    if(!password){
      wx.showToast({
        icon:'error',
        title: '请输入密码',
      })
      return
    }
    console.log('phone==',phone)
    console.log('password==',password)
    wx.cloud.database().collection('user')
      .where({
        phone,
        password
      }).get().then(res => {
        console.log('登录的结果',res)
        // 登陆成功提示
        if(res.data&&res.data.length > 0){
          wx.setStorageSync('user', res.data[0])
          wx.showToast({
            title: '登录成功',
          })
          // 时间延迟1秒，回到个人页面
          setTimeout(()=>{
            wx.navigateBack({
              delta: 0,
            })
          },1000);
        }else{
          // 登录失败提示
          wx.showToast({
            icon:'error',
            title: '账号或密码错误',
          })
        }
      })
  },


  //转到注册页面
  register(){
    wx.navigateTo({
      url: '/pages/register/register',
    })
  }
})