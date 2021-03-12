import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Meta from '../components/meta'

import './404.css'

const SiteIndex = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="404" description="404page" />
      <Meta title="404" />

      <h1>404 Not Found</h1>
      <p>あれ，もしかしてページを失くしモノされていますか？そんな時はこちら！！</p>
      <h3>
        「Tsukushi Speaker 僕だけが失くしモノをしない〜あれ、君たちまだインターネットにカメラ繋いで
        ハッカーに監視されてるの？僕はオフラインで安全です〜」
      </h3>
      <Link
        href="https://sechack365.nict.go.jp/achievement/2020/pdf/2020_01.pdf"
        target="_blank"
        rel="noopener noreferrer"
        style={{ 'text-align': 'center' }}
      >
        <StaticImage src="../images/tsukushi_speaker.png" alt="tsuku4" />
      </Link>
      <div class="menu">
        <StaticImage src="../images/tsuku4.png" alt="tsuku4" />
      </div>
    </Layout>
  )
}

export default SiteIndex
