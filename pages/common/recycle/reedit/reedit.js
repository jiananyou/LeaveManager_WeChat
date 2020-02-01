let app = getApp()
const requestMap = app.globalData.requestMap
const util = require('../../../../utils/util.js')
Page({
   data: {
      start_time: '请选择开始时间',
      end_time: '请选择结束时间',
      index: '',
      type: ['病假', '事假', '学院学生辅助工作', '其他'],
      show_dialog: false,
      course_list: [],
      showMessage: false,
      message: '表单信息未填写完整!',
      recycle_index: '',
      recycle: [],
      vacate: ''
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
      var _this = this;
      var user = wx.getStorageSync("user");
      var id = e.detail.value['id'];
      var start_time = this.data.start_time
      var end_time = this.data.end_time
      var index = this.data.index;
      var type = this.data.type[index];
      var result = type == '其他' ? e.detail.value['result'] : '';
      var course_list = this.data.course_list
      if (id == '' || start_time == '' || end_time == '' || type == '') {
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
                  var recycle = _this.data.recycle;
                  recycle.splice(_this.data.recycle_index, 1);
                  wx.setStorageSync("recycle", recycle);
                  wx.navigateBack({
                     delta: 1
                  })
               }
            }
         })
      }
   },
   onLoad: function(options) {
      var recycle_index = options.index;
      var recycle = wx.getStorageSync("recycle");
      var vacate = recycle[recycle_index];
      var type = vacate.type;
      var index = type == '病假' ? 0 : (type == '事假' ? 1 : (type == '学院学生辅助工作' ? 2 : 3));
      this.setData({
         recycle_index: recycle_index,
         recycle: recycle,
         vacate: vacate,
         start_time: vacate.start_time,
         end_time: vacate.end_time,
         index: index,
         course_list: vacate.course_list
      })
   }
})