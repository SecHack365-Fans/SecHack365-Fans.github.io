import stylex from "@stylexjs/stylex";

export const s = stylex.create({
  /* 背景 */
  backGround: {
    backgroundColor: "black",
  },
  title: {
    color: "white",
    fontSize: "2em",
    fontWeight: "bold",
  },

  /* 現在時刻 */
  realTimeClock: {
    textAlign: "center",
    color: "#ff0000",
    fontSize: "2.5em",
    fontWeight: "bold",
    fontStyle: "italic",
  },

  /* カウントダウンタイマー */
  countDown: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    fontSize: "3em",
    width: "70%",
    height: "6em",
    backgroundImage: 'url("/images/timer_warning.jpg")',
    backgroundSize: "100% 100%",
  },
  countDownText: {
    fontWeight: "bold",
    fontStyle: "italic",
  },
});
