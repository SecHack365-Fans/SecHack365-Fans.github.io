import ReactMarkdown, { type Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";

import {
  resolveMarkdownImageUrl,
  resolveMarkdownLinkUrl,
} from "../lib/markdownUrls";
import type { PostPageProps } from "../lib/posts";
import { Layout } from "./Layout";
import styles from "./MarkdownRender.module.css";

type MarkdownProps = {
  ctfId: string;
  postId: string;
  content: string;
};

const createMarkdownComponents = ({
  ctfId,
  postId,
}: Pick<MarkdownProps, "ctfId" | "postId">): Components => ({
  a: ({ href = "", node: _node, ...props }) => (
    <a {...props} href={resolveMarkdownLinkUrl(href, ctfId, postId)} />
  ),
  img: ({ src = "", alt, node: _node, ...props }) => (
    <img
      {...props}
      src={
        typeof src === "string"
          ? resolveMarkdownImageUrl(src, ctfId, postId)
          : src
      }
      alt={alt ?? ""}
      style={{ width: "80%" }}
    />
  ),
  code: ({ className, children, node: _node, ...props }) => {
    const language = /language-(\w+)/.exec(className ?? "")?.[1];

    return language ? (
      <SyntaxHighlighter
        style={tomorrow}
        language={language}
        PreTag="div"
        className={styles.code}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    ) : (
      <code className={`${className ?? ""} ${styles.inlineCode}`} {...props}>
        {children}
      </code>
    );
  },
  blockquote: ({ children, node: _node, ...props }) => (
    <blockquote {...props} className={styles.blockQuote}>
      {children}
    </blockquote>
  ),
});

const MarkdownRender = ({ ctfId, postId, content }: MarkdownProps) => (
  <ReactMarkdown components={createMarkdownComponents({ ctfId, postId })}>
    {content}
  </ReactMarkdown>
);

export const createPostPage = (ctfId: string) => {
  const PostPage = ({ postData }: PostPageProps) => {
    const { id, title, content } = postData;

    return (
      <Layout title={`${title}-${ctfId}`}>
        <MarkdownRender ctfId={ctfId} postId={id} content={content} />
      </Layout>
    );
  };

  PostPage.displayName = `${ctfId}PostPage`;
  return PostPage;
};

export default MarkdownRender;
