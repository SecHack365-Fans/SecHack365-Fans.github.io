import { Layout } from "../../components/Layout";
import Link from "next/link";
import stylex from "@stylexjs/stylex";
import { s } from "../../styles/ctf.stylex";

const ctfIds = [
  {
    id: "TsukuCTF2021",
    icon: "🍜",
  },
  {
    id: "TsukuCTF2022",
    icon: "🚌",
  },
  {
    id: "TsukuCTF2023",
    icon: "🌞",
  },
];

const CTF = () => {
  return (
    <Layout title="CTF" description="開催したCTF一覧">
      <h1>TsukuCTF Writeups</h1>
      <div {...stylex.props(s.ctfLogo)}>
        <img
          src="../../../images/tsukuctf-logo.png"
          alt="TsukuCTF"
          {...stylex.props(s.ctfLogoImage)}
        />
      </div>
      <ul {...stylex.props(s.ctfList)}>
        {ctfIds.map((ctf) => (
          <Link
            href={`/ctf/${ctf.id}`}
            key={ctf.id}
            passHref
            {...stylex.props(s.ctfColumn)}
          >
            <li>
              <span {...stylex.props(s.ctfIcon)}>{ctf.icon}</span>
              <span>{ctf.id}</span>
            </li>
          </Link>
        ))}
      </ul>
    </Layout>
  );
};

export default CTF;
