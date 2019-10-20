// pages/index/index.js
const {
  urlParamsParse
} = require('../../utils/util.js');
import Notify from '../../miniprogram_npm/vant-weapp/notify/notify';
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentState: null,

  },

  appInstance: app,
  orderPath: app.globalData.orderPath,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    // console.log(this.appInstance.globalData);
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.getTabBar().init();
    this.setData({
      currentState: this.appInstance.currentState
    });
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

  },
  _handleChangeState(state = null) {
    this.appInstance.globalData.currentState = state;
    this.setData({
      currentState: state
    });
  },
  _handleGoOrder(path) {
    if (path) {
      const parasms = urlParamsParse(path);

      if (parasms.table) {
        this._handleChangeState(parasms.table);
        console.log(this.orderPath, parasms.table);
        wx.navigateTo({
          url: '/' + this.orderPath + '?table=' + parasms.table,
        });
      } else {
        Notify({
          type: 'danger',
          message: '无法识别该码'
        });
      }
    } else {
      console.log(123);
      Notify({
        type: 'danger',
        message: '该码不是规定的码'
      });
    }
  },

  handleScanCode() {
    const slef = this;
    wx.scanCode({
      onlyFromCamera: true,
      success({
        path
      }) {
        slef._handleGoOrder(path);
      },
      fail(error) {
        console.log(error);
        Notify({
          type: 'primary',
          message: '放弃扫码'
        });
      }
    });
  }
})