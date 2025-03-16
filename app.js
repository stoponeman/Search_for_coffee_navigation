// app.js
App({
    globalData: {
        headerInfo: null
    },
    onLaunch() {
        this.calculateHeader()
    },
    calculateHeader() {
        const systemInfo = wx.getSystemInfoSync()
        const menuButtonInfo = wx.getMenuButtonBoundingClientRect()
        this.globalData.headerInfo = {
            statusBarHeight: systemInfo.statusBarHeight,
            navBarHeight: (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height
        }
    }
})
