import stylex from "@stylexjs/stylex";

export const s = stylex.create({
  ctfList: {
    padding: "2%",
    listStyle: "none",
    display: "flex",
    flexWrap: "wrap",
  },
  ctfColumn: {
    width: "100%",
    fontSize: "1.4em",
    padding: "10px 0 10px 15px",
    marginBottom: "10px",
    borderRadius: "5px",
    borderLeftStyle: "solid",
    borderLeftWidth: "5px",
    borderLeftColor: "#5c9ee7",
    fontWeight: "bold",
    boxShadow: {
      default: "2px 2px 3px rgba(0, 0, 0, 0.3)",
      ":hover": "3px 3px 4px rgba(0, 0, 0, 0.4)",
    },
    cursor: "pointer",
    color: "#5c9ee7",
    backgroundColor: {
      default: "#f1f8ff",
      ":hover": "#deedfc",
    },
  },
  ctfLogo: {
    display: "flex",
    justifyContent: "center",
  },
  ctfLogoImage: {
    width: "80%",
    maxWidth: "800px",
    height: "auto",
  },
  ctfIcon: {
    marginRight: "10px",
  },
});
