import { Layout } from "./Layout";
import Link from "next/link";
import { TwitterButton } from "./TwitterButton";
import { comparePosts, getGenreStyle } from "./writeup";
import * as stylex from "@stylexjs/stylex";
import type { PostIndexProps } from "../lib/posts";
import { s } from "../styles/writeups.stylex";

type TsukuCtfPageProps = PostIndexProps & {
  ctfId: string;
  date: string;
};

const CTFDescription = ({ date }: { date: string }) => {
  return (
    <div {...stylex.props(s.ctfDetails)}>
      <a
        href="https://tsukuctf.sechack365.com/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/images/tsukuctf-logo.png"
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
          rel="noopener noreferrer"
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
}: TsukuCtfPageProps) => {
  return (
    <Layout title={`${ctfId} Writeups`} description={`${ctfId} Writeups`}>
      <h1>{ctfId}</h1>
      <CTFDescription date={date} />
      <hr />
      <div {...stylex.props(s.writeups)}>
        <h2>Writeups</h2>
        <ul {...stylex.props(s.ctfWriteupUl)}>
          {[...allPostsData]
            .sort(comparePosts)
            .map(({ id, title, description, author, genre, solver, point }) => (
              <li key={id} {...stylex.props(s.ctfWriteupList)}>
                <Link
                  href={`/ctf/${ctfId}/${id}`}
                  {...stylex.props(s.writeupLink)}
                >
                  <div {...stylex.props(s.writeupTitle)}>{title}</div>
                  <div {...stylex.props(s.writeupMeta)}>
                    <div {...stylex.props(s.writeupMetaBox)}>
                      Genre:
                      <span
                        {...stylex.props(
                          s.writeupGenre,
                          genre ? getGenreStyle(genre) : {},
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
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </Layout>
  );
};

export const createPostIndexPage = (ctfId: string, date: string) => {
  const PostIndexPage = ({ allPostsData }: PostIndexProps) => (
    <TsukuCTFWriteup allPostsData={allPostsData} ctfId={ctfId} date={date} />
  );

  PostIndexPage.displayName = `${ctfId}IndexPage`;
  return PostIndexPage;
};
