import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Meta from '../components/meta'

import GamingSecHack from '../images/GamingSecHack.gif'

import './index.css'

const SiteIndex = ({ location }) => {
  return (
    <Layout location={location}>
      <SEO title="index" description="SecHack365-Fans Toppage" />
      <Meta title="Home" />
      <h1>SecHack365 非公式 ファンページ</h1>
      <h5 class="box">
        <div>
          <span class="box-title">注意</span>
          このページは修了生よって運営されている
          <div class="unofficial">非公式</div>
          のファンページです。 公式のページはこちらになります。
        </div>
        <ul class="officialLink">
          <li class="officialBtn">
            <Link
              href="https://sechack365.nict.go.jp/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#353A40' }}
            >
              Webサイト
            </Link>
          </li>
          <li class="officialBtn">
            <Link
              href="https://twitter.com/SecHack365"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#353A40' }}
            >
              Twitter
            </Link>
          </li>
        </ul>
      </h5>
      <div class="topicon">
        <img src={GamingSecHack} alt="icon" style={{ border: '50' }} />
      </div>
    </Layout>
  )
}

export default SiteIndex
