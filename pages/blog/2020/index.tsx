import { VFC } from "react";
import { Layout } from "../../../components/Layout";
import styles from "/styles/blog.module.css";

// 表現駆動のエントリデータ
const ExprData = require("./data/expr.json");

// 学習駆動コースのデータ
const StudyData = require("./data/study.json");

// 開発駆動のエントリデータ
const DevData = require("./data/dev.json");

// 思索駆動のエントリデータ
const ThinkData = require("./data/think.json");

// 研究駆動のエントリデータ
const ResearchData = require("./data/research.json");

// コース一覧
const Courses = [
  {
    courseName: "表現駆動",
    courseData: ExprData,
    styles: styles.c01,
  },
  {
    courseName: "学習駆動",
    courseData: StudyData,
    styles: styles.c02,
  },
  {
    courseName: "開発駆動",
    courseData: DevData,
    styles: styles.c03,
  },
  {
    courseName: "思索駆動",
    courseData: ThinkData,
    styles: styles.c04,
  },
  {
    courseName: "研究駆動",
    courseData: ResearchData,
    styles: styles.c05,
  },
];

/**
 * TableRow でのみの使用を想定している
 * @param {string} title - 作品のタイトル
 * @param {string} href - 作品へのリンク
 * @returns {JSX.Element} - 多分
 */
const AchivementLink = ({ title, href }: { title: string; href: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {title}
  </a>
);

/**
 * テーブルの1行
 * @param {string} author - 参加者の名前
 * @param {string} title - 参加記のタイトル
 * @param {string} blogHRef - 参加記への href
 * @param {string} blogHostedAt - 参加記をホスティングしてるドメイン
 * @param {Array<{title: string, href: string}>} achivements - 作品のタイトルとリンク
 * @returns {JSX.Element} - 多分
 */
type tableRowType = {
  author: string;
  title: string;
  blogHRef: string;
  blogHostedAt: string;
  achivements: Array<{ title: string; href: string }>;
};
const TableRow = ({
  author,
  title,
  blogHRef,
  blogHostedAt,
  achivements,
}: tableRowType) => (
  <tr>
    <td className={styles.sh365_name}>{author}</td>
    <td className={styles.sh365_title}>{title}</td>
    <td className={styles.sh365_blog}>
      <a href={blogHRef} target="_blank" rel="noopener noreferrer">
        {blogHostedAt}
      </a>
    </td>
    <td className={styles.sh365_hack}>
      {achivements.length > 0 && (
        <>
          {/* 2つ目以降の作品のリンクの前には <br /> を入れたいので最初のだけ直接添字アクセスをして、それ以降を map で呼び出す */}
          <AchivementLink {...achivements[0]} />
          {achivements.slice(1).map((achivement) => (
            <span key={achivement.href}>
              <br />
              <AchivementLink {...achivement} />
            </span>
          ))}
        </>
      )}
    </td>
  </tr>
);

const Blog2020: VFC = () => {
  return (
    <Layout
      title="SecHack365 2020年度 参加記 まとめ"
      description="2020年度にSecHack365に参加したトレーニーによる参加ブログのまとめです。"
    >
      <h1>SecHack365 参加記 まとめ【随時更新】</h1>
      <p>
        2020年度にSecHack365に参加したトレーニーによる参加ブログのまとめです。(順不同)
      </p>
      {Courses.map((course) => (
        <div className={styles.courseTables} key={course.courseName}>
          <h2 className={`${styles.coursettl} ${styles.c0} ${course.styles}`}>
            {course.courseName}
          </h2>
          <div>
            <table className={styles.courseTable}>
              <tr className={styles.title}>
                <th className={styles.sh365_name}>名前</th>
                <th className={styles.sh365_title}>タイトル</th>
                <th className={styles.sh365_blog}>参加記</th>
                <th className={styles.sh365_hack}>成果物</th>
              </tr>
              {course.courseData.map((data: tableRowType) => (
                <TableRow {...data} key={data.author} />
              ))}
            </table>
          </div>
        </div>
      ))}
      <div className={styles.logo}>
        <a
          href="https://sechack365.nict.go.jp/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/logo-yoko.png" alt="SecHack365 logo" />
        </a>
      </div>
    </Layout>
  );
};

export default Blog2020;
