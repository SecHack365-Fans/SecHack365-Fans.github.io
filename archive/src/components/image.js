// import React from "react"
// import { useStaticQuery, graphql } from "gatsby"
// import Img from "gatsby-image"

// export default props => {
//   const { allImageSharp } = useStaticQuery(graphql`
//     query {
//       allImageSharp {
//         nodes {
//           fluid(maxWidth: 1600) {
//             originalName
//             ...GatsbyImageSharpFluid_withWebp
//           }
//         }
//       }
//     }
//   `)
//   return (
//     <figure className={props.className} style={props.style}>
//       <Img
//         fluid={
//           allImageSharp.nodes.find(n => n.fluid.originalName === props.filename)
//             .fluid
//         }
//         alt={props.alt}
//       />
//     </figure>
//   )
// }

import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Image = (props) => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                fluid(maxWidth: 300) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `}

    /*
      サイズFIXしたい時は上記childImageSharp {...}の中を以下のように変更
              sizes(maxWidth: 300) {
                ...GatsbyImageSharpSizes
              }
    */
    render={(data) => {
      const image = data.images.edges.find(n => {
        return n.node.relativePath.includes(props.filename);
      });
      if (!image) { return null; }
      //const imageSizes = image.node.childImageSharp.sizes; ←サイズFIXしたい時
      return (
        /*<Img alt={props.alt} sizes={imageSizes} /> ←サイズFIXしたい時 */
        <Img fluid={image.node.childImageSharp.fluid} alt={props.alt} />
      );
    }}
  />
)
export default Image