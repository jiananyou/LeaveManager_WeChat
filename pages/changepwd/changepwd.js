let app = getApp()
const requestMap = app.globalData.requestMap
Page({
   data: {
      show: false,
      message: '两次输入密码不一致！'
   },
   hideDialog() {
      this.setData({
         show: false
      })
   },
   formSubmit: function(e) {
      var _this = this
      var pwd = e.detail.value['newPwd']
      var confirmPwd = e.detail.value['confirmPwd']
      var user = wx.getStorageSync('user')
      var identity = app.globalData.identity
      if (identity == '学生') {
         var id = user.stu_id
      } else if (identity == '辅导员') {
         var id = user.tutor_id
      } else if (identity == '学院') {
         var id = user.edu_id
      } else {
         var id = user.teacher_id
      }
      if (pwd != confirmPwd || pwd == '' || confirmPwd == '') {
         this.setData({
            show: true
         })
      } else {
         wx.request({
            url: requestMap + '/LeaveManager/changePwd',
            data: ({
               id: id,
               pwd: pwd,
               identity: identity
            }),
            success: function (res) {
               console.log(res.data);
               if (res.data != '') {
                  wx.setStorageSync("user", res.data);
                  wx.navigateBack({
                     delta: 1
                  })
               }
            }
         })
      }
   }
})