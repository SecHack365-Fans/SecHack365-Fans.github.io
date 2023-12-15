import { FC } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Navigator from "./Navigator";

export const Layout: FC<{
  children?: React.ReactNode;
  title?: string;
  description?: string;
}> = ({ children, title, description }) => (
  <div>
    <Header title={title} description={description} />
    <Navigator />
    <div style={{ padding: "15px" }}>{children}</div>
    <Footer />
  </div>
);
