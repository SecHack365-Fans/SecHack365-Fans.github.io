import React from 'react'
import { Link } from 'gatsby'

import Layout from '../../components/layout'
import SEO from '../../components/seo'
import Meta from '../../components/meta'
import { StaticImage } from 'gatsby-plugin-image'

// 表現駆動のエントリデータ
const ExprData = [
  {
    author: '中嶋 桃香',
    title: '「SecHack365修了しました」',
    blogHRef: 'https://momoka-mero.hatenablog.com/entry/2021/03/06/232920',
    blogHostedAt: 'hatenablog.com',
    achivements: [
      {
        title: 'Tsukushi Speaker 僕だけが失くしモノをしない',
        href: 'https://sechack365.nict.go.jp/achievement/2020/pdf/2020_01.pdf'
      }
    ]
  },
  {
    author: '酒井 義史',
    title: '「SecHack365 2020表現駆動コース参加体験記」',
    blogHRef: 'https://yoshistl.hatenablog.com/entry/2021/03/08/024337',
    blogHostedAt: 'hatenablog.com',
    achivements: [
      {
        title: 'Tsukushi Speaker 僕だけが失くしモノをしない',
        href: 'https://sechack365.nict.go.jp/achievement/2020/pdf/2020_01.pdf'
      }
    ]
  },
  {
    author: '玉田 遍',
    title: '「たのしかったSecHack365」',
    blogHRef: 'https://iiimiiino.hatenablog.com/entry/2021/03/08/232321',
    blogHostedAt: 'hatenablog.com',
    achivements: [
      {
        title: 'Tsukushi Speaker 僕だけが失くしモノをしない',
        href: 'https://sechack365.nict.go.jp/achievement/2020/pdf/2020_01.pdf'
      },
      {
        title: '距離を縮めるチャット Approachat',
        href: 'https://sechack365.nict.go.jp/achievement/2020/pdf/2020_02.pdf'
      }
    ]
  }
]

// 学習駆動コースのデータ
const StudyData = [
  {
    author: '古田 花恋',
    title: '「2020SecHack365修了しました(学習駆動コース)」',
    blogHRef: 'https://rinruren.hatenablog.com/entry/2021/03/28/223316',
    blogHostedAt: 'hatenablog.com',
    achivements: [
      {
        title: '物語でセキュリティ啓発',
        href: 'https://sechack365.nict.go.jp/achievement/2020/pdf/2020_06.pdf'
      }
    ]
  }
]

// 開発駆動のエントリデータ
const DevData = [
  {
    author: '寺嶋 友哉',
    title: '「SecHack365を修了しました」',
    blogHRef: 'https://terassyi.net/posts/2021/03/09/sechack365.html',
    blogHostedAt: 'terassyi.net',
    achivements: [
      {
        title: 'セキュリティ演習環境構築支援ツールKAKOI',
        href: 'https://sechack365.nict.go.jp/achievement/2020/pdf/2020_20.pdf'
      }
    ]
  }
]

// 思索駆動のエントリデータ
const ThinkData = [
  {
    author: '福地 成彦',
    title: '「2020年度のSecHack365を完走しました」',
    blogHRef: 'https://fqc.hatenablog.com/entry/2021/03/14/092046',
    blogHostedAt: 'hatenablog.com',
    achivements: [
      {
        title: 'FairTorch: 深層学習の公平性ライブラリ',
        href: 'https://sechack365.nict.go.jp/achievement/2020/pdf/2020_26.pdf'
      }
    ]
  }
]

// 研究駆動のエントリデータ
const ResearchData = [
  {
    author: '石川 琉聖',
    title: '「SecHack365 参加記',
    blogHRef: 'https://xryuseix.hatenablog.com/entry/2021/03/08/173442',
    blogHostedAt: 'hatenablog.com',
    achivements: [
      {
        title: 'ソースコードの盗作判定システム SA-Plag',
        href: 'https://sechack365.nict.go.jp/achievement/2020/pdf/2020_28.pdf'
      }
    ]
  }
]

/**
 * TableRow でのみの使用を想定している
 * @param {string} title - 作品のタイトル
 * @param {string} href - 作品へのリンク
 * @returns {JSX.Element} - 多分
 */
const AchivementLink = ({ title, href }) => (
  <Link href={href} target="_blank" rel="noopener noreferrer">
    {title}
  </Link>
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
      <Link href={blogHRef} target="_blank" rel="noopener noreferrer">
        {blogHostedAt}
      </Link>
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
        <Link href="https://sechack365.nict.go.jp/" target="_blank" rel="noopener noreferrer">
          <StaticImage
            src="../../images/logo-yoko.png"
            alt="SecHack365 logo"
            style={{ width: '40%', height: 'auto' }}
          />
        </Link>
      </div>
    </Layout>
  )
}

export default SiteIndex
