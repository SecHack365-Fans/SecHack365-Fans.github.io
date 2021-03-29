import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../../components/layout'
import SEO from '../../components/seo'
import Meta from '../../components/meta'

import './timer.css'
// import './script/clock.js'
import showDamedesu from './script/display.js'
// import './script/countdown.js'

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

      {/* カウントダウンタイマーの表示エリア */}
      <div align="center">
        <div class="counter" id="counter"></div>
      </div>
      {showDamedesu()}
      <Helmet>
        <script type="text/javascript">{
          // {/* consoleにAAを表示する  */}
          // `showDamedesu();`

          // {/* 時計を表示する  */}
          // {/* setInterval('showClock()', 1000); */}

          // {/* カウントダウンの締め切りを設定する  */}
          // {/* const counter = new countdown(2022, 4, 1, 12, "HogeのFuga</br>まで", "counter"); */}
        }</script>
      </Helmet>
      {/* カウントダウンタイマーの実行スクリプト，bodyの最下部に書くのが安牌 */}
      <Helmet>
        {/* <script type="text/javascript">{`counter.display(); setInterval("counter.display()", 10);`}</script> */}
      </Helmet>
    </Layout>
  )
}

export default SiteIndex
