// pages/mine/index.js
const app = getApp();
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user: {}
  },

  // 获取配置中的手机号
  handleCallPhone() {
    wx.makePhoneCall({
      phoneNumber: app.globalData.config.phone,
      success() {},
      fail() {}
    })
  },
  handleShowInfo() {
    Dialog.alert({
      message: '不才点餐系统，是一个专业的点餐系统'
    }).then(() => {
      // on close
    });
  },

  handleGetSetting() {
    const that = this;
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              console.log(res);
              var userInfo = res.userInfo
              var nickName = userInfo.nickName
              var avatarUrl = userInfo.avatarUrl
              var gender = userInfo.gender //性别 0：未知、1：男、2：女
              var province = userInfo.province
              var city = userInfo.city
              var country = userInfo.country;
              that.handleUserInfo({
                detail: res
              });
            }
          });
        }
      }
    })
  },

  handleUserInfo({
    detail
  }) {
    this.setData({
      user: detail.userInfo
    });
  },
  handleGetInfo() {
    console.log("handleGetInfo")
    wx.getUserInfo({
      success: function(res) {
        console.log(res);
        that.setData({
          user: res
        });
      },
      fail(error) {
        console.log(error);
      }
    })
  },

  handleLogin() {
    console.log(123);
    this.handleGetSetting();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.handleGetSetting()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getTabBar().init();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})