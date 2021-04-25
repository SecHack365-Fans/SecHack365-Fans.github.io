import React from 'react'

import Layout from '../../components/layout'
import SEO from '../../components/seo'
import Meta from '../../components/meta'
import { StaticImage } from 'gatsby-plugin-image'

// 表現駆動のエントリデータ
const ExprData = require('../data/expr.json')

// 学習駆動コースのデータ
const StudyData = require('../data/study.json')

// 開発駆動のエントリデータ
const DevData = require('../data/dev.json')

// 思索駆動のエントリデータ
const ThinkData = require('../data/think.json')

// 研究駆動のエントリデータ
const ResearchData = require('../data/research.json')

/**
 * TableRow でのみの使用を想定している
 * @param {string} title - 作品のタイトル
 * @param {string} href - 作品へのリンク
 * @returns {JSX.Element} - 多分
 */
const AchivementLink = ({ title, href }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {title}
  </a>
)

/**
 * テーブルの1行
 * @param {string} author - 参加者の名前
 * @param {string} title - 参加記のタイトル
 * @param {string} blogHRef - 参加記への href
 * @param {string} blogHostedAt - 参加記をホスティングしてるドメイン
 * @param {Array<{title: string, href: string}>} achivements - 作品のタイトルとリンク
 * @returns {JSX.Element} - 多分
 */
const TableRow = ({ author, title, blogHRef, blogHostedAt, achivements }) => (
  <tr class="title">
    <td class="sh365_name">{author}</td>
    <td class="sh365_title">{title}</td>
    <td class="sh365_blog">
      <a href={blogHRef} target="_blank" rel="noopener noreferrer">
        {blogHostedAt}
      </a>
    </td>
    <td class="sh365_hack">
      {achivements.length > 0 && (
        <>
          {/* 2つ目以降の作品のリンクの前には <br /> を入れたいので最初のだけ直接添字アクセスをして、それ以降を map で呼び出す */}
          <AchivementLink {...achivements[0]} />
          {achivements.slice(1).map((achivement) => (
            <>
              <br />
              <AchivementLink {...achivement} />
            </>
          ))}
        </>
      )}
    </td>
  </tr>
)

const SiteIndex = ({ location }) => {
  const siteTitle = 'sh365 blog'
  require('./blog.css')
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" description="2020年度にSecHack365に参加したトレーニーによる参加ブログのまとめです。" />
      <Meta title="SH365 Blog" />
      <h1>SecHack365 参加記 まとめ【随時更新】</h1>
      <p>2020年度にSecHack365に参加したトレーニーによる参加ブログのまとめです。(順不同)</p>
      <div>
        <h2 class="coursettl c0 c01">表現駆動コース</h2>
        <div>
          <table>
            <tr class="title">
              <th class="sh365_name">名前</th>
              <th class="sh365_title">タイトル</th>
              <th class="sh365_blog">参加記</th>
              <th class="sh365_hack">成果物</th>
            </tr>
            {ExprData.map((data) => (
              <TableRow {...data} />
            ))}
          </table>
        </div>
      </div>
      <div>
        <h2 class="coursettl c0 c02">学習駆動コース</h2>
        <div>
          <table>
            <tr class="title">
              <th class="sh365_name">名前</th>
              <th class="sh365_title">タイトル</th>
              <th class="sh365_blog">参加記</th>
              <th class="sh365_hack">成果物</th>
            </tr>
            {StudyData.map((data) => (
              <TableRow {...data} />
            ))}
          </table>
        </div>
      </div>
      <div>
        <h2 class="coursettl c0 c03">開発駆動コース</h2>
        <div>
          <table>
            <tr class="title">
              <th class="sh365_name">名前</th>
              <th class="sh365_title">タイトル</th>
              <th class="sh365_blog">参加記</th>
              <th class="sh365_hack">成果物</th>
            </tr>
            {DevData.map((data) => (
              <TableRow {...data} />
            ))}
          </table>
        </div>
      </div>
      <div>
        <h2 class="coursettl c0 c04">思索駆動コース</h2>
        <div>
          <table>
            <tr class="title">
              <th class="sh365_name">名前</th>
              <th class="sh365_title">タイトル</th>
              <th class="sh365_blog">参加記</th>
              <th class="sh365_hack">成果物</th>
            </tr>
            {ThinkData.map((data) => (
              <TableRow {...data} />
            ))}
          </table>
        </div>
      </div>
      <div>
        <h2 class="coursettl c0 c05">研究駆動コース</h2>
        <div>
          <table>
            <tr class="title">
              <th class="sh365_name">名前</th>
              <th class="sh365_title">タイトル</th>
              <th class="sh365_blog">参加記</th>
              <th class="sh365_hack">成果物</th>
            </tr>
            {ResearchData.map((data) => (
              <TableRow {...data} />
            ))}
          </table>
        </div>
      </div>
      <div style={{ 'text-align': 'center' }}>
        <a href="https://sechack365.nict.go.jp/" target="_blank" rel="noopener noreferrer">
          <StaticImage
            src="../../images/logo-yoko.png"
            alt="SecHack365 logo"
            style={{ width: '40%', height: 'auto' }}
          />
        </a>
      </div>
    </Layout>
  )
}

export default SiteIndex
