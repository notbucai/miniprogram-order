const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const urlParamsParse = (url) => {
  const params = {};
  const urlParse = url.replace(/(#(.*?)\?)|(#(.*?)$)/, '').split('?');
  let paramsSplit;

  if (urlParse.length !== 2) {
    return params;
  }

  paramsSplit = urlParse[1].split('&');

  paramsSplit.forEach(item=>{
    const [key,value] = item.split('=');
    params[key] = value;
  });

  return params;

}

module.exports = {
  formatTime: formatTime,
  urlParamsParse
}