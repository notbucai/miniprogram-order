// pages/settlement/index.js
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: '1',
    money: 0,
    order_id: "loading",
    list: [],
    createTime: (new Date()).toLocaleString(),
    isLoad: false
  },
  // 修改付款方式
  onChange({
    detail
  }) {
    this.setData({
      type: detail
    });
  },

  // 提交付款
  onSubmit() {
    const {
      type
    } = this.data;

    this.setData({
      isLoad: true
    });
    if (type === '1') {
      this._handleOnlinePay();
    } else if (type === '2') {
      this._handleOfflinePay();
    }
    setTimeout(() => {

      this.setData({
        isLoad: false
      });
      // 如果支付成功就跳转到结算的订单页面

    }, 1000);
  },

  // 在线支付
  _handleOnlinePay() {
    // TODO 在线支付，后端结算单子返回前端
    // Toast('TODO 在线支付，后端结算单子返回前端');

    const f = Dialog.confirm({
      title: '模拟',
      message: '模拟付款'
    });
    console.log(f);
    f.then(() => {
      // 付款成功 的操作
      Toast('TODO 付款成功 的操作');
      this._handleGoSuccess();
    }).catch(() => {
      // 取消付款 的操作
      Toast('TODO 取消付款 的操作');
    });
  },

  // 到店支付
  _handleOfflinePay() {
    // TODO 前端简单结算单子，发送后端
    Toast('TODO 前端简单结算单子，发送后端');
    this._handleGoSuccess();
  },
  // 付款成功跳转到付款成功界面
  _handleGoSuccess() {
    wx.redirectTo({
      url: "/pages/successful/index"
    });
  },
  // 失败跳转到点餐页面
  _handleGoBack() {
    wx.navigateBack();
  },

  _init({
    money,
    order_id,
    list,
    createTime
  }) {
    this.setData({
      money,
      order_id,
      list,
      createTime: new Date(createTime).toLocaleString()
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('data', ({
      data
    }) => {
      this._init(data);
    });
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