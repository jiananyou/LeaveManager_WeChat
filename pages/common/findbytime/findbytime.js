let app = getApp()
const requestMap = app.globalData.requestMap
Page({
   data: {
      start_time: '2019-11-24',
      end_time: '2019-11-24',
      show: false,
      vacateList: []
   },
   startTimeChange(e) {
      this.setData({
         start_time: e.detail.value
      })
   },
   endTimeChange(e) {
      this.setData({
         end_time: e.detail.value
      })
   },
   formSubmit: function(e) {
      var _this = this
      var identity = app.globalData.identity
      var user = wx.getStorageSync("user")
      var start_time = this.data.start_time
      var end_time = this.data.end_time
      if (identity == '学生') {
         wx.request({
            url: requestMap + '/LeaveManager/student/find_byTime',
            data: ({
               stu_id: user.stu_id,
               start_time: start_time,
               end_time: end_time
            }),
            success: function(res) {
               console.log(res.data);
               wx.setStorageSync("vacateList", res.data);
               _this.setData({
                  vacateList: res.data
               })
               _this.showList();
            }
         })
      } else if (identity == '辅导员') {
         wx.request({
            url: requestMap + '/LeaveManager/tutor/find_byTime',
            data: ({
               tutor_id: user.tutor_id,
               start_time: start_time,
               end_time: end_time
            }),
            success: function(res) {
               console.log(res.data);
               wx.setStorageSync("vacateList", res.data);
               _this.setData({
                  vacateList: res.data
               })
               _this.showList();
            }
         })
      } else if (identity == '学院') {
         wx.request({
            url: requestMap + '/LeaveManager/edu/find_byTime',
            data: ({
               edu_id: user.edu_id,
               start_time: start_time,
               end_time: end_time
            }),
            success: function (res) {
               console.log(res.data);
               wx.setStorageSync("vacateList", res.data);
               _this.setData({
                  vacateList: res.data
               })
               _this.showList();
            }
         })
      } else {
         wx.request({
            url: requestMap + '/LeaveManager/teacher/find_byTime',
            data: ({
               teacher_id: user.teacher_id,
               start_time: start_time,
               end_time: end_time
            }),
            success: function (res) {
               console.log(res.data);
               wx.setStorageSync("vacateList", res.data);
               _this.setData({
                  vacateList: res.data
               })
               _this.showList();
            }
         })
      }
   },
   showList() {
      this.setData({
         show: true
      })
   },
   getInfo(e) {
      var index = e.currentTarget.dataset.index;
      wx.navigateTo({
         url: '../info/info?index=' + index,
      })
   },
})