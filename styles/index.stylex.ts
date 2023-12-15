import stylex from "@stylexjs/stylex";

export const s = stylex.create({
  /* 「注意」の枠線 */
  cautionBox: {
    textAlign: "center",
    position: "relative",
    margin: "2em",
    padding: "0.5em 1em",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "#000",
    borderRadius: "8px",
    fontSize: "1.2em",
  },
  cautionBoxTitle: {
    position: "absolute",
    display: "inline-block",
    top: "-13px",
    left: "10px",
    padding: "0px 9px",
    lineHeight: "1",
    fontSize: "19px",
    fontWeight: "bold",
    backgroundColor: "#fff",
    color: "#000000",
  },
  noPadMergin: {
    margin: 0,
    padding: 0,
  },
  /* 非公式の文字 */
  unofficial: {
    color: "red",
    fontSize: "2em",
    margin: 0,
    fontWeight: "bold",
  },

  /* 公式サイトへのリンク */
  officialLink: {
    display: "flex",
    margin: 0,
    padding: "10px",
    justifyContent: "center",
    wordBreak: "break-all",
  },

  officialLinkA: {
    padding: "10px",
    width: "25%",
    maxWidth: "8em",
    minWidth: "2em",
    textAlign: "center",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: "#353a40",
    margin: "2px",
    color: "#353a40",
    backgroundColor: {
      ":hover": "#f7ea8e",
    },
    transform: {
      ":hover": "scale(1.05)",
    },
  },

  /* トップ画像 */
  gamingSecHack: {
    textAlign: "center",
  },
});
