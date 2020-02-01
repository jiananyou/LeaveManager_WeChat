let app = getApp()
const requestMap = app.globalData.requestMap
Page({
   data: {
      index: '',
      type: ["病假", "事假", "学院学生辅助工作", "其他"],
      show: false,
      vacateList: []
   },
   typeChange(e) {
      this.setData({
         index: e.detail.value
      })
   },
   formSubmit: function(e) {
      var _this = this;
      var identity = app.globalData.identity
      var user = wx.getStorageSync("user");
      var type = this.data.type[this.data.index];
      if (identity == '学生') {
         wx.request({
            url: requestMap + '/LeaveManager/student/find_byType',
            data: ({
               stu_id: user.stu_id,
               type: type
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
      } else if (identity == '辅导员') {
         wx.request({
            url: requestMap + '/LeaveManager/tutor/find_byType',
            data: ({
               tutor_id: user.tutor_id,
               type: type
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
      } else if (identity == '学院') {
         wx.request({
            url: requestMap + '/LeaveManager/edu/find_byType',
            data: ({
               edu_id: user.edu_id,
               type: type
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
            url: requestMap + '/LeaveManager/teacher/find_byType',
            data: ({
               teacher_id: user.teacher_id,
               type: type
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