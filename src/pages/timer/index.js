import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../../components/layout'
import SEO from '../../components/seo'
import Meta from '../../components/meta'

import './timer.css'
import showClock from './script/clock.js'
import showDamedesu from './script/display.js'
import { countdown, display } from './script/countdown.js'

const SiteIndex = ({ location }) => {
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
      {/* consoleにAAを表示する  */}
      {showDamedesu()}
      {/* 時計を表示する  */}
      {/* TODO: setIntervalの返り値が出力されるけど直し方わからないのでとりまdisplay:noneしておいた */}
      <div style={{ display: 'none' }}>{setInterval(showClock, 1000)}</div>

      {/* カウントダウンタイマーの表示エリア */}
      <div align="center">
        <div class="counter" id="counter"></div>
      </div>
      {/* カウントダウンの締め切りを設定する */}
      {countdown(2022, 4, 1, 0, 'SecHack365\'21募集開始まで', 'counter')}
      {/* カウントダウンタイマーの実行スクリプト */}
      <div style={{ display: 'none' }}>{setInterval(display, 10)}</div>
    </Layout>
  )
}

export default SiteIndex
