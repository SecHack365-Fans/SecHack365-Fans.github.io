import * as stylex from "@stylexjs/stylex";
import { s } from "../../styles/Footer.stylex";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div {...stylex.props(s.footer)}>
      © 2021-{year} SecHack365-Fans. All Rights Reserved.
    </div>
  );
};

export default Footer;
