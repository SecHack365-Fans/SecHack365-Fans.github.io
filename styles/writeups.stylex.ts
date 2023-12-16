import stylex from "@stylexjs/stylex";

export const s = stylex.create({
  // CTF description
  ctfDetails: {
    textAlign: "center",
  },
  ctfLogo: {
    width: "50%",
    height: "auto",
  },
  ctfLink: {
    fontSize: "1.5em",
    wordBreak: "break-all",
  },

  // Writeups
  writeups: {
    margin: 10,
  },
  ctfWriteupUl: {
    listStyleType: "none",
    padding: 0,
    margin: "0 10px",
  },
  writeupLink: {
    color: {
      default: "#000",
      ":visited": "#000",
    },
  },
  ctfWriteupList: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 10,
    padding: 10,

    borderRadius: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#e9e9e9",
    borderLeftStyle: "solid",
    borderLeftWidth: 5,
    borderLeftColor: "#5c9ee7",

    cursor: "pointer",
    backgroundColor: {
      ":hover": "#e2e2f555",
    },
    boxShadow: {
      default: "2px 2px 3px rgba(0, 0, 0, 0.3)",
      ":hover": "3px 3px 4px rgba(0, 0, 0, 0.4)",
    },
  },
  writeupTitle: {
    fontSize: "1.4em",
    fontWeight: "bold",
    marginBottom: 10,
  },
  writeupMeta: {
    display: "flex",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
  writeupMetaBox: {
    marginRight: 5,
    marginLeft: 5,
  },
  writeupGenre: {
    height: "1.3em",
    width: "6em",
    textAlign: "center",
    padding: "1px 3px",
    marginLeft: 5,
    borderRadius: 5,
    color: "#fff",
    fontWeight: "bold",
    boxShadow: "1px 1px 1px #e9e9e9",
  },
  author: {
    borderWidth: 0,
    cursor: "pointer",
    color: "rgb(0, 0, 238)",
    borderRadius: 2,
    backgroundColor: {
      default: "transparent",
      ":hover": "rgba(27, 164, 231, 0.2)",
    },
  },
  twitterIcon: {
    marginRight: 3,
    marginLeft: 0,
    paddingLeft: 0,
  },
  writeupDescription: {
    margin: 5,
  },
});

export const genreStyles = stylex.create({
  tsukushi: {
    backgroundColor: "saddlebrown",
  },
  osint: {
    backgroundColor: "#27a4e7",
  },
  rev: {
    backgroundColor: "salmon",
  },
  web: {
    backgroundColor: "dodgerblue",
  },
  crypto: {
    backgroundColor: "gold",
  },
  misc: {
    backgroundColor: "limegreen",
  },
  hardware: {
    backgroundColor: "gray",
  },
  network: {
    backgroundColor: "mediumblue",
  },
  other: {
    backgroundColor: "black",
  },
});
