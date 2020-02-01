let app = getApp()
const requestMap = app.globalData.requestMap
Page({
   data: {
      index: '',
      term: ['2017-2018-2', '2018-2019-1', '2018-2019-2', '2019-2020-1'],
      show: false,
      vacateList: []
   },
   termChange(e) {
      this.setData({
         index: e.detail.value
      })
   },
   formSubmit: function(e) {
      var _this = this
      var identity = app.globalData.identity
      var user = wx.getStorageSync("user")
      var term = this.data.term[this.data.index]
      if (identity == '学生') {
         wx.request({
            url: requestMap + '/LeaveManager/student/find_byTerm',
            data: ({
               stu_id: user.stu_id,
               term: term
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
            url: requestMap + '/LeaveManager/tutor/find_byTerm',
            data: ({
               tutor_id: user.tutor_id,
               term: term
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
            url: requestMap + '/LeaveManager/edu/find_byTerm',
            data: ({
               edu_id: user.edu_id,
               term: term
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
            url: requestMap + '/LeaveManager/teacher/find_byTerm',
            data: ({
               teacher_id: user.teacher_id,
               term: term
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