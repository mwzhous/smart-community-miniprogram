const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()


  return `${[year, month, day].map(formatNumber).join('/')} ${[
    hour,
    minute,
    second
  ]
    .map(formatNumber)
    .join(':')}`
}

const formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

function getDateDiff(dateTime) { // 将年月日转换为几小时前，几天前等等
  let dateTimeStamp = new Date(dateTime).getTime();
  let result = '';
  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let halfamonth = day * 15;
  let month = day * 30;
  let year = day * 365;
  let now = new Date().getTime();
  let diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    return;
  }
  let monthEnd = diffValue / month;
  let weekEnd = diffValue / (7 * day);
  let dayEnd = diffValue / day;
  let hourEnd = diffValue / hour;
  let minEnd = diffValue / minute;
  let yearEnd = diffValue / year;
  if (yearEnd >= 1) {
    result = dateTime;
  } else if (monthEnd >= 1) {
    result = "" + parseInt(monthEnd) + "月前";
  } else if (weekEnd >= 1) {
    result = "" + parseInt(weekEnd) + "周前";
  } else if (dayEnd >= 1) {
    result = "" + parseInt(dayEnd) + "天前";
  } else if (hourEnd >= 1) {
    result = "" + parseInt(hourEnd) + "小时前";
  } else if (minEnd >= 1) {
    result = "" + parseInt(minEnd) + "分钟前";
  } else {
    result = "刚刚";
  }
  return result;
};

//获取当前年月日
function getYearYueDay() {
  // 获取当前日期
  var date = new Date();

  // 获取当前月份
  var nowMonth = date.getMonth() + 1;

  // 获取当前是几号
  var strDate = date.getDate();

  // 添加分隔符“-”
  var seperator = "-";

  // 对月份进行处理，1-9月在前面添加一个“0”
  if (nowMonth >= 1 && nowMonth <= 9) {
    nowMonth = "0" + nowMonth;
  }

  // 对月份进行处理，1-9号在前面添加一个“0”
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }

  // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
  var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
  return nowDate
}
//获取格式化的日期
function today(){
  var today=new Date();
  var str="";
  str+=today.getFullYear()+"-";
  var month=today.getMonth()+1;//返回值是 0（一月） 到 11（十二月） 之间的一个整数。
  if(month<10){
      str+="0";
  }
  str+=month+"-";
  var day=today.getDate();//返回值是 1 ~ 31 之间的一个整数
  if(day<10){
      str+="0";
  }
  str+=day;
  return str;
}
function daysDistance(date1, date2) {     
  //parse() 是 Date 的一个静态方法 , 所以应该使用 Date.parse() 来调用，而不是作为 Date 的实例方法。返回该日期距离 1970/1/1 午夜时间的毫秒数
  date1 = Date.parse(date1);
  date2 = Date.parse(date2);
  //计算两个日期之间相差的毫秒数的绝对值
  var ms= Math.abs(date2 - date1);
  //毫秒数除以一天的毫秒数,就得到了天数
  var days = Math.floor(ms / (24 * 3600 * 1000));
  return days ;
}
function current() {
  var d = new Date(),
    str = '';
  str += d.getFullYear() + '-'; //获取当前年份 
  str += d.getMonth() + 1 + '-'; //获取当前月份（0——11） 
  str += d.getDate() + ' ';
  str += d.getHours() + ':';
  str += d.getMinutes() + ':';
  str += d.getSeconds() + ' ';
  return str;
}

module.exports = {
  formatTime,
  getDateDiff,
  getYearYueDay,
  daysDistance,
  today,
  current
}