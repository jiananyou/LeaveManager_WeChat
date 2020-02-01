App({
   onLaunch: function() {
      // wx.clearStorageSync()
      wx.getSystemInfo({
         success: e => {
            this.globalData.StatusBar = e.statusBarHeight;
            let custom = wx.getMenuButtonBoundingClientRect();
            this.globalData.Custom = custom;
            this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
         }
      })
   },
   globalData: {
      requestMap: 'http://127.0.0.1:8080',
      //requestMap: 'http://192.168.43.42:8080',
      identity: ''
   }
})