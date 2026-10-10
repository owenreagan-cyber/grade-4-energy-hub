import notesUrl from "../../production/candidates/chapter-01/guided-notes-polish/01-ch1-energy-causes-change-guided-notes-polish.pdf?url";
import keyUrl from "../../production/candidates/chapter-01/guided-notes-polish/01-ch1-energy-causes-change-guided-notes-polish-key.pdf?url";

export function getChapter1Candidate(showKey: boolean) {
  return {
    url: showKey ? keyUrl : notesUrl,
    label: showKey ? "Teacher answer key" : "Student guided notes",
    filename: `01-ch1-energy-causes-change-guided-notes-polish${showKey ? "-key" : ""}.pdf`,
  };
}