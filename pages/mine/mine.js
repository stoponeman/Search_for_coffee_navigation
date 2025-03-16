// pages/mine/mine.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        statusBarHeight: 0,
        userInfo: null,
        phoneNumber: '',
        functionList: [
            {
                id: 1,
                name: '我的行程',
                icon: '/images/trip.png'
            },
            {
                id: 2,
                name: '开发票',
                icon: '/images/invoice.png'
            },
            {
                id: 3,
                name: '任务中心',
                icon: '/images/task.png'
            },
            {
                id: 4,
                name: '客服中心',
                icon: '/images/service.png'
            },
            {
                id: 5,
                name: '安全中心',
                icon: '/images/security.png'
            },
            {
                id: 6,
                name: '平台协议',
                icon: '/images/agreement.png'
            },
            {
                id: 7,
                name: '设置',
                icon: '/images/settings.png'
            },
            {
                id: 8,
                name: '个性装扮',
                icon: '/images/customize.png'
            },
            {
                id: 9,
                name: '学生专区',
                icon: '/images/student.png',
                extra: '学生专属 超多优惠'
            },
            {
                id: 10,
                name: '我的客服',
                icon: '/images/student.png',
                extra: '客服24小时在线'
            }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        // 获取状态栏高度
        const systemInfo = wx.getSystemInfoSync();
        this.setData({
            statusBarHeight: systemInfo.statusBarHeight
        });

        // 检查是否有缓存的用户信息
        const userInfo = wx.getStorageSync('userInfo');
        const phoneNumber = wx.getStorageSync('phoneNumber');
        if (userInfo) {
            this.setData({
                userInfo: userInfo,
                phoneNumber: phoneNumber
            });
        }
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

    // 查看会员权益
    checkRights() {
        wx.navigateTo({
            url: '/pages/rights/rights'
        });
    },

    // 处理功能项点击
    handleFunctionClick(e) {
        const {id} = e.currentTarget.dataset;
        // 根据id处理不同功能的跳转
        switch (id) {
            case 1: // 我的行程
                wx.navigateTo({url: '/pages/trips/trips'});
                break;
            case 2: // 开发票
                wx.navigateTo({url: '/pages/invoice/invoice'});
                break;
            // ... 其他功能项的处理
        }
    },

    // 获取用户信息
    getUserProfile() {
        wx.getUserProfile({
            desc: '用于完善会员资料',
            success: (res) => {
                this.setData({
                    userInfo: res.userInfo
                });
                // 缓存用户信息
                wx.setStorageSync('userInfo', res.userInfo);
                // 获取手机号码
                this.getPhoneNumber();
            },
            fail: (err) => {
                wx.showToast({
                    title: '获取用户信息失败',
                    icon: 'none'
                });
            }
        });
    },

    // 获取手机号码
    getPhoneNumber() {
        // 这里模拟获取手机号的过程
        // 实际开发中需要调用微信的获取手机号接口
        wx.showModal({
            title: '提示',
            content: '是否使用微信绑定的手机号？',
            success: (res) => {
                if (res.confirm) {
                    const phoneNumber = '150****7661'; // 这里应该是真实的手机号获取逻辑
                    this.setData({
                        phoneNumber: phoneNumber
                    });
                    wx.setStorageSync('phoneNumber', phoneNumber);
                }
            }
        });
    },

    // 退出登录
    logout() {
        wx.showModal({
            title: '提示',
            content: '确定要退出登录吗？',
            success: (res) => {
                if (res.confirm) {
                    // 清除用户信息
                    wx.removeStorageSync('userInfo');
                    wx.removeStorageSync('phoneNumber');
                    this.setData({
                        userInfo: null,
                        phoneNumber: ''
                    });
                }
            }
        });
    }
})