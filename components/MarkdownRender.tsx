import ReactMarkdown from "react-markdown";
import path from "path";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/cjs/styles/prism";

import styles from "./MarkdownRender.module.css";

type MarkdownProps = {
  ctfId: string | undefined;
  title: string | undefined;
  content: string | undefined;
};

const components = (markdownProps: MarkdownProps) => {
  return {
    img: ({ ...props }: any) => {
      const src =
        "https://" +
        path.join(
          "raw.githubusercontent.com/SecHack365-Fans/SecHack365-Fans.github.io/master/pages/ctf/",
          markdownProps.ctfId ?? "",
          "/writeups/",
          markdownProps.title ?? "",
          props.src as string,
        );
      return <img src={src} alt={props.alt} style={{ width: "80%" }} />;
    },
    code({ inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      return !inline && match ? (
        <SyntaxHighlighter
          style={tomorrow}
          language={match[1]}
          PreTag="div"
          {...props}
          className={styles.code}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={`${className} ${styles.inlineCode}`} {...props}>
          {children}
        </code>
      );
    },
    blockquote: ({ node, children, ...props }: any) => {
      return <blockquote className={styles.blockQuote}>{children}</blockquote>;
    },
  };
};

const MarkdownRender = (props: MarkdownProps): JSX.Element => {
  return (
    <ReactMarkdown components={components(props)}>
      {props.content ?? ""}
    </ReactMarkdown>
  );
};

export default MarkdownRender;

export type PostPropType = {
  postData: {
    title: string;
    description: string;
    author: string;
    genre: string;
    solver: number;
    point: number;
    contentHtml: string;
  };
};
