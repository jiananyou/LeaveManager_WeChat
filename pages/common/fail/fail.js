Page({
   data: {
      identity: '',
      vacateList: []
   },
   getInfo(e) {
      var index = e.currentTarget.dataset.index;
      wx.navigateTo({
         url: '../info/info?index=' + index + '&show=0',
      })
   },
   onLoad: function (options) {
      var identity = wx.getStorageSync("identity");
      var vacateList = wx.getStorageSync("vacateList");
      this.setData({
         identity: identity,
         vacateList: vacateList
      })
   }
})