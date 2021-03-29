function set2fig(num) {
  // 桁数が1桁だったら先頭に0を加えて2桁に調整する
  var ret
  if (num < 10) {
    ret = '0' + num
  } else {
    ret = num
  }
  return ret
}

export default function showClock() {
  var nowTime = new Date()
  var nowHour = set2fig(nowTime.getHours())
  var nowMin = set2fig(nowTime.getMinutes())
  var nowSec = set2fig(nowTime.getSeconds())
  var msg =
    '<i><b><font size="+3" color="#ff0000">現実世界の時刻<br>' +
    nowHour +
    ':' +
    nowMin +
    ':' +
    nowSec +
    '</font></b></i>'
  document.getElementById('RealtimeClockArea').innerHTML = msg
}
