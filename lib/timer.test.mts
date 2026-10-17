import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { formatCountdownPart, getClockState, getDeadline } from "./timer.ts";

describe("countdown timer", () => {
  it("targets this year's presentation in January", () => {
    const now = new Date(2026, 0, 1);
    assert.equal(getDeadline(now).getFullYear(), 2026);
    assert.equal(getClockState(now).eventYear, 25);
  });

  it("targets next year's presentation after January", () => {
    const now = new Date(2026, 1, 1);
    assert.equal(getDeadline(now).getFullYear(), 2027);
    assert.equal(getClockState(now).eventYear, 26);
  });

  it("formats each countdown segment with at least two digits", () => {
    assert.equal(formatCountdownPart(7), "07");
    assert.equal(formatCountdownPart(123), "123");
  });
});
