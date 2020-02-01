Page({
   data: {
      elements: [{
         title: '按时间段查询',
         name: 'time',
         color: 'mauve',
         icon: 'time',
         bindFunc: 'findByTime'
      }, {
         title: '按学期查询',
         name: 'term',
         color: 'purple',
         icon: 'cascades',
         bindFunc: 'findByTerm'
      }, {
         title: '按请假原因查询',
         name: 'result',
         color: 'brown',
         icon: 'question',
         bindFunc: 'findByType'
      }]
   },
   findByTime() {
      wx.navigateTo({
         url: '/pages/common/findbytime/findbytime'
      })
   },
   findByTerm() {
      wx.navigateTo({
         url: '/pages/common/findbyterm/findbyterm'
      })
   },
   findByType() {
      wx.navigateTo({
         url: '/pages/common/findbytype/findbytype'
      })
   }
})