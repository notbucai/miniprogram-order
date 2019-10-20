// 
const {
  getMenus,
  createOrder
} = require('../../http/api.js');
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
    mainActiveIndex: 0,
    items: [],
    allItem: [],
    shopcart: [],
    showShopcart: false,
    stopSubmit: false,
    activeIds: {},
    money: 0,
    max: 2,
    listScrollToId: 'order_item_0'
  },
  // 初始化
  async _init() {
    if (parseInt(app.globalData.currentState) !== parseInt(app.globalData.currentState)) {
      wx.navigateBack();
      return;
    }
    if (!app.globalData.menus || !app.globalData.menus.length) {
      await app.app.globalData.menus();
    }
    this.setData({
      items: app.globalData.menus,
      shopcart: app.globalData.shopcart
    });
  },
  // 切换菜单
  handleSelectedTab({
    currentTarget
  }) {
    const index = currentTarget.dataset.index;
    this.setData({
      mainActiveIndex: index
    });

    this.orderItemScroll((nodesRefs) => {
      // console.log(this.data);
      this.setData({
        listScrollToId: nodesRefs[index].id
      });
      // nodesRefs[index].top
    });

  },
  // 全局事件
  handleGlobalEvent() {
    console.log(123);
  },
  // 计算总金额 如果可以最好是在服务器上计算后再替换这个价格
  handlCalculateMoney() {
    return this.data.shopcart.reduce((currentMoney, {
      count,
      detail
    }) => {
      return currentMoney + detail.price * 100 * count;
    }, 0);
  },
  // 导航跳转
  orderItemScroll(fn) {
    wx.createSelectorQuery().selectAll('.order_item').boundingClientRect(fn).exec();
  },
  // 跳转
  handleListScroll({
    detail
  }) {
    this.orderItemScroll((nodesRefs) => {
      const filterList = nodesRefs.filter(({
        top
      }) => {
        return top <= 0;
      });

      if (filterList && filterList.length) {
        this.setData({
          mainActiveIndex: filterList.length - 1
        });
      }
    });

  },

  // 商品的数量增加和减少
  handleGoodCart(num, {
    index,
    id
  }) {
    const cT = Date.now();
    const {
      items
    } = this.data;
    const itemIndex = items[index].children.findIndex(item => {
      return item.id === id;
    });
    const item = items[index].children[itemIndex];
    // 初始化
    item.count = item.count || 0;
    // 判断 
    if (num < 0) {
      if (item.count > 0) {
        item.count += num;
      }
    } else {
      item.count += num;
    }
    this._handleAddShopcart(item, id, index);
    // 计算钱 
    const money = this.handlCalculateMoney();
    this.setData({
      ['items[' + index + '].children[' + itemIndex + ']']: items[index].children[itemIndex],
      money
    });
    console.log(Date.now() - cT);
  },
  // 添加
  handleAdd({
    currentTarget
  }) {
    // console.log(currentTarget);
    this.handleGoodCart(1, currentTarget.dataset);
  },
  // 减少
  handleSub({
    currentTarget
  }) {
    this.handleGoodCart(-1, currentTarget.dataset);
  },
  // 添加到购物车
  _handleAddShopcart(item, id, index) {
    const {
      shopcart
    } = this.data;
    // 将商品添加到购物车
    let shopcartItemIndex = shopcart.findIndex(item => {
      return id === item.id;
    });

    if (shopcartItemIndex === -1) {
      shopcart.push({
        id: id,
        detail: item,
        count: item.count,
        order_index: index
      });
      shopcartItemIndex = shopcart.length - 1;
    } else {
      const shopcartItem = shopcart[shopcartItemIndex];
      shopcartItem.count = item.count;
    }
    if (item.count <= 0) {
      shopcart.splice(shopcartItemIndex, 1);
    }
    this.setData({
      shopcart
    });
  },
  // 展示购物车
  handleClickShowShopcart() {
    this.setData({
      showShopcart: !this.data.showShopcart
    });
  },
  // 清空购物车
  handleCloseShopcart() {
    const updatelist = {};
    this.data.shopcart.forEach(item => {
      item.detail.count = 0;
      const itemIndex = this.data.items[item.order_index].children.findIndex(_item => _item.id === item.id);
      updatelist['items[' + item.order_index + '].children[' + itemIndex + ']'] = item.detail;
    });

    this.setData({
      shopcart: [],
      ...updatelist
    });
  },

  // 提交
  async onSubmit() {
    app.globalData.shopcart = this.data.shopcart;
    // TODO 这里就可以发送请求
    this.setData({
      stopSubmit: true
    });
    // 提交之后返回金额和订单就可以跳转到付款界面了
    const ids = this.data.shopcart.map(item => item.id);
    const data = await createOrder(app.globalData.currentState, ids);
    this.setData({
      stopSubmit: false
    });
    wx.navigateTo({
      url: '/pages/settlement/index',
      events: {},
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('data', {
          data: data
        })
      }
    })
  },





  /**
   * 路由相关
   */


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function({
    table
  }) {
    if (!/[0-9]+/.test(table)) {
      Dialog.alert({
        title: '提示',
        message: '路由不匹配，请扫码对的二维码'
      }).then(() => {
        wx.switchTab({
          url: '/pages/index/index',
        });
      });
      return;
    }
        

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this._init();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

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