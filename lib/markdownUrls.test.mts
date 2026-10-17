import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  resolveMarkdownImageUrl,
  resolveMarkdownLinkUrl,
} from "./markdownUrls.ts";

describe("Markdown URL resolution", () => {
  it("keeps site and external links unchanged", () => {
    assert.equal(
      resolveMarkdownLinkUrl("/ctf/TsukuCTF2021/other", "event", "post"),
      "/ctf/TsukuCTF2021/other",
    );
    assert.equal(
      resolveMarkdownLinkUrl("https://example.com", "event", "post"),
      "https://example.com",
    );
  });

  it("points attached files to their GitHub source", () => {
    assert.equal(
      resolveMarkdownLinkUrl("./main.go", "TsukuCTF2021", "journey"),
      "https://github.com/SecHack365-Fans/SecHack365-Fans.github.io/blob/master/pages/ctf/TsukuCTF2021/writeups/journey/main.go",
    );
  });

  it("points relative images to raw GitHub content", () => {
    assert.equal(
      resolveMarkdownImageUrl("images/flag.png", "TsukuCTF2022", "example"),
      "https://raw.githubusercontent.com/SecHack365-Fans/SecHack365-Fans.github.io/master/pages/ctf/TsukuCTF2022/writeups/example/images/flag.png",
    );
  });
});
