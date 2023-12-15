import React, { useState, useEffect } from "react";
import Link from "next/link";

// TODO: いずれお前は消す
import { Stack, Button, IconButton, Menu, MenuItem } from "@mui/material";
import {
  GitHub,
  MoreVert,
  Description,
  Alarm,
  EmojiFlags,
} from "@mui/icons-material";

import styles from "./Navigator.module.css";

type pageTitleType = {
  title: string;
  href: string;
  position: "left" | "right";
  icon?: JSX.Element;
  styles?: string | undefined;
  onlyIcon?: boolean | undefined;
};

const pageTitles: pageTitleType[] = [
  {
    title: "TOP",
    href: "/",
    styles: `${styles.button} ${styles.home}`,
    position: "left",
  },
  {
    title: "参加記",
    href: "/blog",
    icon: <Description />,
    styles: `${styles.button} ${styles.otherLink}`,
    position: "left",
  },
  {
    title: "†締切駆動コース†",
    href: "/timer",
    icon: <Alarm />,
    styles: `${styles.button} ${styles.otherLink}`,
    position: "left",
  },
  {
    title: "TsukuCTF",
    href: "/ctf",
    icon: <EmojiFlags />,
    styles: `${styles.button} ${styles.otherLink}`,
    position: "left",
  },
  {
    title: "GitHub",
    href: "https://github.com/SecHack365-Fans/SecHack365-Fans.github.io",
    icon: <GitHub />,
    styles: `${styles.button} ${styles.otherLink} ${styles.right}`,
    position: "right",
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
      <Stack spacing={1} direction="row" className={styles.navbar}>
        <span className={styles.left}>
          {pageTitles
            .filter((pageTitle) => pageTitle.position === "left")
            .map((pageTitle) => (
              <Link href={pageTitle.href} key={pageTitle.href} passHref>
                <Button variant="text" className={pageTitle.styles}>
                  {pageTitle.onlyIcon ? pageTitle.icon : pageTitle.title}
                </Button>
              </Link>
            ))}
        </span>
        <span className={styles.right}>
          {pageTitles
            .filter((pageTitle) => pageTitle.position === "right")
            .map((pageTitle) => (
              <Link href={pageTitle.href} key={pageTitle.href} passHref>
                <Button variant="text" className={pageTitle.styles}>
                  {pageTitle.onlyIcon ? pageTitle.icon : pageTitle.title}
                </Button>
              </Link>
            ))}
        </span>
      </Stack>
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
      <Stack spacing={1} direction="row" className={styles.navbar}>
        <span className={styles.left}>
          <Link href="/" passHref>
            <Button
              variant="text"
              className={`${styles.button} ${styles.home}`}
            >
              TOP
            </Button>
          </Link>
        </span>
        <span className={styles.right}>
          <IconButton
            size="large"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MoreVert style={{ color: "#eee" }} />
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
            className={styles.menu}
          >
            {pageTitles
              .filter((pageTitle) => pageTitle.title !== "TOP")
              .map((page) => (
                <MenuItem key={page.title} className={styles.menuItem}>
                  <Link href={page.href} passHref>
                    <Button
                      variant="text"
                      className={styles.menuItemButton}
                      onClick={handleClose}
                    >
                      <span className={styles.icon}>{page.icon ?? ""}</span>
                      {page.title}
                    </Button>
                  </Link>
                </MenuItem>
              ))}
          </Menu>
        </span>
      </Stack>
    );
  };

  return mobileView ? displayMobile() : displayDesktop();
};

export default Navigator;
