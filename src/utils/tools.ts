// 转换为日期格式
const timeFormat = (date: Date, lang: string, fmt: string): string => {
  if (lang == "zh_CN") {
    return timeFormatCN(date, fmt);
  } else if (lang == "en_US") {
    return timeFormatEN(date);
  } else {
    return timeFormatCN(date, fmt);
  }
};
// 转换星期格式
const getWeekDate = (date: Date, lang: string, fmt: number): string => {
  if (lang == "zh_CN") {
    return getWeekDateCN(date, fmt);
  } else if (lang == "en_US") {
    return getWeekDateEN(date);
  } else {
    return getWeekDateJP(date);
  }
};

// 转换为中国日期格式
const timeFormatCN = (date: Date, fmt: string): string => {
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  };
  //(y+)匹配多个y，比如yyyy
  if (/(y+)/.test(fmt)) {
    // RegExp.$1是RegExp的一个属性,指的是与正则表达式匹配的第一个 子匹配(以括号为标志)字符串
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return fmt;
};
// 转换为中国星期格式
const getWeekDateCN = (date: Date, fmt: number): string => {
  var weeks2 = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
  var weeks3 = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
  var day = date.getDay();
  if (fmt == 2) {
    var week = weeks2[day];
  } else {
    var week = weeks3[day];
  }
  return week;
};
// 转换为英语格式日期
const timeFormatEN = (date: Date): string => {
  var month = ["Dec", "Jan", "Feb", "Mar", "Apr", "MayJun", "Jul", "Aug", "Sep", "Oct", "Nov"];
  var y = date.getFullYear(); //年份
  var M = month[date.getMonth()]; //月份
  var d = date.getDate(); //日
  // var h = date.getHours(); //小时
  // var m = date.getMinutes(); //分
  // var s = date.getSeconds(); //秒
  // var j = Math.floor((date.getMonth() + 3) / 3); //季度
  // var S = date.getMilliseconds(); //毫秒
  return d + " " + M + " " + y;
};

// 转换为英语星期格式
const getWeekDateEN = (date: Date): string => {
  var weeks = new Array("Sunday", "Monday", "Therday", "Wednesday", "Thursday", "Firday", "Saturday");
  var day = date.getDay();
  var week = weeks[day];
  return week;
};
// 转换为日本星期格式
const getWeekDateJP = (date: Date): string => {
  var weeks = new Array("日曜日", "月曜日", "火曜日", "水曜日", "木曜日", "金曜日", "土曜日");
  var day = date.getDay();
  var week = weeks[day];
  return week;
};

// 二分法查找数字在有序数组的哪个区间
const binarySearchRange = (arr: any, target: number) => {
  let left = 0;
  let right = arr.length - 1;
  if (arr[left] > target) {
    return [0, 0];
  } else if (arr[right] < target) {
    return [right, right];
  }
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == target) {
      const start = i;
      const end = i;
      return [start, end];
    }
  }
  // 找到左边界
  while (left + 1 < right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) {
      left = mid;
    } else {
      right = mid;
    }
  }
  const start = left;
  const end = right;
  if (start <= end) {
    return [start, end];
  } else {
    return [-1, -1];
  }
};
export { timeFormatCN, timeFormat, getWeekDate, binarySearchRange };
