import { useEffect, useState, type JSX, type MouseEvent } from "react";
import Link from "next/link";
import { IconButton, Menu } from "@mui/material";
import * as stylex from "@stylexjs/stylex";
import type { StaticStyles } from "@stylexjs/stylex";
import {
  FaBook,
  FaEllipsisV,
  FaFlag,
  FaGithub,
  FaStopwatch,
} from "react-icons/fa";

import { s } from "../../styles/Navigator.stylex";

type NavigationItem = {
  title: string;
  href: string;
  icon?: JSX.Element;
  styles: StaticStyles[];
  iconOnly?: boolean;
};

const navigationItems: NavigationItem[] = [
  {
    title: "TOP",
    href: "/",
    styles: [s.button, s.home],
  },
  {
    title: "参加記",
    href: "/blog",
    icon: <FaBook />,
    styles: [s.button, s.otherLink],
  },
  {
    title: "†締切駆動コース†",
    href: "/timer",
    icon: <FaStopwatch />,
    styles: [s.button, s.otherLink],
  },
  {
    title: "TsukuCTF",
    href: "/ctf",
    icon: <FaFlag />,
    styles: [s.button, s.otherLink],
  },
  {
    title: "GitHub",
    href: "https://github.com/SecHack365-Fans/SecHack365-Fans.github.io",
    icon: <FaGithub />,
    styles: [s.button, s.otherLink],
    iconOnly: true,
  },
];

const DesktopNavigation = () => (
  <div {...stylex.props(s.navbar)}>
    {navigationItems.map((item) => (
      <Link
        href={item.href}
        key={item.href}
        aria-label={item.iconOnly ? item.title : undefined}
        {...stylex.props(...item.styles, s.navLink)}
      >
        {item.iconOnly ? item.icon : item.title}
      </Link>
    ))}
  </div>
);

type MobileNavigationProps = {
  anchorElement: HTMLElement | null;
  onOpen: (event: MouseEvent<HTMLElement>) => void;
  onClose: () => void;
};

const MobileNavigation = ({
  anchorElement,
  onOpen,
  onClose,
}: MobileNavigationProps) => (
  <div {...stylex.props(s.navbar)}>
    <Link href="/" {...stylex.props(s.button, s.home)}>
      TOP
    </Link>
    <IconButton
      size="large"
      aria-controls="menu-appbar"
      aria-haspopup="true"
      aria-expanded={Boolean(anchorElement)}
      aria-label="メニューを開く"
      onClick={onOpen}
      color="inherit"
      {...stylex.props(s.navLink)}
    >
      <FaEllipsisV style={{ color: "#eee" }} />
    </IconButton>
    <Menu
      id="menu-appbar"
      anchorEl={anchorElement}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(anchorElement)}
      onClose={onClose}
      {...stylex.props(s.menu)}
    >
      {navigationItems.slice(1).map((item) => (
        <div key={item.href} {...stylex.props(s.menuItem)}>
          <Link
            href={item.href}
            onClick={onClose}
            {...stylex.props(s.menuItemButton)}
          >
            <span {...stylex.props(s.icon)}>{item.icon}</span>
            {item.title}
          </Link>
        </div>
      ))}
    </Menu>
  </div>
);

const Navigator = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 599px)");
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  if (!isMobile) {
    return <DesktopNavigation />;
  }

  return (
    <MobileNavigation
      anchorElement={anchorElement}
      onOpen={(event) => setAnchorElement(event.currentTarget)}
      onClose={() => setAnchorElement(null)}
    />
  );
};

export default Navigator;
