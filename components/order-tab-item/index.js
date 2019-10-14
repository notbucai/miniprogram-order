// components/order-tab-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    icon: String,
    text: String,
    className: String,
    active: Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleSelectedTab(index) {
      console.log(index);
    },
  }
})