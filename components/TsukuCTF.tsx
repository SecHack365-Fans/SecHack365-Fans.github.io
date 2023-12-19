import { Layout } from "./Layout";
import Link from "next/link";
import { TwitterButton } from "./TwitterButton";
import { genre2Style, AllPostedData, postSortCb } from "./writeup";
import stylex from "@stylexjs/stylex";
import { s } from "../styles/writeups.stylex";

const CTFDescription = ({ date }: { date: string }) => {
  return (
    <div {...stylex.props(s.ctfDetails)}>
      <a
        href="https://tsukuctf.sechack365.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="../../../images/tsukuctf-logo.png"
          alt="TsukuCTF"
          {...stylex.props(s.ctfLogo)}
        />
      </a>
      <div {...stylex.props(s.ctfLink)}>{date}</div>
      <div {...stylex.props(s.ctfLink)}>
        Follow us on{" "}
        <a
          href="https://x.com/tsukuctf"
          target="_blank"
          rel="noopener noreferer noreferrer"
        >
          X(@tsukuctf)
        </a>{" "}
        or Discord
      </div>
    </div>
  );
};

export const TsukuCTFWriteup = ({
  allPostsData,
  ctfId,
  date,
}: AllPostedData) => {
  return (
    <Layout title={`${ctfId} Writeups`} description={`${ctfId} Writeups`}>
      <h1>{ctfId}</h1>
      <CTFDescription date={date} />
      <hr />
      <div {...stylex.props(s.writeups)}>
        <h2>Writeups</h2>
        <ul {...stylex.props(s.ctfWriteupUl)}>
          {allPostsData
            .sort((a, b) => postSortCb(a, b))
            .map(({ id, title, description, author, genre, solver, point }) => (
              <Link
                href={`/ctf/${ctfId}/${id}`}
                key={id}
                passHref
                {...stylex.props(s.writeupLink)}
              >
                <li {...stylex.props(s.ctfWriteupList)}>
                  <div {...stylex.props(s.writeupTitle)}>{title}</div>
                  <div {...stylex.props(s.writeupMeta)}>
                    <div {...stylex.props(s.writeupMetaBox)}>
                      Genre:
                      <span
                        {...stylex.props(
                          s.writeupGenre,
                          genre ? genre2Style(genre) : {},
                        )}
                      >
                        {genre}
                      </span>
                    </div>
                    <div {...stylex.props(s.writeupMetaBox)}>
                      Author:
                      <TwitterButton authors={author} />
                    </div>
                    <div {...stylex.props(s.writeupMetaBox)}>
                      Point: {point}
                    </div>
                    <div {...stylex.props(s.writeupMetaBox)}>
                      Solver: {solver}
                    </div>
                  </div>
                  <span {...stylex.props(s.writeupDescription)}>
                    {description}
                  </span>
                </li>
              </Link>
            ))}
        </ul>
      </div>
    </Layout>
  );
};
