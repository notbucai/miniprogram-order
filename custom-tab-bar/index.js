Component({
  data: {
    ishide: false,
    active: 0,
    list: [{
        icon: 'home-o',
        text: '首页',
        url: '/pages/index/index'
      },
      {
        icon: 'orders-o',
        text: '订单',
        url: '/pages/order/index'
      },
      {
        icon: 'user-o',
        text: '我的',
        url: '/pages/mine/index'
      }
    ]
  },

  methods: {
    onChange(event) {
      wx.switchTab({
        url: this.data.list[event.detail].url
      });
      this.setData({
        active: event.detail
      });
    },

    init() {
      const page = getCurrentPages().pop();
      this.setData({
        active: this.data.list.findIndex(item => item.url === `/${page.route}`)
      });
      this.setData({
        ishide: false
      });
    },

    hide() {
      this.setData({
        ishide:true
      });
    }
  }
});