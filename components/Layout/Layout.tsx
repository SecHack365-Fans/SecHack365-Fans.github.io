import { FC } from "react";

import Header from "./Header";
import Footer from "./Footer";
import Navigator from "./Navigator";

export const Layout: FC<{
  headerChild?: JSX.Element;
  title?: string;
  description?: string;
}> = ({ children, title, description }) => (
  <div>
    <Header title={title} description={description} />
    <div>
      <Navigator />
      <div>{children}</div>
      <Footer />
    </div>
  </div>
);
