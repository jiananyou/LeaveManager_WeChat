Page({
   data: {
      recycle: []
   },
   edit(e) {
      var index = e.currentTarget.dataset.index;
      wx.navigateTo({
         url: '../reedit/reedit?index=' + index,
      })
   },
   remove(e) {
      var index = e.currentTarget.dataset.index;
      var recycle = this.data.recycle;
      recycle.splice(index, 1);
      wx.setStorageSync("recycle", recycle);
      this.onShow();
   },
   onShow: function () {
      var recycle = wx.getStorageSync("recycle");
      this.setData({
         recycle: recycle
      })
   },
})
