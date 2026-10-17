import { Fragment } from "react";
import { FaTwitter } from "react-icons/fa";
import * as stylex from "@stylexjs/stylex";
import { s } from "../styles/writeups.stylex";

export const TwitterButton = ({ authors }: { authors?: string }) => {
  if (!authors) {
    return null;
  }

  if (!/^[A-Za-z0-9_]+(?:\s*&\s*[A-Za-z0-9_]+)*$/.test(authors)) {
    return <>{authors}</>;
  }

  return (
    <span>
      {authors.split(/\s*&\s*/).map((author, index) => (
        <Fragment key={author}>
          {index > 0 && " & "}
          <a
            href={`https://x.com/${author}`}
            target="_blank"
            rel="noopener noreferrer"
            {...stylex.props(s.author)}
          >
            <FaTwitter
              style={{ color: "#00acee" }}
              {...stylex.props(s.twitterIcon)}
            />
            {author}
          </a>
        </Fragment>
      ))}
    </span>
  );
};
