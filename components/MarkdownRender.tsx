import ReactMarkdown, { type Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";

import type { PostPageProps } from "../lib/posts";
import { Layout } from "./Layout";
import styles from "./MarkdownRender.module.css";

type MarkdownProps = {
  ctfId: string;
  postId: string;
  content: string;
};

const resolveImageUrl = (src: string, ctfId: string, postId: string) => {
  if (/^[a-z][a-z\d+.-]*:/i.test(src)) {
    return src;
  }
  if (src.startsWith("//")) {
    return `https:${src}`;
  }

  const baseUrl = `https://raw.githubusercontent.com/SecHack365-Fans/SecHack365-Fans.github.io/master/pages/ctf/${encodeURIComponent(ctfId)}/writeups/${encodeURIComponent(postId)}/`;
  return new URL(src, baseUrl).toString();
};

const resolveLinkUrl = (href: string, ctfId: string, postId: string) => {
  if (
    /^[a-z][a-z\d+.-]*:/i.test(href) ||
    href.startsWith("//") ||
    href.startsWith("/") ||
    href.startsWith("#")
  ) {
    return href;
  }

  const repositoryUrl = `https://github.com/SecHack365-Fans/SecHack365-Fans.github.io/blob/master/pages/ctf/${encodeURIComponent(ctfId)}/writeups/${encodeURIComponent(postId)}/`;
  return new URL(href, repositoryUrl).toString();
};

const createMarkdownComponents = ({
  ctfId,
  postId,
}: Pick<MarkdownProps, "ctfId" | "postId">): Components => ({
  a: ({ href = "", node: _node, ...props }) => (
    <a {...props} href={resolveLinkUrl(href, ctfId, postId)} />
  ),
  img: ({ src = "", alt, node: _node, ...props }) => (
    <img
      {...props}
      src={typeof src === "string" ? resolveImageUrl(src, ctfId, postId) : src}
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
