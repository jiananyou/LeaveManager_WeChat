let app = getApp()
const requestMap = app.globalData.requestMap
Page({
   data: {
      index: '',  //用户身份picker索引
      identity: ['学生', '辅导员', '学院', '老师'],
      show: false,
      message: '用户名或密码错误!'
   },
   identityChange(e) {
      this.setData({
         index: e.detail.value
      })
   },
   hideDialog() {
      this.setData({
         show: false
      })
   },
   formSubmit: function(e) {
      var _this = this
      var id = e.detail.value['id']
      var pwd = e.detail.value['pwd']
      var index = _this.data.index
      var identity = _this.data.identity[index]
      app.globalData.identity = identity
      if (id != '' && pwd != '' && index != '') {
         wx.request({
            url: requestMap + '/LeaveManager/login',
            data: ({
               id: id,
               pwd: pwd,
               identity: identity
            }),
            success: function(res) {
               console.log(res.data);
               if (res.data != '') {
                  wx.setStorageSync("user", res.data);
                  wx.switchTab({
                     url: '../index/index'
                  })
               } else {
                  _this.setData({
                     show: true,
                     message: '用户名或密码错误!'
                  })
               }
            }
         })
      } else {
         if (id == '') {
            this.setData({
               show: true,
               message: '未输入用户名!'
            })
         } else if (pwd == '') {
            this.setData({
               show: true,
               message: '未输入密码!'
            })
         } else if (index == '') {
            this.setData({
               show: true,
               message: '未选择身份!'
            })
         }
      }
   }
})