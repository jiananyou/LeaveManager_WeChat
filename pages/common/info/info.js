let app = getApp()
const requestMap = app.globalData.requestMap
Page({
   data: {
      identity: '',
      waitIcon: 'radioboxfill',
      passIcon: 'roundcheckfill',
      nopassIcon: 'roundclosefill',
      stepList: ['辅导员', '教务部门', '老师'],
      vacateList: [],
      index: 0, //请假申请记录索引
      show: 0,
      status: 0,
      step: 0,
      stu_name: '',
      submit_time: '',
      start_time: '',
      end_time: '',
      period: 0,
      type: '',
      result: '',
      course_list: []
   },
   accept() {
      var _this = this
      var identity = app.globalData.identity
      var user = wx.getStorageSync("user")
      var index = this.data.index
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
            success: function(res) {
               console.log(res.data)
               wx.setStorageSync("vacateList", res.data)
               wx.navigateBack({
                  delta: 1
               })
            }
         })
      } else if (identity == '学院') {
         wx.request({
            url: requestMap + '/LeaveManager/edu/accept',
            data: ({
               edu_id: user.edu_id,
               vacate_id: vacate_id
            }),
            success: function(res) {
               console.log(res.data)
               wx.setStorageSync("vacateList", res.data)
               wx.navigateBack({
                  delta: 1
               })
            }
         })
      } else {

      }

   },
   refuse() {
      var _this = this
      var identity = app.globalData.identity
      var user = wx.getStorageSync("user")
      var index = this.data.index
      var vacateList = this.data.vacateList
      var vacate_id = vacateList[index].vacate_id
      if (identity == '辅导员') {
         wx.request({
            url: requestMap + '/LeaveManager/tutor/refuse',
            data: ({
               tutor_id: user.tutor_id,
               vacate_id: vacate_id
            }),
            success: function(res) {
               console.log(res.data)
               wx.setStorageSync("vacateList", res.data)
               wx.navigateBack({
                  delta: 1
               })
            }
         })
      } else if (identity == '学院') {
         wx.request({
            url: requestMap + '/LeaveManager/edu/refuse',
            data: ({
               edu_id: user.edu_id,
               vacate_id: vacate_id
            }),
            success: function(res) {
               console.log(res.data)
               wx.setStorageSync("vacateList", res.data)
               wx.navigateBack({
                  delta: 1
               })
            }
         })
      } else {

      }
   },
   onLoad: function(options) {
      var identity = app.globalData.identity
      var index = options.index
      var show = options.show
      var vacateList = wx.getStorageSync("vacateList")
      var status = vacateList[index].status
      var step = vacateList[index].step
      var stu_name = vacateList[index].stu_name
      var submit_time = vacateList[index].submit_time
      var start_time = vacateList[index].start_time
      var end_time = vacateList[index].end_time
      var period = vacateList[index].period
      var type = vacateList[index].type
      var result = vacateList[index].result
      var course_list = vacateList[index].course_list
      this.setData({
         identity: identity,
         index: index,
         show: show,
         status: status,
         vacateList: vacateList,
         step: step,
         stu_name: stu_name,
         submit_time: submit_time,
         start_time: start_time,
         end_time: end_time,
         period: period,
         type: type,
         result: result,
         course_list: course_list.split(",")
      })
      if (identity == '老师') {
         var user = wx.getStorageSync("user")
         var vacate_id = vacateList[index].vacate_id
         wx.request({
            url: requestMap + '/LeaveManager/teacher/update_readVacate',
            data: ({
               vacate_id: vacate_id,
               teacher_id: user.teacher_id
            }),
            success: function(res) {
               console.log(res.data)
               wx.setStorageSync("vacateList", res.data)
            }
         })
      }
   }
})