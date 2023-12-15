import React from "react";
import { Layout } from "../../components/Layout";

import styles from "/styles/timer.module.css";

function getNextJanuary31st() {
  let date = new Date();

  if (date.getMonth() >= 1) {
    date.setFullYear(date.getFullYear() + 1);
  }

  date.setMonth(0);
  date.setDate(31);
  date.setHours(23);
  date.setMinutes(59);
  date.setSeconds(59);

  return date;
}

const DeadLine = getNextJanuary31st();
const NextEvent = (
  <>
    SecHack365&apos;{DeadLine.getFullYear() - 2001}
    <br />
    最終発表会まで(多分)
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

const Timer = () => {
  ShowDamedesu();
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

const ShowDamedesu = () => {
  console.log("＿人人人人人人人人人人＿");
  console.log("＞ 進捗ダメです！！ ＜");
  console.log("￣Y^Y^Y^Y^Y^Y^Y^Y^Y￣");
  console.log("                        _");
  console.log("                      _:~~");
  console.log("                    .::~:~.");
  console.log("                  .:~~:~~:~");
  console.log("                .~:~:~~::~:_");
  console.log("              .~~:~:~:~:~~:~");
  console.log("            .:~~:~:~~:~~:~~:~           `.");
  console.log("          .~:~~:~~:~:~:~::~`           .uM;");
  console.log("        . ~:~:~:~:~~~:~:~`           .JMMMN");
  console.log("      .Mb  :~~:~~:~:~:~`           .JMMMMMM]");
  console.log("    .MMMMc ~:~~:~~::~` ._:~__-... .MMMMMMMMM.");
  console.log("  .MMMMMMN  ::~::~~` ._:~~:~:~:~:..MMMMMMMMMb");
  console.log(" MMMMMMMMMb _~~:~`` _:~~:~~:~~~:~~ (MMMMMMMMMc");
  console.log(" dMMMMMMMMM, ~:~  _:~:~:~:~~:~:~:~_ MMMMMMMMM3");
  console.log(' .MMMMMMMMMb    .:~~:~:~~:~:~:~~:~~ ,MMMMMM"');
  console.log('  (MMMMMMMM@`    ``~~~~:~~:~:~:~~:~_ dMMM"');
  console.log("   HMMMMMB!                ``~~~:::~..MD");
  console.log("   ,MMM#/           ._::~:_-...");
  console.log("    d#^            _:~~~:~~~~:~~~~:~");
  console.log("                  ~:~~:~~:~:~~:~:~");
  console.log("                   ~:~:~:~:~:~:~");
  console.log("                   _~:~~~:~~:~");
  console.log("                    :~:~:~:~`");
  console.log("                    _~~:~~`");
  console.log("                     ~:~`");
  console.log("                      `");
};
