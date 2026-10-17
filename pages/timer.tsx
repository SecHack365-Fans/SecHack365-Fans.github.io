import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { s } from "../styles/timer.stylex";
import * as stylex from "@stylexjs/stylex";

// NOTE: StyleXでローカルフォントの指定の方法がわからなかった
import styles from "/styles/timerFont.module.css";

type ClockState = {
  now: Date;
  eventYear: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  centiseconds: number;
};

const getDeadline = (now: Date) => {
  const year = now.getMonth() >= 1 ? now.getFullYear() + 1 : now.getFullYear();
  return new Date(year, 0, 31, 23, 59, 59, 999);
};

const getClockState = (now: Date): ClockState => {
  const deadline = getDeadline(now);
  const remainingCentiseconds = Math.max(
    0,
    Math.floor((deadline.getTime() - now.getTime()) / 10),
  );
  const centisecondsPerDay = 24 * 60 * 60 * 100;
  const centisecondsPerHour = 60 * 60 * 100;
  const centisecondsPerMinute = 60 * 100;

  return {
    now,
    eventYear: deadline.getFullYear() - 2001,
    days: Math.floor(remainingCentiseconds / centisecondsPerDay),
    hours: Math.floor(
      (remainingCentiseconds % centisecondsPerDay) / centisecondsPerHour,
    ),
    minutes: Math.floor(
      (remainingCentiseconds % centisecondsPerHour) / centisecondsPerMinute,
    ),
    seconds: Math.floor((remainingCentiseconds % centisecondsPerMinute) / 100),
    centiseconds: remainingCentiseconds % 100,
  };
};

const formatCountdownPart = (value: number) => String(value).padStart(2, "0");

const RealTimeClock = () => {
  const [clock, setClock] = useState<ClockState>();

  useEffect(() => {
    const updateClock = () => setClock(getClockState(new Date()));
    updateClock();
    const intervalId = window.setInterval(updateClock, 10);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div {...stylex.props(s.realTimeClock)}>
        現実世界の時刻
        <br />
        {clock?.now.toLocaleTimeString() ?? "Wait..."}
      </div>
      <div {...stylex.props(s.countDown)}>
        <div {...stylex.props(s.countDownText)}>
          SecHack365&apos;{clock?.eventYear}
          <br />
          最終発表会まで(多分)
          <br />
          <span className={styles.countDownTimer}>{clock?.days}</span>日{" "}
          <span className={styles.countDownTimer}>
            {formatCountdownPart(clock?.hours ?? 0)}
          </span>
          :
          <span className={styles.countDownTimer}>
            {formatCountdownPart(clock?.minutes ?? 0)}
          </span>
          :
          <span className={styles.countDownTimer}>
            {formatCountdownPart(clock?.seconds ?? 0)}
          </span>
          .
          <span className={styles.countDownTimer}>
            {formatCountdownPart(clock?.centiseconds ?? 0)}
          </span>
        </div>
      </div>
    </div>
  );
};

const Timer = () => {
  useEffect(showProgressWarning, []);

  return (
    <Layout title="限界タイマー">
      <div {...stylex.props(s.backGround)}>
        <div>
          <p {...stylex.props(s.title)}>†限界タイマー†</p>
        </div>
        <RealTimeClock />
      </div>
    </Layout>
  );
};

export default Timer;

const showProgressWarning = () => {
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
