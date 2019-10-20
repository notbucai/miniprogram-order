//app.js
const {
  getMenus
} = require('./http/api.js');
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(JSON.stringify(res));
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo;

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });

    this._handleGetMenus();
  },

  openSetting() {
    wx.openSetting({
      success(res) {
        console.log(res.authSetting)
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
      },
      fail(){
        console.log(123);
      }
    })
  },

  userInfoReadyCallback(res) {
    console.log(res);
  },
  // 加载数据
  async _handleGetMenus() {
    // http://easy-mock.ncgame.cc/mock/5c526e3466333b1c2a53255f/example/menus
    const data = await getMenus();
    this.globalData.menus = data;
  },
  globalData: {
    userInfo: null,
    currentState: null,
    orderPath: 'pages/menus/index',
    menus: [],
    shopcart: [],
    userinfo: null,
    // TODO: 可以通过后端获取
    config: {
      phone: "13700004559"
    }
  }
})