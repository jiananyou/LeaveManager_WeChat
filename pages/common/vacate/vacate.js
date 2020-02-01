let app = getApp()
const requestMap = app.globalData.requestMap
const util = require('../../../utils/util.js')
Page({
   data: {
      stu_id: '',
      start_time: '请选择开始时间',
      end_time: '请选择结束时间',
      index: '',
      type: ["病假", "事假", "学院学生辅助工作", "其他"],
      course_list: [],
      showMessage: false,
      message: '表单信息未填写完整!',
      recycle: []
   },
   startTimeChange(e) {
      this.setData({
         start_time: e.detail.value
      })
   },
   endTimeChange(e) {
      var end_time = e.detail.value
      this.setData({
         end_time: end_time
      })
      var _this = this;
      var user = wx.getStorageSync("user");
      var start_time = this.data.start_time
      if (end_time >= start_time) {
         wx.request({
            url: requestMap + '/LeaveManager/student/find_course',
            data: ({
               start_time: start_time,
               end_time: end_time,
               course_list: user.course_list
            }),
            success: function (res) {
               console.log(res.data);
               if (res.data != '') {
                  _this.setData({
                     course_list: res.data
                  })
               }
            }
         })
      } else {
         this.setData({
            course_list: ''
         })
      }
   },
   typeChange(e) {
      this.setData({
         index: e.detail.value
      })
   },
   hideMessage() {
      this.setData({
         showMessage: false
      })
   },
   formSubmit: function(e) {
      var index = e.detail.target.dataset.index;
      if (index == 1) {    // 提交申请
         var _this = this
         var user = wx.getStorageSync("user")
         console.log(user)
         var id = e.detail.value['id']
         var start_time = this.data.start_time
         var end_time = this.data.end_time
         var i = this.data.index
         var type = this.data.type[i]
         var result = type == '其他' ? e.detail.value['result'] : ''
         var course_list = this.data.course_list
         if (start_time.length == 7 || end_time.length == 7 || type == '') {
            this.setData({
               showMessage: true
            })
         } else if (end_time < start_time) {
            this.setData({
               message: '结束时间应当晚于开始时间！',
               showMessage: true
            })
         } else {
            wx.request({
               url: requestMap + '/LeaveManager/student/add_vacate',
               data: ({
                  id: id,
                  stu_name: user.name,
                  grade_id: user.grade_id,
                  submit_time: util.formatTime(new Date()),
                  start_time: start_time,
                  end_time: end_time,
                  type: type,
                  result: result,
                  course_list: course_list
               }),
               success: function (res) {
                  console.log(res.data);
                  if (res.data != '') {
                     wx.navigateBack({
                        delta: 1
                     })
                  }
               }
            })
         }
      } else if (index == 2) {   // 放入回收站
         var recycle = this.data.recycle
         var length = recycle.length
         var item = new Object()
         item.id = e.detail.value['id']
         item.start_time = this.data.start_time
         item.end_time = this.data.end_time
         item.type = this.data.type[this.data.index]
         item.result = item.type == '其他' ? e.detail.value['result'] : ''
         item.course_list = this.data.course_list
         if (length != 0) {
            recycle[recycle.length] = item
            wx.setStorageSync("recycle", recycle)
         } else {
            var recycle = new Array()
            recycle[0] = item
            wx.setStorageSync("recycle", recycle)
         }
         wx.navigateBack({
            delta: 1
         })
      }
   },
   onLoad: function (options) {
      var user = wx.getStorageSync("user")
      var recycle = wx.getStorageSync("recycle")
      this.setData({
         stu_id: user.stu_id,
         recycle: recycle
      })
   },
})