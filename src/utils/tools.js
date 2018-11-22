function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
//获取当前时间 2019-02-12 12:00:00
function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
    + " " + date.getHours() + seperator2 + date.getMinutes()
    + seperator2 + date.getSeconds();
  return currentdate;
}
// function formatDateTime(dateStr) {
//   dateStr = dateStr.replace(/\-/g, "/");
//   var date = new Date(dateStr);
//   var month = date.getMonth() + 1
//   var day = date.getDate()

//   var hour = date.getHours()
//   var minute = date.getMinutes()

//   return [month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
// }

// //yyyy-MM-dd
// function formatDateTime(dateStr) {
//   dateStr = dateStr.replace(/\-/g, "/");
//   var date = new Date(dateStr);
//   var year = date.getFullYear()
//   var month = date.getMonth() + 1
//   var day = date.getDate()

//   var hour = date.getHours()
//   var minute = date.getMinutes()
//   var second = date.getSeconds()

//   return [year, month, day].map(formatNumber).join('-')
// }

//今天以前yyyy-MM-dd  今天 hh:mm
function formatDateTime(dateStr) {
  dateStr = dateStr.replace(/\-/g, "/");
  var date = new Date(dateStr);
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  var currentDate = new Date();
  //当前年
  var currentYear = currentDate.getFullYear()
  //当前月
  var currentMonth = currentDate.getMonth() + 1
  //当前日
  var currentDay = currentDate.getDate()

  //需要格式化的时间，就是当天
  if (year == currentYear && month == currentMonth && day == currentDay)
  {
    return  [hour, minute].map(formatNumber).join(':')
  }
  else
  {
    return [year, month, day].map(formatNumber).join('-')
  }
}

function getDate(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}
function getTime(date) {
  var hour = date.getHours()
  var minute = date.getMinutes()
  return [hour, minute].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}


export default formatDateTime
