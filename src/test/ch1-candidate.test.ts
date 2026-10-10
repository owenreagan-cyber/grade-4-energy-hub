import { describe, expect, it } from "vitest";
import { getChapter1Candidate } from "@/lib/ch1-candidate";

describe("Prompt 2 candidate asset selection", () => {
  it("selects the original candidate student PDF when the key is off", () => {
    const candidate = getChapter1Candidate(false);
    expect(candidate.url).toContain("production/candidates/chapter-01/guided-notes-polish/01-ch1-energy-causes-change-guided-notes-polish.pdf");
    expect(candidate.filename).toBe("01-ch1-energy-causes-change-guided-notes-polish.pdf");
  });

  it("selects the separate original teacher PDF when the key is on", () => {
    const candidate = getChapter1Candidate(true);
    expect(candidate.url).toContain("production/candidates/chapter-01/guided-notes-polish/01-ch1-energy-causes-change-guided-notes-polish-key.pdf");
    expect(candidate.filename).toBe("01-ch1-energy-causes-change-guided-notes-polish-key.pdf");
    expect(candidate.url).not.toBe(getChapter1Candidate(false).url);
  });
});