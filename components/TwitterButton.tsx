import { FaTwitter } from "react-icons/fa";
import styles from "/styles/writeups.module.css";

export const TwitterButton = ({ authors }: { authors: string }) => {
  if (authors.match(/([A-Za-z_]+( ?& ?)?)+/)) {
    return (
      <span>
        {authors
          .split(/ ?& ?/)
          .map<React.ReactNode>((author, idx) => (
            <button
              onClick={() => (location.href = `https://twitter.com/${author}`)}
              className={styles.author}
              key={idx}
            >
              <FaTwitter style={{ color: "#00acee" }} />
              {author}
            </button>
          ))
          .reduce((prev, curr) => [prev, " & ", curr])}
      </span>
    );
  } else {
    return <>{authors}</>;
  }
};
