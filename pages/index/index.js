// pages/mine/mine.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        statusBarHeight: '',
        navBarHeight: '',
        longitude: '',  // 初始经度（北京天安门）
        latitude: '',
        scale: 3,
        markers: [],
        address: '',

    },
    // 获取用户位置
    getLocation() {
        wx.getLocation({
            type: 'wgs84',  // 坐标系类型（默认wgs84，可选gcj02）
            success: (res) => {
                console.log(res, 'res')
                const {longitude, latitude} = res;
                this.setData({
                    longitude,
                    latitude,
                    markers: [{
                        id: 1,
                        longitude,
                        latitude,
                        title: '我的位置',
                        iconPath: '/images/marker.png',  // 自定义标记图标
                        width: 30,
                        height: 30,
                        label: {
                            content: '加载中...',
                            color: '#000',
                            fontSize: 12,
                            bgColor: 'rgba(255,255,255,0.8)',
                            borderRadius: 4,
                            padding: 6,
                            anchorX: 0,    // 横向居中（基于图标中心）
                            anchorY: -40   // 纵向偏移（正值向下，负值向上）
                        }
                    }]
                });
                this.reverseGeocoding(longitude, latitude);
                this.mapContext = wx.createMapContext('myMap', this);
                this.mapContext.includePoints({
                    points: [{longitude, latitude}],
                    padding: [40, 40, 40, 40],  // 上右下左内边距（控制视野范围）
                    success: (res) => {
                        this.setData({scale: 19});
                    }
                });
                this.mapContext.moveToLocation({
                    longitude: this.data.longitude,
                    latitude: this.data.latitude,
                    duration: 1000 // 平滑过渡动画
                });

            },
            fail: (err) => {
                wx.showToast({title: '定位失败，请授权', icon: 'none'});
                wx.openSetting({
                    success: (res) => {
                        if (res.authSetting['scope.userLocation']) this.getLocationAndAdjustView();
                    }
                });
            }
        });
    },
    // 逆地址解析
    reverseGeocoding(longitude, latitude) {
        const key = '6CTBZ-N4QCL-FYBP7-EYZIO-KLDLS-7EFB4';
        const url = `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${key}`;

        wx.request({
            url,
            success: (res) => {
                if (res.data.status === 0) {
                    const address = res.data.result.address; // 获取完整地址
                    const formattedAddress = res.data.result.formatted_addresses.recommend; // 推荐地址
                    this.setData({
                        'markers[0].label': {
                            content: formattedAddress || address,  // 先留空
                            color: '#000',
                            fontSize: 12,
                            bgColor: 'rgba(255,255,255,0.8)',
                            borderRadius: 4,
                            padding: 6,
                            anchorX: -60,   // 横向居中
                            anchorY: -70  // 调整到图标上方
                        }
                    });
                } else {
                    console.error('逆地址解析失败', res.data);
                    wx.showToast({
                        title: '获取地址失败',
                        icon: 'none',
                    });
                }
            },
            fail: (err) => {
                console.error('逆地址解析请求失败', err);
                wx.showToast({
                    title: '请求失败',
                    icon: 'none',
                });
            },
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.getLocation();
        const app = getApp()

        // 直接访问 globalData.headerInfo
        const {statusBarHeight, navBarHeight} = app.globalData.headerInfo
        this.setData({
            statusBarHeight,
            navBarHeight,
        })
        console.log(statusBarHeight, navBarHeight);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {
    },
})