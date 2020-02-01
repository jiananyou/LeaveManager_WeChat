let app = getApp()
const requestMap = app.globalData.requestMap
Page({
   data: {
      identity: '',
      vacateList: []
   },
   getInfo(e) {
      var index = e.currentTarget.dataset.index;
      wx.navigateTo({
         url: '../info/info?index=' + index + '&show=1',
      })
   },
   accept(e) {
      var _this = this
      var identity = app.globalData.identity
      var user = wx.getStorageSync("user")
      var index = e.currentTarget.dataset.index
      var vacateList = this.data.vacateList
      var vacate_id = vacateList[index].vacate_id
      if (identity == '辅导员') {
         wx.request({
            url: requestMap + '/LeaveManager/tutor/accept',
            data: ({
               tutor_id: user.tutor_id,
               edu_id: user.edu_id,
               vacate_id: vacate_id
            }),
            success: function (res) {
               console.log(res.data)
               wx.setStorageSync("vacateList", res.data)
               _this.onShow()
            }
         })
      } else if (identity == '学院') {
         wx.request({
            url: requestMap + '/LeaveManager/edu/accept',
            data: ({
               edu_id: user.edu_id,
               vacate_id: vacate_id
            }),
            success: function (res) {
               console.log(res.data)
               wx.setStorageSync("vacateList", res.data)
               _this.onShow()
            }
         })
      }
   },
   refuse(e) {
      var _this = this
      var identity = app.globalData.identity
      var user = wx.getStorageSync("user")
      var index = e.currentTarget.dataset.index
      var vacateList = this.data.vacateList
      var vacate_id = vacateList[index].vacate_id
      if (identity == '辅导员') {
         wx.request({
            url: requestMap + '/LeaveManager/tutor/refuse',
            data: ({
               tutor_id: user.tutor_id,
               vacate_id: vacate_id
            }),
            success: function (res) {
               console.log(res.data)
               wx.setStorageSync("vacateList", res.data)
               _this.onShow()
            }
         })
      } else if (identity == '学院') {
         wx.request({
            url: requestMap + '/LeaveManager/edu/refuse',
            data: ({
               edu_id: user.edu_id,
               vacate_id: vacate_id
            }),
            success: function (res) {
               console.log(res.data)
               wx.setStorageSync("vacateList", res.data)
               _this.onShow()
            }
         })
      }
   },
   onShow: function() {
      var vacateList = wx.getStorageSync("vacateList")
      var identity = app.globalData.identity
      this.setData({
         identity: identity,
         vacateList: vacateList
      })
   }
})