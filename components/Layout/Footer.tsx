import { VFC } from "react";
import styles from "./Footer.module.css";

const Footer: VFC = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className={styles.footer}>
      © 2021-{year} SecHack365-Fans All Right Reserved.
    </div>
  );
};

export default Footer;
