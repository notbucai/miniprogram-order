# 不才微信小程序点餐系统
微信小程序扫码点餐，欢迎大家踊跃提交贡献代码。  
使用说明和常见问题，可参阅下面的说明，如还有疑问，请联系 WX: `wuxin-liao`。  

## 扫码体验
<img src="./show/er.png" width="200px">

## 原型

### `点餐`
点击扫码 -> 调出微信二维码api -> 扫描对应带参数的小程序码 -> 得到结果，解析参数对应桌号 -> 跳转到点餐页面 -> 开始添加到购物车

### `提交订单/结账`

用户 -> 添加到购物车 -> 点击提交将购物车商品的ids发送到后端 -> 后台计算金额 -> 返回订单号和金额 -> 跳转到指定页面 -> 结算 -> 付款

### `用户订单列表`
获取订单号列表(钱/订单号/创建时间/付款时间/是否完成)

### `订单对应的商品列表`
通过订单号获取到付款的商品id，再获取商品信息

## 接口 & 后台声明
本项目为小程序商城纯前端项目，由于人力和精力所限，本项目并未有开发配套的后台系统，而是直接使用了 [easy-mock](http://easy-mock.ncgame.cc/) 模拟的数据，可以完全满足本项目的所有功能需求。  

* [easy-mock](http://easy-mock.ncgame.cc/)

## 使用说明

> git clone https://github.com/wuxinweb/miniprogram-order.git    
> cd miniprogram-order   
> 打开小程序开发工具 > 导入项目  

## 展示

<img src="./show/1.png" width="240px"> | <img src="./show/2.png" width="240px">

<img src="./show/3.png" width="240px"> ｜ <img src="./show/4.png" width="240px">  
 <img src="./show/5.png" width="240px">
