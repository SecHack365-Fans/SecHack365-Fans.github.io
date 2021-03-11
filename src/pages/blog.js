import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'
import Meta from '../components/meta'
import { StaticImage } from 'gatsby-plugin-image'
import './blog.css'

const SiteIndex = ({ location }) => {
  const siteTitle = 'sh365 blog'
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" description="2020年度にSecHack365に参加したトレーニーによる参加ブログのまとめです．" />
      <Meta title="SH365 Blog" />
      <h1>SecHack365 参加記 まとめ【随時更新】</h1>
      <p>2020年度にSecHack365に参加したトレーニーによる参加ブログのまとめです．(順不同)</p>
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
            <tr class="title">
              <td class="sh365_name">中嶋 桃香</td>
              <td class="sh365_title">「SecHack365修了しました」</td>
              <td class="sh365_blog">
                <Link
                  href="https://momoka-mero.hatenablog.com/entry/2021/03/06/232920"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  hatenablog.com
                </Link>
              </td>
              <td class="sh365_hack">
                <Link
                  href="https://sechack365.nict.go.jp/achievement/2020/pdf/2020_01.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tsukushi Speaker 僕だけが失くしモノをしない
                </Link>
              </td>
            </tr>
            <tr class="title">
              <td class="sh365_name">酒井 義史</td>
              <td class="sh365_title">「SecHack365 2020表現駆動コース参加体験記」</td>
              <td class="sh365_blog">
                <Link
                  href="https://yoshistl.hatenablog.com/entry/2021/03/08/024337"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  hatenablog.com
                </Link>
              </td>
              <td class="sh365_hack">
                <Link
                  href="https://sechack365.nict.go.jp/achievement/2020/pdf/2020_01.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tsukushi Speaker 僕だけが失くしモノをしない
                </Link>
              </td>
            </tr>
            <tr class="title">
              <td class="sh365_name">玉田 遍</td>
              <td class="sh365_title">「たのしかったSecHack365」</td>
              <td class="sh365_blog">
                <Link
                  href="https://iiimiiino.hatenablog.com/entry/2021/03/08/232321"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  hatenablog.com
                </Link>
              </td>
              <td class="sh365_hack">
                <Link
                  href="https://sechack365.nict.go.jp/achievement/2020/pdf/2020_01.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tsukushi Speaker 僕だけが失くしモノをしない
                </Link>
                <br />
                <Link
                  href="https://sechack365.nict.go.jp/achievement/2020/pdf/2020_02.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  距離を縮めるチャット Approachat
                </Link>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div>
        <h2 class="coursettl c0 c02">学習駆動コース</h2>
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
            <tr class="title">
              <td class="sh365_name">寺嶋 友哉</td>
              <td class="sh365_title">「SecHack365を修了しました」</td>
              <td class="sh365_blog">
                <Link
                  href="https://terassyi.net/posts/2021/03/09/sechack365.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  terassyi.net
                </Link>
              </td>
              <td class="sh365_hack">
                <Link
                  href="https://sechack365.nict.go.jp/achievement/2020/pdf/2020_20.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  セキュリティ演習環境構築支援ツールKAKOI
                </Link>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div>
        <h2 class="coursettl c0 c04">思索駆動コース</h2>
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
            <tr class="title">
              <td class="sh365_name">石川 琉聖</td>
              <td class="sh365_title">「SecHack365 参加記」</td>
              <td class="sh365_blog">
                <Link
                  href="https://xryuseix.hatenablog.com/entry/2021/03/08/173442"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  hatenablog.com
                </Link>
              </td>
              <td class="sh365_hack">
                <Link
                  href="https://sechack365.nict.go.jp/achievement/2020/pdf/2020_28.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ソースコードの盗作判定システム SA-Plag
                </Link>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div style={{ 'text-align': 'center' }}>
        <Link href="https://sechack365.nict.go.jp/" target="_blank" rel="noopener noreferrer">
          <StaticImage
            src="../images/logo-yoko.png"
            alt="SecHack365 logo"
            style={{ width: '40%', height: 'auto' }}
          />
        </Link>
      </div>
    </Layout>
  )
}

export default SiteIndex
