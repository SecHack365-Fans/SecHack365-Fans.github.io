import stylex from "@stylexjs/stylex";

export const s = stylex.create({
  /* 表全体 */
  courseTables: {
    maxWidth: 1300,
    margin: "auto",
    padding: 15,
  },

  /* 各コースの表 */
  courseTable: {
    tableLayout: "fixed",
    width: "100%",
  },
  sh365_name: {
    width: "10%",
  },
  sh365_title: {
    width: "30%",
  },
  sh365_blog: {
    width: "15%",
  },
  sh365_hack: {
    width: "40%",
  },

  /* 横長の各コースのタイトル */
  coursettl: {
    display: "block",
    textAlign: "center",
    maxWidth: 1300,
    backgroundColor: "#f8e44c",
    padding: 20,
    margin: "0 auto 20px",
    fontSize: "1.3rem",
    borderRadius: 10,
    color: "#000",
    overflow: "hidden",
    position: "relative",
    fontWeight: "normal",
  },
  courceId: {
    fontSize: "6.5rem",
    display: "inline-block",
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translate(10px, -50%)",
    opacity: 0.3,
    fontFamily:
      '"Hiragino Kaku Gothic ProN", "游ゴシック Medium", "YuGothic", "YuGothicM", "メイリオ", "Meiryo", sans-serif',
    fontWeight: 700,
  },

  /* 一番下のロゴ */
  logo: {
    textAlign: "center",
  },
  logoImg: {
    width: "40%",
    height: "auto",
  },
});
