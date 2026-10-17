import { Layout } from "../../../components/Layout";
import * as stylex from "@stylexjs/stylex";
import { s } from "../../../styles/blog.stylex";

import developmentEntries from "./data/dev.json";
import expressionEntries from "./data/expr.json";
import researchEntries from "./data/research.json";
import studyEntries from "./data/study.json";
import thoughtEntries from "./data/think.json";

type Achievement = {
  title: string;
  href: string;
};

type Entry = {
  author: string;
  title: string;
  blogHRef: string;
  blogHostedAt: string;
  achivements: Achievement[];
};

type Course = {
  courseName: string;
  courseData: Entry[];
};

const courses: Course[] = [
  {
    courseName: "表現駆動",
    courseData: expressionEntries,
  },
  {
    courseName: "学習駆動",
    courseData: studyEntries,
  },
  {
    courseName: "開発駆動",
    courseData: developmentEntries,
  },
  {
    courseName: "思索駆動",
    courseData: thoughtEntries,
  },
  {
    courseName: "研究駆動",
    courseData: researchEntries,
  },
];

const AchievementLink = ({ title, href }: Achievement) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {title}
  </a>
);

const TableRow = ({
  author,
  title,
  blogHRef,
  blogHostedAt,
  achivements,
}: Entry) => (
  <tr>
    <td {...stylex.props(s.sh365_name)}>{author}</td>
    <td {...stylex.props(s.sh365_title)}>{title}</td>
    <td {...stylex.props(s.sh365_blog)}>
      <a href={blogHRef} target="_blank" rel="noopener noreferrer">
        {blogHostedAt}
      </a>
    </td>
    <td {...stylex.props(s.sh365_hack)}>
      {achivements.map((achievement, index) => (
        <span key={achievement.href}>
          {index > 0 && <br />}
          <AchievementLink {...achievement} />
        </span>
      ))}
    </td>
  </tr>
);

const Blog2020 = () => {
  return (
    <Layout
      title="SecHack365 2020年度 参加記 まとめ"
      description="2020年度にSecHack365に参加したトレーニーによる参加ブログのまとめです。"
    >
      <h1>SecHack365 参加記 まとめ【随時更新】</h1>
      <p>
        2020年度にSecHack365に参加したトレーニーによる参加ブログのまとめです。(順不同)
      </p>
      {courses.map((course, index) => (
        <div {...stylex.props(s.courseTables)} key={course.courseName}>
          <h2 {...stylex.props(s.coursettl)}>
            <span {...stylex.props(s.courseId)}>
              {String(index + 1).padStart(2, "0")}
            </span>
            {course.courseName}
          </h2>
          <div>
            <table {...stylex.props(s.courseTable)}>
              <thead>
                <tr>
                  <th {...stylex.props(s.sh365_name)}>名前</th>
                  <th {...stylex.props(s.sh365_title)}>タイトル</th>
                  <th {...stylex.props(s.sh365_blog)}>参加記</th>
                  <th {...stylex.props(s.sh365_hack)}>成果物</th>
                </tr>
              </thead>
              <tbody>
                {course.courseData.map((data) => (
                  <TableRow {...data} key={data.author} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
      <div {...stylex.props(s.logo)}>
        <a
          href="https://sechack365.nict.go.jp/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/logo-yoko.png"
            alt="SecHack365 logo"
            {...stylex.props(s.logoImg)}
          />
        </a>
      </div>
    </Layout>
  );
};

export default Blog2020;
