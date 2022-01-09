import React, { VFC } from "react";
import { Layout } from "../../components/Layout";

import styles from "/styles/timer.module.css";

const DeadLine = new Date("2022/1/31/0:0");
const NextEvent = (
  <>
    SecHack365&apos;21
    <br />
    最終発表会まで
  </>
);

type ClockPropsType = {};
type ClockStateType = Partial<{
  date: Date | string;
  diffDays: number | undefined;
  diffHours: number | undefined;
  diffMinutes: number | undefined;
  diffSeconds: number | undefined;
  diffMilliSeconds: number | undefined;
}>;
class RealTimeClock extends React.Component<ClockPropsType, ClockStateType> {
  constructor(props: ClockPropsType) {
    super(props);
    this.state = {
      date: "Wait...",
    };
  }

  componentDidMount() {
    setInterval(() => this.tick(), 10);
  }

  tick() {
    const date = new Date();
    const diff = DeadLine.getTime() - date.getTime();
    const diffDays = diff / (1000 * 60 * 60 * 24);
    const diffHour = (diffDays - Math.floor(diffDays)) * 24;
    const diffMinute = (diffHour - Math.floor(diffHour)) * 60;
    const diffSecond = (diffMinute - Math.floor(diffMinute)) * 60;
    const diffMilliSecond = (diffSecond - Math.floor(diffSecond)) * 100;

    this.setState({
      date: date,
      diffDays: Math.floor(diffDays),
      diffHours: Math.floor(diffHour),
      diffMinutes: Math.floor(diffMinute),
      diffSeconds: Math.floor(diffSecond),
      diffMilliSeconds: Math.floor(diffMilliSecond),
    });
  }

  zeroPadding = (num: number, length: number) => {
    return ("0000000000" + num).slice(-length);
  };

  toCountDownFormat = (value: number | undefined, padding: number) => {
    if (typeof value === "undefined") {
      return <></>;
    } else {
      return (
        <span className={styles.countDownTimer}>
          {this.zeroPadding(value, padding)}
        </span>
      );
    }
  };

  render() {
    return (
      <div>
        <div className={styles.realTimeClock}>
          現実世界の時刻
          <br />
          {typeof this.state.date == "string"
            ? this.state.date
            : this.state.date?.toLocaleTimeString() ?? ""}
        </div>
        <div className={styles.countDown}>
          <div className={styles.countDownText}>
            {NextEvent}
            <br />
            <span className={styles.countDownTimer}>{this.state.diffDays}</span>
            日 {this.toCountDownFormat(this.state.diffHours, 2)}:
            {this.toCountDownFormat(this.state.diffMinutes, 2)}:
            {this.toCountDownFormat(this.state.diffSeconds, 2)}.
            {this.toCountDownFormat(this.state.diffMilliSeconds, 2)}
          </div>
        </div>
      </div>
    );
  }
}

const Timer: VFC = () => {
  return (
    <Layout title="" description="">
      <div className={styles.backGround}>
        <div>
          <p className={styles.title}>†限界タイマー†</p>
        </div>
        <RealTimeClock />
      </div>
    </Layout>
  );
};

export default Timer;
