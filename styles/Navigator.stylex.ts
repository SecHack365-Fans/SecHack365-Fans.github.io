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
      ":last-child": "auto",
    },
    marginRight: {
      ":last-child": "2%",
    },
  },
  github: {
    scale: {
      ":last-child": 1.5,
    },
  },

  button: {
    fontSize: "1em",
    textTransform: "none",
    backgroundColor: {
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
