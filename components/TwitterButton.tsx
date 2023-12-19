import { FaTwitter } from "react-icons/fa";
import stylex from "@stylexjs/stylex";
import { s } from "../styles/writeups.stylex";

export const TwitterButton = ({ authors }: { authors?: string }) => {
  if (!authors) return <></>;
  if (authors.match(/([A-Za-z_]+( ?& ?)?)+/)) {
    return (
      <span>
        {authors
          .split(/ ?& ?/)
          .map<React.ReactNode>((author, idx) => (
            <button
              onClick={() => (location.href = `https://twitter.com/${author}`)}
              {...stylex.props(s.author)}
              key={idx}
            >
              <FaTwitter
                style={{ color: "#00acee" }}
                {...stylex.props(s.twitterIcon)}
              />
              {author}
            </button>
          ))
          .reduce((prev, curr) => [prev, "&", curr])}
      </span>
    );
  } else {
    return <>{authors}</>;
  }
};
