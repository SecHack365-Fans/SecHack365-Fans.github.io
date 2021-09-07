import React from 'react'

import Layout from '../../components/layout'
import Seo from '../../components/seo'
import Meta from '../../components/meta'

const SiteIndex = ({ location }) => {
  return (
    <Layout location={location}>
      <Seo title="index" description="SecHack365-Fans Toppage" />
      <Meta title="Home" />
      <h1>CTF</h1>
      <ul style={{ 'font-size': '2em' }}>
        <li>
          <a href="./tsukuctf2021">TsukuCTF 2021</a>
        </li>
      </ul>
    </Layout>
  )
}

export default SiteIndex
