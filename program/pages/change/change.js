// pages/change/change.js
Page({
  data:{
  },
  onLoad(){
    let user=wx.getStorageSync('user')
    console.log('user',user)
    this.setData({
      user: user,
      name:user.nickName,
      avatarUrl:user.avatarUrl
    })
  },
  // 获取用户名字
  getName(e){
    console.log(e.detail.value)
    this.setData({
      name:e.detail.value
    })
  },
  //提交修改
  submit(){
    //判断用户有没有改name
    let user=this.data.user
    let name = this.data.name
    let avatarUrl = this.data.avatarUrl
    //昵称和头像都不修改 只修改昵称不修改头像 只修改头像不修改昵称 头像昵称都修改

    if(name == user.nickName && avatarUrl == user.avatarUrl){
      console.log('昵称和头像都不修改')
    }else if(name != user.nickName && avatarUrl == user.avatarUrl){
      console.log('只修改昵称不修改头像')
         wx.cloud.database().collection('user').doc(user._id)
            .update({
              data:{
                nickName:name
              }
            }).then(res => {
              console.log('修改结果',res)
              user.nickName = name
              wx.setStorageSync('user', user)
            })
            wx.showToast({
              title: '昵称修改成功',
            })
    }else{
      console.log('只修改头像不修改昵称')
      console.log('头像昵称都修改')
      //图片上传
      wx.showToast({
        title: '上传中',
      })
      wx.cloud.uploadFile({
        cloudPath: user._id + '-' + new Date().getTime() + '.png',
        filePath: avatarUrl, //文件路径
      }).then(res => {
        wx.hideLoading()
        console.log('头像上传结果',res)
        let fileID = res.fileID
        wx.cloud.database().collection('user').doc(user._id)
            .update({
              data:{
                avatarUrl:res.fileID,
                nickName: name
              }
            }).then(res => {
              wx.showToast({
                title: '提交成功',
              })
              console.log('更新头像的结果',res)
              user.avatarUrl = fileID
              user.nickName = name
              wx.setStorageSync('user', user)
            })        
      }).catch(error => {
        wx.hideLoading()
        console.log('上传失败',error)
      })
    }
  },



  //选择新的图片
  chooseImg(){
    wx.chooseMedia({
      count: 1, //选择一个文件
      mediaType: ['image'], //选择图片
      sizeType:['compressed'], //指定是压缩图
      sourceType: ['album', 'camera'], //从相册选择或者相机拍照
      success: (res) => {
        console.log('成功选择图片',res)
        this.setData({
          avatarUrl:res.tempFiles[0].tempFilePath
        })
      }
    })
  },
  onShareAppMessage(){

  }
})