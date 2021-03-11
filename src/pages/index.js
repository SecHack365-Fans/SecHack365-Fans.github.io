import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Meta from '../components/meta'

import { StaticImage } from 'gatsby-plugin-image'

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
          このページは<span style={{ color: 'red', 'font-size': '2em' }}>非公式</span>のファンページです．
          <br />
          公式のページはこちらになります．
        </div>
        <ul class="officialLink">
          <li class="officialBtn">
            <Link href="https://sechack365.nict.go.jp/" style={{ color: '#353A40' }}>
              Webサイト
            </Link>
          </li>
          <li class="officialBtn">
            <Link href="https://twitter.com/SecHack365" style={{ color: '#353A40' }}>
              Twitter
            </Link>
          </li>
        </ul>
      </h5>
      <div class="icon">
        <StaticImage src="../images/top.png" alt="icon" style={{ border: '50' }} />
      </div>
    </Layout>
  )
}

export default SiteIndex
