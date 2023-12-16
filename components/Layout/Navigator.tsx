import React, { useState, useEffect } from "react";
import Link from "next/link";
import { s } from "../../styles/Navigator.stylex";
import stylex, { StaticStyles } from "@stylexjs/stylex";

// TODO: いずれお前は消す
import { IconButton, Menu } from "@mui/material";
import {
  FaGithub,
  FaEllipsisV,
  FaBook,
  FaStopwatch,
  FaFlag,
} from "react-icons/fa";

type pageTitleType = {
  title: string;
  href: string;
  icon?: JSX.Element;
  styles: StaticStyles[];
  onlyIcon?: boolean;
};

const pageTitles: pageTitleType[] = [
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
    onlyIcon: true,
  },
];

/**
 * ナビゲーションバー
 */
const Navigator = () => {
  const stateProps: {
    mobileView: boolean;
    anchorEl: null | (EventTarget & HTMLElement);
  } = {
    mobileView: false,
    anchorEl: null,
  };
  const [state, setState] = useState(stateProps);
  const { mobileView, anchorEl } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 600
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());

    return () => {
      window.removeEventListener("resize", () => setResponsiveness());
    };
  }, []);

  /**
   * 画面の横幅が広い時のナビゲーションバー
   */
  const displayDesktop = (): JSX.Element => {
    return (
      <div {...stylex.props(s.navbar)}>
        {pageTitles.map((pageTitle, idx) => (
          <Link
            href={pageTitle.href}
            key={pageTitle.href}
            passHref
            {...stylex.props(...pageTitle.styles, s.navLink)}
          >
            {pageTitle.onlyIcon ? pageTitle.icon : pageTitle.title}
          </Link>
        ))}
      </div>
    );
  };

  /**
   * 画面の横幅が狭い時のナビゲーションバー(ハンバーガーメニュー)
   */
  const displayMobile = (): JSX.Element => {
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
      setState((prevState) => ({
        ...prevState,
        anchorEl: event.currentTarget,
      }));
    };
    const handleClose = () => {
      setState((prevState) => ({
        ...prevState,
        anchorEl: null,
      }));
    };

    return (
      <div {...stylex.props(s.navbar)}>
        <Link href="/" passHref {...stylex.props(s.button, s.home)}>
          TOP
        </Link>
        <IconButton
          size="large"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
          {...stylex.props(s.navLink)}
        >
          <FaEllipsisV style={{ color: "#eee" }} />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          {...stylex.props(s.menu)}
        >
          {pageTitles
            .filter((pageTitle) => pageTitle.title !== "TOP")
            .map((page) => (
              <div key={page.title} {...stylex.props(s.menuItem)}>
                <Link
                  href={page.href}
                  passHref
                  {...stylex.props(s.menuItemButton)}
                >
                  <span {...stylex.props(s.icon)}>{page.icon ?? ""}</span>
                  {page.title}
                </Link>
              </div>
            ))}
        </Menu>
      </div>
    );
  };

  return mobileView ? displayMobile() : displayDesktop();
};

export default Navigator;
