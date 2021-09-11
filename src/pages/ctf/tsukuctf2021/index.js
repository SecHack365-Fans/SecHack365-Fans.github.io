import React from 'react'
import { Link, graphql } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import { FaTwitter } from 'react-icons/fa'

import Layout from '../../../components/layout'
import Seo from '../../../components/seo'
import Meta from '../../../components/meta'

import '../ctf.css'
import './writeups.css'

const TwitterButton = (props) => {
  if (props.author) {
    return (
      <a href={`https://twitter.com/${props.author}`}>
        <FaTwitter style={{ color: '#00acee' }} />
        {props.author}
      </a>
    )
  } else {
    return <>unknown</>
  }
}

const SiteIndex = ({ data, location }) => {
  const posts = data.allMarkdownRemark.nodes
  return (
    <Layout location={location}>
      <Seo title="index" description="SecHack365-Fans Toppage" />
      <Meta title="Home" />
      <h1>TsukuCTF 2021</h1>
      <div style={{ 'text-align': 'center' }}>
        <a href="https://tsukuctf.sechack365.com/" target="_blank" rel="noopener noreferrer">
          <StaticImage src="../../../images/tsukuctf2021.png" alt="TsukuCTF" style={{ width: '50%', height: 'auto' }} />
          <div style={{ 'font-size': '2em', 'word-break': 'break-all' }}>https://tsukuctf.sechack365.com/</div>
        </a>
      </div>
      <hr />
      <h2>Writeups</h2>
      <ol style={{ listStyle: `none` }}>
        {posts.map((post) => {
          const title = post.frontmatter.title || post.fields.slug

          return (
            <li key={post.fields.slug} className="ctf-writeups-list">
              <article className="post-list-item" itemScope itemType="http://schema.org/Article">
                <header>
                  <h2>
                    <Link to={'/ctf/writeups' + post.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <span className="writeups_meta">
                    <div className=".writeups_meta_box">
                      Genre:{' '}
                      <a href="#" className="writeups_tsukushi writeups_genre">
                        {post.frontmatter.genre}
                      </a>
                    </div>
                    <div className=".writeups_meta_box">
                      Author:{' '}
                      <TwitterButton author={post.frontmatter.author} />
                    </div>
                    <div className=".writeups_meta_box">Point:{' '}{post.frontmatter.point}</div>
                    <div className=".writeups_meta_box">Solver:{' '}{post.frontmatter.solver}</div>
                  </span>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: post.frontmatter.description || post.excerpt
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default SiteIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___genre], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          title
          description
          author
          genre
          solver
          point
        }
      }
    }
  }
`
