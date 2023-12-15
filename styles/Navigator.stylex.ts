import stylex from "@stylexjs/stylex";

export const s = stylex.create({
  /* ナビゲーションバー */
  navbar: {
    backgroundColor: "#353a40",
    height: "3em",
    paddingLeft: "2%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  navLink: {
    marginLeft: {
      default: 5,
      ":last-child": "auto",
    },
    marginRight: {
      default: 5,
      ":last-child": "2%",
    },
  },

  button: {
    fontSize: "1em",
    color: "#eee",
    borderWidth: 0,
    borderRadius: "5px",
    height: "100%",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: "0px 10px",
    backgroundColor: {
      default: "#353a40",
      ":hover": "#434952",
    },
  },

  home: {
    color: "#eee",
    fontWeight: "bold",
  },

  otherLink: {
    color: "rgb(190, 190, 190)",
  },

  /* 右上のメニューバー */
  menu: {
    position: "absolute",
    margin: "25px",
    padding: "0px",
  },
  menuItem: {
    display: "block",
    width: 300,
    padding: "8px 16px",
    textDecoration: "none",
    backgroundColor: {
      default: "#353a40",
      ":hover": "#434952",
    },
  },
  menuItemButton: {
    color: "#eee",
    textTransform: "none",
  },

  icon: {
    marginRight: "3px",
  },
});
