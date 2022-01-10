import ReactMarkdown from "react-markdown";
import path from "path";

type MarkdownProps = {
  id: string | undefined;
  title: string | undefined;
  content: string | undefined;
};

const MarkdownRender = (props: MarkdownProps): JSX.Element => {
  return (
    <ReactMarkdown
      components={{
        img: ({ node, ...props }) => {
          const src = path.join(
            "https://raw.githubusercontent.com/SecHack365-Fans/SecHack365-Fans.github.io/master/src/pages/ctf/",
            props.id ?? "",
            "/writeups/",
            props.title ?? "",
            props.src as string
          );
          return <img src={src} alt={props.alt} style={{ width: "80%" }} />;
        },
      }}
    >
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
