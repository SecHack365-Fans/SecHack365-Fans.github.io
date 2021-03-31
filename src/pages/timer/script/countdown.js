import React from 'react'
import ReactDOM from 'react-dom'

var year, month, day, hour, com1, id
var millenium

export default function countdown(_year, _month, _day, _hour, _com1, _id) {
  const baseoffset = '-9'
  year = _year
  month = _month
  day = _day
  hour = _hour
  com1 = _com1
  id = _id
  var offset = 0;
  if (baseoffset !== 'none') {
    var localoffset = new Date().getTimezoneOffset() / 60
    offset = localoffset - baseoffset
  }

  millenium = new Date(year, month - 1, day, hour - offset, 0, 0)
  return null
}

export function convertNum(num, figures) {
  var str = String(num)
  if (str) while (str.length < figures) str = '0' + str
  return str
}

export function display() {
  var centi = '1'
  var convert = 0
  var cuttime = ''
  var cnt1 = '日'
  var cnt2 = '：'
  var cnt3 = '：'
  var cnt4 = '.'
  var com2 = ' '
  var com3 = ''
  var com4 = 'カウントダウン終了'

  var today = new Date()
  var myMsec = millenium.getTime() - today.getTime()
  var time0 = Math.floor(myMsec / (1000 * 60 * 60 * 24))
  myMsec -= time0 * (1000 * 60 * 60 * 24)
  var time1 = Math.floor(myMsec / (1000 * 60 * 60))
  myMsec -= time1 * (1000 * 60 * 60)
  var time2 = Math.floor(myMsec / (1000 * 60))
  myMsec -= time2 * (1000 * 60)
  var time3 = Math.floor(myMsec / 1000)
  myMsec -= time3 * 1000
  var time4 = Math.floor(myMsec / 10)

  var time_0 = time0
  if (convert === 1) {
    time1 = time0 * 24 + time1
    time_0 = ''
    cnt1 = ''
  } else if (convert === 2) {
    time2 = (time0 * 24 + time1) * 60 + time2
    time_0 = time1 = ''
    cnt1 = cnt2 = ''
  } else if (convert === 3) {
    time3 = ((time0 * 24 + time1) * 60 + time2) * 60 + time3
    time_0 = time1 = time2 = ''
    cnt1 = cnt2 = cnt3 = ''
  }
  if (centi === 2) {
    time1 = time2 = time3 = time4 = ''
    cnt2 = cnt3 = cnt4 = ''
  } else if (centi === 3) {
    time2 = time3 = time4 = ''
    cnt3 = cnt4 = ''
  } else if (centi === 4) {
    time3 = time4 = ''
    cnt4 = ''
  } else if (centi === 5 || !centi) {
    time4 = ''
  }

  time1 = convertNum(time1, 2)
  time2 = convertNum(time2, 2)
  time3 = convertNum(time3, 2)
  time4 = convertNum(time4, 2)
  var Element = <div>Wait...</div>

  if (time0 >= 0) {
    if (time_0 === 0 && cuttime === 1) {
      Element = (
        <div>
          <p style={{ whiteSpace: 'pre-wrap' }}>
            {com1.join('\n')}
            <span>{time1}</span>
            {cnt2}
            <span>{time2}</span>
            {cnt3}
            <span>{time3}</span>
            {cnt4}
            <span>{time4}</span>
            {com3}
          </p>
        </div>
      )
    } else {
      Element = (
        <div>
          <p style={{ whiteSpace: 'pre-wrap' }}>
            {com1.join('\n')}
            <br />
            <span>{time_0}</span>
            {cnt1}
            {com2}
            <span>{time1}</span>
            {cnt2}
            <span>{time2}</span>
            {cnt3}
            <span>{time3}</span>
            {cnt4}
            <span>{time4}</span>

            {com3}
          </p>
        </div>
      )
    }
  } else {
    Element = (
      <div>
        <p>{com4}</p>
      </div>
    )
  }
  if (typeof document !== `undefined`) {
    ReactDOM.render(Element, document.getElementById(id))
  }
  return null
}
