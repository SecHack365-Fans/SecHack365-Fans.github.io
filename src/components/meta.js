import React from 'react'
import { Helmet } from 'react-helmet'

export default (props) => {
  const title = `${props.title}`
  const description = '若手セキュリティイノベーター育成プログラム SecHack365は、25歳以下の学生や社会人から公募選抜する40名程度の受講生を対象に、サイバーセキュリティに関するソフトウェア開発や研究、実験、発表を一年間継続してモノづくりをする機会を提供する長期ハッカソンです。全国の一流研究者・技術者や受講生等との交流をするなかで、自ら手を動かし、セキュリティに関わるモノづくりができる人材 (セキュリティイノベーター) を育てます。'
  return (
    <Helmet>
      <html lang="ja" />
      <title>{title}</title>
      <meta name="Description" content={description} />
      <meta charset="UTF-8" />
    </Helmet>
  )
}
