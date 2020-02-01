let app = getApp()
Page({
   data: {
      name: '',
      id: ''
   },
   logout() {
      wx.reLaunch({
         url: '../login/login',
      })
   },
   changepwd() {
      wx.navigateTo({
         url: '../changepwd/changepwd',
      })
   },
   onLoad: function(options) {
      var identity = app.globalData.identity
      var name = wx.getStorageSync("user").name
      var id
      if (identity == '学生') {
         id = wx.getStorageSync("user").stu_id
      } else if (identity == '辅导员') {
         id = wx.getStorageSync("user").tutor_id
      } else if (identity == '学院') {
         name = '学院教务部门'
         id = wx.getStorageSync("user").edu_id
      } else {
         id = wx.getStorageSync("user").teacher_id
      }
      this.setData({
         name: name,
         id: id
      })
   }
})