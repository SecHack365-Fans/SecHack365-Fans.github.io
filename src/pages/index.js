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
      <div class="icon">
        <StaticImage src="../images/top.png" alt="icon" style={{ border: '50' }} />
      </div>
      <br />
      <h2 style={{ 'text-align': 'center' }}>
        <Link href="https://sechack365.nict.go.jp/" target="_blank" rel="noopener noreferrer">
          SecHack365 公式ページはこちら
        </Link>
      </h2>
    </Layout>
  )
}

export default SiteIndex
