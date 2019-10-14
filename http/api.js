const {
  menus,
  createOrder
} = require('./apiUrls.js');

function get(url) {
  return new Promise(function(resolve, reject) {
    wx.request({
      method: 'get',
      url,
      success: function(res) {
        resolve([null, res])
      },
      fail: reject
    });
  }).catch((err) => {
    return [err, null];
  });
}

function post(url, data) {
  return new Promise(function(resolve, reject) {
    wx.request({
      method: 'post',
      url,
      data,
      success: function(res) {
        resolve([null, res])
      },
      fail: reject
    });
  }).catch((err) => {
    return [err, null];
  });
}

async function getMenus() {
  const [err, res] = await get(menus);
  return res.data.data;
}

async function _createOrder(table, ids) {
  const [err, res] = await post(createOrder, {
    ids,
    table
  });
  return res.data.data;
}


module.exports = {
  get,
  post,
  getMenus,
  createOrder: _createOrder
}