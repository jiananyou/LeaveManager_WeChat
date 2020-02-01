let app = getApp()
const requestMap = app.globalData.requestMap
Page({
   data: {
      identity: '',
      showDialog: false
   },
   hideDialog() {
      this.setData({
         showDialog: false
      })
   },
   addVacate() {
      wx.navigateTo({
         url: '/pages/common/vacate/vacate'
      })
   },

   findPass() {
      var identity = this.data.identity
      if (identity == '学生') {
         wx.request({
            url: requestMap + '/LeaveManager/student/find_passVacate',
            data: ({
               stu_id: wx.getStorageSync("user").stu_id
            }),
            success: function(res) {
               console.log(res.data)
               wx.setStorageSync("vacateList", res.data)
               wx.navigateTo({
                  url: '/pages/common/pass/pass'
               })
            }
         })
      } else if (identity == '辅导员') {
         wx.request({
            url: requestMap + '/LeaveManager/tutor/find_passVacate',
            data: ({
               tutor_id: wx.getStorageSync("user").tutor_id
            }),
            success: function(res) {
               console.log(res.data)
               wx.setStorageSync("vacateList", res.data)
               wx.navigateTo({
                  url: '/pages/common/pass/pass'
               })
            }
         })
      } else if (identity == '学院') {
         wx.request({
            url: requestMap + '/LeaveManager/edu/find_passVacate',
            data: ({
               edu_id: wx.getStorageSync("user").edu_id
            }),
            success: function(res) {
               console.log(res.data)
               wx.setStorageSync("vacateList", res.data)
               wx.navigateTo({
                  url: '/pages/common/pass/pass'
               })
            }
         })
      } else {
         wx.request({
            url: requestMap + '/LeaveManager/teacher/find_passVacate',
            data: ({
               teacher_id: wx.getStorageSync("user").teacher_id
            }),
            success: function (res) {
               console.log(res.data)
               wx.setStorageSync("vacateList", res.data)
               wx.navigateTo({
                  url: '/pages/common/pass/pass'
               })
            }
         })
      }
   },

   findChecking() {
      var identity = this.data.identity
      if (identity == '学生') {
         wx.request({
            url: requestMap + '/LeaveManager/student/find_checkingVacate',
            data: ({
               stu_id: wx.getStorageSync("user").stu_id
            }),
            success: function(res) {
               console.log(res.data)
               wx.setStorageSync("vacateList", res.data)
               wx.navigateTo({
                  url: '/pages/common/checking/checking'
               })
            }
         })
      } else if (identity == '辅导员') {
         wx.request({
            url: requestMap + '/LeaveManager/tutor/find_checkingVacate',
            data: ({
               tutor_id: wx.getStorageSync("user").tutor_id
            }),
            success: function(res) {
               console.log(res.data)
               wx.setStorageSync("vacateList", res.data)
               wx.navigateTo({
                  url: '/pages/common/checking/checking'
               })
            }
         })
      } else if (identity == '学院') {
         wx.request({
            url: requestMap + '/LeaveManager/edu/find_checkingVacate',
            data: ({
               edu_id: wx.getStorageSync("user").edu_id
            }),
            success: function(res) {
               console.log(res.data)
               wx.setStorageSync("vacateList", res.data)
               wx.navigateTo({
                  url: '/pages/common/checking/checking'
               })
            }
         })
      } else {
         wx.request({
            url: requestMap + '/LeaveManager/teacher/find_checkingVacate',
            data: ({
               teacher_id: wx.getStorageSync("user").teacher_id
            }),
            success: function (res) {
               console.log(res.data)
               wx.setStorageSync("vacateList", res.data)
               wx.navigateTo({
                  url: '/pages/common/checking/checking'
               })
            }
         })
      }
   },

   findFail() {
      var identity = this.data.identity
      if (identity == '学生') {
         wx.request({
            url: requestMap + '/LeaveManager/student/find_failVacate',
            data: ({
               stu_id: wx.getStorageSync("user").stu_id
            }),
            success: function(res) {
               console.log(res.data)
               wx.setStorageSync("vacateList", res.data)
               wx.navigateTo({
                  url: '/pages/common/fail/fail'
               })
            }
         })
      } else if (identity == '辅导员') {
         wx.request({
            url: requestMap + '/LeaveManager/tutor/find_failVacate',
            data: ({
               tutor_id: wx.getStorageSync("user").tutor_id
            }),
            success: function(res) {
               console.log(res.data)
               wx.setStorageSync("vacateList", res.data)
               wx.navigateTo({
                  url: '/pages/common/fail/fail'
               })
            }
         })
      } else if (identity == '学院') {
         wx.request({
            url: requestMap + '/LeaveManager/edu/find_failVacate',
            data: ({
               edu_id: wx.getStorageSync("user").edu_id
            }),
            success: function(res) {
               console.log(res.data)
               wx.setStorageSync("vacateList", res.data)
               wx.navigateTo({
                  url: '/pages/common/fail/fail'
               })
            }
         })
      }
   },

   findRecycle() {
      wx.navigateTo({
         url: '/pages/common/recycle/trashbin/trashbin'
      })
   },
   onLoad: function(options) {
      var _this = this
      wx.showLoading({
         title: '加载中',
      })
      setTimeout(function() {
         var __this = _this
         var identity = app.globalData.identity
         _this.setData({
            identity: identity
         })
         if (identity == '辅导员') {
            wx.request({
               url: requestMap + '/LeaveManager/tutor/find_checkingVacate',
               data: ({
                  tutor_id: wx.getStorageSync("user").tutor_id
               }),
               success: function(res) {
                  if (res.data != '') {
                     __this.setData({
                        showDialog: true
                     })
                  }
               }
            })
         } else if (identity == '学院') {
            wx.request({
               url: requestMap + '/LeaveManager/edu/find_checkingVacate',
               data: ({
                  edu_id: wx.getStorageSync("user").edu_id
               }),
               success: function(res) {
                  if (res.data != '') {
                     __this.setData({
                        showDialog: true
                     })
                  }
               }
            })
         } else if (identity == '老师') {
            wx.request({
               url: requestMap + '/LeaveManager/teacher/find_checkingVacate',
               data: ({
                  teacher_id: wx.getStorageSync("user").teacher_id
               }),
               success: function (res) {
                  if (res.data != '') {
                     __this.setData({
                        showDialog: true
                     })
                  }
               }
            })
         }
         wx.hideLoading()
      }, 600)
   }
})