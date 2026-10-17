const rawContentRoot =
  "https://raw.githubusercontent.com/SecHack365-Fans/SecHack365-Fans.github.io/master/pages/ctf";
const repositoryRoot =
  "https://github.com/SecHack365-Fans/SecHack365-Fans.github.io/blob/master/pages/ctf";

const isExternalUrl = (url: string) => /^[a-z][a-z\d+.-]*:/i.test(url);

export const resolveMarkdownImageUrl = (
  src: string,
  ctfId: string,
  postId: string,
) => {
  if (isExternalUrl(src)) {
    return src;
  }
  if (src.startsWith("//")) {
    return `https:${src}`;
  }

  const baseUrl = `${rawContentRoot}/${encodeURIComponent(ctfId)}/writeups/${encodeURIComponent(postId)}/`;
  return new URL(src, baseUrl).toString();
};

export const resolveMarkdownLinkUrl = (
  href: string,
  ctfId: string,
  postId: string,
) => {
  if (
    isExternalUrl(href) ||
    href.startsWith("//") ||
    href.startsWith("/") ||
    href.startsWith("#")
  ) {
    return href;
  }

  const baseUrl = `${repositoryRoot}/${encodeURIComponent(ctfId)}/writeups/${encodeURIComponent(postId)}/`;
  return new URL(href, baseUrl).toString();
};
