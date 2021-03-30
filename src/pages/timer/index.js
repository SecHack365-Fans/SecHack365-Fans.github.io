import React from 'react'

import Layout from '../../components/layout'
import SEO from '../../components/seo'
import Meta from '../../components/meta'

import showClock from './script/clock.js'
import showDamedesu from './script/display.js'
import countdown, { display } from './script/countdown.js'

const SiteIndex = ({ location }) => {
  require('./timer.css')
  /* consoleにAAを表示する */
  showDamedesu()
  /* カウントダウンの締め切りを設定する */
  countdown(2021, 4, 1, 0, "SecHack365'21募集開始まで", 'counter')
  /* 時計を表示する  */
  setInterval(showClock, 1000)
  /* カウントダウンタイマーの実行スクリプト */
  setInterval(display, 10)
  return (
    <Layout location={location}>
      <SEO title="timer" description="†限界駆動コース†" />
      <Meta title="†限界駆動コース†" />
      {/* 現在時刻の表示エリア */}
      <p id="RealtimeClockArea" align="center">
        <b>
          <font size="+2" color="#ff0000">
            Wait...
          </font>
        </b>
      </p>
      {/* カウントダウンタイマーの表示エリア */}
      <div align="center">
        <div class="counter" id="counter"></div>
      </div>
    </Layout>
  )
}

export default SiteIndex
