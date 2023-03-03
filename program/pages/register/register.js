Page({
  register(e){
    let item = e.detail.value
    console.log('phone',item.phone)
    console.log('password',item.password)
    console.log('name',item.name)
    if(!item.phone){
      wx.showToast({
        icon:'error',
        title: '请输入手机号',
      })
      return
    }
    if(!item.password){
      wx.showToast({
        icon:'error',
        title: '请输入密码',
      })
      return
    }
    if(!item.name){
      wx.showToast({
        icon:'error',
        title: '请输入姓名',
      })
      return
    }

    wx.cloud.database().collection('user').add({
      data:{
        _id:item.phone,
        phone:item.phone,
        password:item.password,
        nickName:item.name,
        avatarUrl:'/image/no_login2.png'
      }
    }).then(res=>{
      console.log('注册结果',res)

      wx.showToast({
        title: '注册成功',
      })
      setTimeout(()=>{
        wx.navigateBack({
          delta: 0,
        })
      },1000);
    }).catch(res=>{
      console.log('注册失败',res)
      wx.showToast({
        icon:'error',
        title: '手机号已注册过',
      })
    })
  }
})