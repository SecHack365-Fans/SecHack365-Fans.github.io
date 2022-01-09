import { VFC } from "react";

const Footer: VFC = () => {
  const date = new Date();
  const year = date.getFullYear();
  return <div>© 2021-{year} SecHack365-Fans All Right Reserved.</div>;
};

export default Footer;
