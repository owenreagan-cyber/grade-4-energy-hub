import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Presentation, PresentationFile } from "@oai/artifact-tool";

const workspaceDir = "/Users/owen/Projects/grade-4-energy-transfer-transformation";
const SKILL_DIR = "/Users/owen/.codex/plugins/cache/openai-primary-runtime/presentations/26.1007.11041/skills/presentations";
const RUNTIME_PYTHON = "/Users/owen/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3";
const buildDir = path.join(workspaceDir, ".codex-build", "ch1-candidate-v5");
const renderDir = path.join(workspaceDir, "work", "ch1-candidate-v2", "artifact-tool-renders-v5");
const FINAL_PPTX = path.join(workspaceDir, "production", "candidates", "chapter-01", "01-ch1-energy-causes-change-visual-candidate-v5.pptx");
const ASSET_DIR = path.join(workspaceDir, "assets", "ch1", "candidate-v2");

const C = {
  cream: "#F5EEDC", navy: "#1F2A5A", media: "#0E1428", gold: "#A67C16",
  amber: "#7A5620", ink: "#1B223C", white: "#FFFFFF", border: "#E4DAC4",
  mist: "#F6F7F9", soft: "#5A6072", paleGold: "#F3E8CF", paleNavy: "#E3E7F2",
};
const FONT = "Avenir Next";
const DISPLAY = "Georgia";
const W = 1280, H = 720;

const art = {
  opener: path.join(ASSET_DIR, "slide-01-opener.png"),
  room: path.join(ASSET_DIR, "slide-04-dark-bright.png"),
  pencil: path.join(ASSET_DIR, "slide-09-pencil-before-after.png"),
  energy: path.join(ASSET_DIR, "slide-10-energy.png"),
  shore: path.join(ASSET_DIR, "slide-14-seashore.png"),
  forms: path.join(ASSET_DIR, "slide-17-five-forms.png"),
  stored: path.join(ASSET_DIR, "slide-22-stored-energy.png"),
  storedExamples: path.join(ASSET_DIR, "slide-25-stored-examples.png"),
  evidence: path.join(ASSET_DIR, "slide-28-evidence.png"),
  reflection: path.join(ASSET_DIR, "slide-33-reflection.png"),
  close: path.join(ASSET_DIR, "slide-45-close.png"),
};
const artBytes = new Map();
for (const file of Object.values(art)) artBytes.set(file, await fs.readFile(file));

const presentation = Presentation.create({ slideSize: { width: W, height: H } });

function box(slide, x, y, w, h, fill = "none", line = "none", radius = 0, shadow = undefined, name = undefined) {
  return slide.shapes.add({
    geometry: radius ? "roundRect" : "rect", name,
    position: { left: x, top: y, width: w, height: h }, fill,
    line: { style: "solid", fill: line, width: line === "none" ? 0 : 1.2 },
    ...(radius ? { borderRadius: radius } : {}), ...(shadow ? { shadow } : {}),
  });
}

function txt(slide, value, x, y, w, h, {
  size = 36, color = C.ink, bold = false, italic = false, align = "left",
  valign = "top", face = FONT, fill = "none", line = "none", radius = 0,
  margin = 0, name = undefined, autoFit = "shrinkText",
} = {}) {
  const shape = box(slide, x, y, w, h, fill, line, radius, undefined, name);
  shape.text = value;
  shape.text.style = {
    fontSize: size, color, bold, italic, alignment: align, verticalAlignment: valign,
    typeface: face, insets: margin, autoFit, wrap: "square",
  };
  return shape;
}

function img(slide, file, x, y, w, h, alt, crop = undefined, radius = 0) {
  return slide.images.add({ blob: artBytes.get(file), contentType: "image/png", alt, fit: "cover", position: { left: x, top: y, width: w, height: h },
    ...(crop ? { crop } : {}), ...(radius ? { geometry: "roundRect", borderRadius: radius } : {}) });
}

function addSlide(bg = C.cream) {
  const s = presentation.slides.add();
  s.background.fill = bg;
  return s;
}

function pill(slide, label, x, y, w, fill = C.gold, color = C.white, size = 17) {
  return txt(slide, label, x, y, w, 34, { size, color, bold: true, align: "center", valign: "middle", fill, radius: 17, margin: 4 });
}

function chrome(slide, n, { title, hud = null, anchor = null, subtitle = null, dark = false } = {}) {
  const fg = dark ? C.white : C.navy;
  const chapterLabel = pill(slide, "CHAPTER 1  •  ENERGY CAUSES CHANGE", 48, 28, 315, dark ? "#FFFFFF22" : C.navy, C.white, 14);
  let right = 1232;
  if (hud) {
    const widths = { "TURN & TALK": 142, OBSERVE: 104, WRITE: 82, CHECK: 82, PREDICT: 96, RECITE: 86, WATCH: 82, VOTE: 70 };
    const ww = widths[hud] || 94;
    right -= ww;
    pill(slide, hud, right, 28, ww, C.gold, C.white, 16);
    right -= 10;
  }
  if (anchor) {
    const ww = Math.max(66, 12 * anchor.length + 20);
    right -= ww;
    pill(slide, anchor, right, 28, ww, dark ? "#FFFFFF22" : C.paleNavy, dark ? C.white : C.navy, 14);
  }
  if (title) txt(slide, title, 48, 78, 1160, 62, { size: 47, color: fg, bold: true, face: DISPLAY, valign: "middle" });
  if (subtitle) txt(slide, subtitle, 48, 138, 1160, 32, { size: 22, color: dark ? "#F1E7D3" : C.soft, italic: true });
  txt(slide, String(n), 1190, 684, 42, 22, { size: 15, color: dark ? "#FFFFFFAA" : C.soft, align: "right" });
  return { chapterLabel };
}

function lines(slide, x, y, w, count = 3, gap = 52, color = "#8A8F9C") {
  for (let i = 0; i < count; i++) box(slide, x, y + i * gap, w, 2, color);
}

function model(slide, labels, x, y, w, h = 74, openIndex = -1, dark = false) {
  const gap = 46;
  const bw = (w - gap * (labels.length - 1)) / labels.length;
  labels.forEach((label, i) => {
    const xx = x + i * (bw + gap);
    const open = i === openIndex;
    txt(slide, label, xx, y, bw, h, {
      size: 28, color: open ? (dark ? C.white : C.navy) : C.white, bold: true, align: "center", valign: "middle",
      fill: open ? "#FFFFFF11" : (i === labels.length - 1 ? C.gold : C.navy), line: open ? C.gold : "none", radius: 18, margin: 8,
    });
    if (i < labels.length - 1) txt(slide, "→", xx + bw, y, gap, h, { size: 34, color: C.gold, bold: true, align: "center", valign: "middle" });
  });
}

function speaker(slide, n, spec = {}) {
  const fields = [
    ["MODE", spec.mode || "Teach"], ["TIME", spec.time || "1 min"], ["PLAN", spec.plan || "Required"],
    ["STUDENT RESOURCE", spec.resource || "none"], ["ASK", spec.ask || ""], ["LISTEN FOR", spec.listen || ""],
    ["REVEAL", spec.reveal || ""], ["MISCONCEPTION", spec.misconception || ""], ["NEXT", spec.next || ""], ["IF SHORT", spec.short || "Continue to the next required slide."],
  ];
  slide.speakerNotes.text = fields.map(([k, v]) => `${k} ${v}`).join("\n");
  slide.speakerNotes.setVisible(true);
}

function mediaShell(slide, n, title, prompt, slot, optional = false) {
  slide.background.fill = C.media;
  pill(slide, optional ? "OPTIONAL  •  SKIP IF SHORT ON TIME" : "WATCH CLOSELY", 48, 34, optional ? 300 : 152, C.gold, C.white, 15);
  txt(slide, title, 48, 80, 1184, 58, { size: 44, color: C.white, bold: true, face: DISPLAY, align: "center" });
  box(slide, 116, 154, 1048, 450, "#050814", C.gold, 18, "shadow-lg");
  txt(slide, "▶", 548, 286, 184, 104, { size: 72, color: C.gold, bold: true, align: "center", valign: "middle" });
  txt(slide, slot, 246, 410, 788, 48, { size: 21, color: "#FFFFFFAA", bold: true, align: "center", valign: "middle" });
  txt(slide, prompt, 116, 620, 1048, 42, { size: 27, color: C.white, bold: true, align: "center" });
  txt(slide, String(n), 1190, 684, 42, 22, { size: 15, color: "#FFFFFFAA", align: "right" });
}

function noteHeader(slide, n, code, title, ref, hud) {
  chrome(slide, n, { title, hud, anchor: code, subtitle: ref });
}

function addNativeTable(slide, values, x, y, w, h, widths, { header = true, answerCols = [] } = {}) {
  const table = slide.tables.add({ rows: values.length, columns: values[0].length, left: x, top: y, width: w, height: h, columnWidths: widths, values });
  table.borders.assign({ style: "solid", fill: C.border, width: 1 });
  table.cells.block({ row: 0, column: 0, rowCount: values.length, columnCount: values[0].length }).assign({
    fill: C.white, textStyle: { fontSize: 28, color: C.ink, typeface: FONT }, margins: { top: 7, bottom: 7, left: 12, right: 12 }, anchor: "middle",
  });
  if (header) table.cells.block({ row: 0, column: 0, rowCount: 1, columnCount: values[0].length }).assign({
    fill: C.navy, textStyle: { fontSize: 23, color: C.white, bold: true, typeface: FONT }, margins: { top: 7, bottom: 7, left: 12, right: 12 }, anchor: "middle",
  });
  for (let r = 1; r < values.length; r++) {
    table.getCell(r, 0).text.style = { fontSize: 27, color: C.navy, bold: true, typeface: FONT };
    for (const c of answerCols) table.getCell(r, c).text.style = { fontSize: 27, color: C.amber, bold: true, typeface: FONT };
  }
  return table;
}

// 1 — Chapter opener
{
  const s = addSlide(C.media); img(s, art.opener, 0, 0, W, H, "Classroom desk with lamp, pencil, notebook, ball, and electric sharpener");
  box(s, 0, 0, 660, H, { type: "gradient", gradientKind: "linear", angleDeg: 0, stops: [{ offset: 0, color: "#071020F2" }, { offset: 100000, color: "#07102033" }] });
  pill(s, "CHAPTER 1  •  GRADE 4  •  WEEK 1", 62, 54, 298, C.gold, C.white, 14);
  txt(s, "Energy Causes Change", 62, 124, 560, 108, { size: 64, color: C.white, bold: true, face: DISPLAY, valign: "middle" });
  txt(s, "DISCOVERY  •  EVIDENCE", 66, 242, 420, 34, { size: 20, color: "#EBDDBA", bold: true });
  txt(s, "Where can we observe evidence of energy causing change?", 62, 294, 540, 96, { size: 32, color: C.white, bold: true, face: DISPLAY });
  model(s, ["ENERGY", "CHANGE", "?"], 62, 438, 532, 66, 2, true);
  txt(s, "Unit 1  •  Energy Transfer & Transformation", 62, 646, 520, 28, { size: 19, color: "#FFFFFFCC" });
  speaker(s, 1, { mode: "Chapter opener", time: "1 min", plan: "Session 1 required", ask: "What do you think energy does?", listen: "move, change, power", next: "Open the Big Question.", short: "Keep this slide to one minute." });
}

// 2 — Big Question
{
  const s = addSlide(); chrome(s, 2, { title: "Big Question", hud: "TURN & TALK", anchor: "BQ" });
  box(s, 98, 172, 1084, 248, C.white, C.border, 24, "shadow-md");
  txt(s, "BIG QUESTION", 136, 198, 1008, 30, { size: 19, color: C.gold, bold: true, align: "center" });
  txt(s, "Where can we observe evidence of energy causing change?", 146, 238, 988, 120, { size: 44, color: C.navy, bold: true, face: DISPLAY, align: "center", valign: "middle" });
  box(s, 146, 375, 988, 3, C.gold);
  txt(s, "Keep it in mind all chapter. We will come back to it.", 170, 438, 940, 38, { size: 25, color: C.soft, align: "center" });
  txt(s, "Think: What is ONE change you have seen happen?", 184, 514, 912, 72, { size: 32, color: C.white, bold: true, align: "center", valign: "middle", fill: C.navy, radius: 18, margin: 12 });
  model(s, ["ENERGY", "CHANGE", "?"], 720, 620, 450, 46, 2);
  speaker(s, 2, { mode: "BQ discussion", time: "2 min", plan: "Required; also the re-entry for Sessions 2 and 3", resource: "Guided Notes p. 1", ask: "What is one change you have seen?", listen: "any observable change", reveal: "Do not answer the Big Question yet.", next: "Students record first thinking." });
}

// 3 — First thinking
{
  const s = addSlide(); noteHeader(s, 3, "BQ • WRITE", "Big Question — My first thinking", "Guided Notes p. 1", "WRITE");
  txt(s, "Where can we observe evidence of energy causing change?", 86, 190, 1108, 76, { size: 34, color: C.navy, bold: true, face: DISPLAY, align: "center", valign: "middle" });
  box(s, 124, 292, 1032, 284, C.white, C.border, 22, "shadow-sm");
  txt(s, "My first thinking", 166, 320, 940, 42, { size: 30, color: C.gold, bold: true });
  lines(s, 166, 406, 940, 3, 60);
  txt(s, "Write 1–2 quick ideas. No wrong answer yet.", 166, 592, 940, 38, { size: 25, color: C.soft, italic: true });
  speaker(s, 3, { mode: "Guided Notes BQ write", time: "2 min", plan: "Session 1 required", resource: "Guided Notes p. 1", ask: "Write your first idea.", listen: "students name a change", misconception: "Accept any reasonable first idea.", next: "Observe the light change." });
}

// 4 — Dark to bright
{
  const s = addSlide(); chrome(s, 4, { title: "What changed?", hud: "OBSERVE", subtitle: "Reader p. 1 — you walk into a dark room and flip a switch." });
  img(s, art.room, 52, 186, 808, 392, "Matched classroom corner before and after a lamp turns on", undefined, 20);
  pill(s, "DARK ROOM", 82, 518, 166, C.media, C.white, 17); pill(s, "BRIGHT ROOM", 474, 518, 180, C.gold, C.white, 17);
  txt(s, "hard to see", 258, 523, 126, 28, { size: 20, color: C.white, bold: true, align: "center" });
  box(s, 890, 208, 330, 320, C.white, C.border, 22, "shadow-md");
  txt(s, "Something became different.", 926, 244, 258, 94, { size: 34, color: C.navy, bold: true, face: DISPLAY, align: "center", valign: "middle" });
  txt(s, "That is a change.", 926, 372, 258, 68, { size: 32, color: C.gold, bold: true, align: "center", valign: "middle" });
  txt(s, "light fills the room", 926, 460, 258, 36, { size: 23, color: C.soft, align: "center" });
  speaker(s, 4, { mode: "Phenomenon observe", time: "2 min", plan: "Session 1 optional", resource: "Reader p. 1", ask: "What changed?", listen: "the room became bright", reveal: "The room changed from dark to bright.", next: "Notice and wonder.", short: "Skip to Slide 6." });
}

// 5 — Notice wonder
{
  const s = addSlide(); chrome(s, 5, { title: "I notice…  I wonder…", hud: "TURN & TALK" });
  [[82, "I NOTICE", { left: 0, top: 0, right: 0.5, bottom: 0 }, "The room is different now.\nLight is everywhere."],
   [656, "I WONDER", { left: 0.5, top: 0, right: 0, bottom: 0 }, "What made the light change so fast?"]].forEach(([x, label, crop, body]) => {
    box(s, x, 172, 542, 400, C.white, C.border, 22, "shadow-sm");
    img(s, art.room, x + 20, 192, 502, 214, `Classroom ${label.toLowerCase()}`, crop, 14);
    txt(s, label, x + 28, 426, 486, 34, { size: 20, color: C.gold, bold: true });
    txt(s, body, x + 28, 466, 486, 86, { size: 29, color: C.navy, bold: true });
  });
  txt(s, "Share one notice and one wonder with a partner.", 190, 612, 900, 48, { size: 28, color: C.navy, bold: true, align: "center" });
  speaker(s, 5, { mode: "Partner discussion", time: "2 min", plan: "Session 1 optional", ask: "What do you notice? What do you wonder?", listen: "change words and curiosity", next: "Electric pencil sharpener demo.", short: "Skip to Slide 6." });
}

// 6 — Pencil before
{
  const s = addSlide(); chrome(s, 6, { title: "Electric Pencil Sharpener", hud: "OBSERVE" });
  img(s, art.pencil, 52, 164, 692, 456, "Blunt yellow pencil beside an electric sharpener", { left: 0, top: 0, right: 0.5, bottom: 0 }, 20);
  box(s, 776, 176, 446, 404, C.white, C.border, 22, "shadow-md");
  pill(s, "BEFORE", 806, 206, 118, C.navy, C.white, 18);
  txt(s, "Observe the pencil BEFORE we sharpen it.", 806, 266, 382, 100, { size: 33, color: C.navy, bold: true, face: DISPLAY });
  txt(s, "A dull pencil — tip is flat, and it is quiet.", 806, 382, 382, 86, { size: 28, color: C.ink, bold: true });
  txt(s, "Look closely. What do you see? What do you hear?", 806, 490, 382, 64, { size: 24, color: C.soft, italic: true });
  pill(s, "NEXT: SHARPENER DEMO", 874, 606, 260, C.gold, C.white, 15);
  speaker(s, 6, { mode: "Demo observe", time: "1 min", plan: "Session 1 required", ask: "What does the pencil look and sound like now?", listen: "dull, flat, quiet", next: "Predict before sharpening." });
}

// 7 — Predict
{
  const s = addSlide(C.navy); chrome(s, 7, { title: "Predict: what will change?", hud: "PREDICT", dark: true, subtitle: "Think before we turn it on." });
  txt(s, "When the sharpener runs, the pencil will…", 120, 224, 1040, 68, { size: 38, color: C.white, bold: true, face: DISPLAY, align: "center" });
  txt(s, "get  ____________________", 250, 324, 780, 86, { size: 46, color: C.gold, bold: true, align: "center", valign: "middle" });
  txt(s, "Make a prediction. Say it to your partner.", 180, 484, 920, 64, { size: 31, color: C.white, bold: true, align: "center", valign: "middle", fill: "#FFFFFF10", line: "#FFFFFF33", radius: 18 });
  speaker(s, 7, { mode: "Demo prediction", time: "1 min", plan: "Session 1 required", ask: "What will change?", listen: "shorter, sharper, sound", reveal: "Do not confirm yet.", next: "Watch the demo." });
}

// 8 — Media shell
{
  const s = addSlide(C.media); mediaShell(s, 8, "Electric Pencil Sharpener Demo", "What changes do you see or hear?", "MEDIA SLOT: CH1 ELECTRIC PENCIL SHARPENER — FINAL APPROVED BINARY");
  txt(s, "If the video is unavailable, use the live demo or continue to the evidence slide.", 180, 662, 920, 26, { size: 17, color: "#FFFFFF99", align: "center" });
  speaker(s, 8, { mode: "Media or live demo", time: "1 min", plan: "Session 1 required support", ask: "What changes do you see or hear?", listen: "shorter, sharper, humming", reveal: "Use the live demo if media is unavailable.", next: "Compare before and after." });
}

// 9 — Pencil evidence
{
  const s = addSlide(); chrome(s, 9, { title: "What changed?", hud: "OBSERVE" });
  img(s, art.pencil, 52, 170, 756, 356, "Matched blunt and sharpened pencil comparison", undefined, 18);
  pill(s, "BEFORE", 78, 468, 108, C.media, C.white, 16); pill(s, "AFTER", 430, 468, 100, C.gold, C.white, 16);
  txt(s, "dull tip  •  quiet", 188, 472, 178, 26, { size: 18, color: C.white, bold: true, align: "center" });
  txt(s, "shorter  •  sharper  •  humming", 534, 472, 246, 26, { size: 18, color: C.white, bold: true, align: "center" });
  box(s, 840, 178, 380, 344, C.white, C.border, 20, "shadow-md");
  txt(s, "CHANGES", 874, 210, 312, 34, { size: 20, color: C.gold, bold: true });
  txt(s, "• the tip is sharper\n• the pencil is shorter\n• the sharpener makes a sound", 874, 266, 312, 192, { size: 30, color: C.navy, bold: true, valign: "middle" });
  txt(s, "The changes are clues that energy was involved.", 104, 576, 1072, 66, { size: 31, color: C.navy, bold: true, face: DISPLAY, align: "center", valign: "middle" });
  speaker(s, 9, { mode: "Evidence synthesis", time: "2 min", plan: "Session 1 required", ask: "Name each change.", listen: "shorter, sharper, sound", misconception: "We observe the changes, not energy itself.", next: "Teach energy vocabulary." });
}

function vocabSlide(n, term, definition, footer, imageFile, alt, crop = undefined) {
  const s = addSlide(); chrome(s, n, { title: "Vocabulary", hud: "RECITE" });
  box(s, 128, 160, 1024, 468, C.white, C.border, 26, "shadow-lg");
  pill(s, "KEY WORD", 164, 188, 118, C.gold, C.white, 16);
  txt(s, term, 164, 238, 430, 92, { size: term.length > 10 ? 54 : 64, color: C.navy, bold: true, face: DISPLAY, valign: "middle" });
  img(s, imageFile, 630, 188, 486, 286, alt, crop, 18);
  box(s, 164, 508, 952, 82, C.paleGold, C.gold, 16);
  txt(s, definition, 192, 522, 896, 56, { size: 31, color: C.ink, bold: true, align: "center", valign: "middle" });
  txt(s, footer, 164, 596, 952, 24, { size: 17, color: C.soft, bold: true, align: "right" });
  return s;
}

// 10–11 — Vocabulary cards
{
  const s = vocabSlide(10, "energy", "the ability to cause change", "Reader p. 1", art.energy, "Hand pushing a toy car toward a block");
  speaker(s, 10, { mode: "Vocabulary teach", time: "1.5 min", plan: "Session 1 required", resource: "Reader p. 1", ask: "What is energy?", listen: "the ability to cause change", reveal: "Read the definition together.", next: "Teach change." });
}
{
  const s = vocabSlide(11, "change", "to become different", "Reader p. 1", art.pencil, "The same pencil before and after sharpening");
  speaker(s, 11, { mode: "Vocabulary teach", time: "1.5 min", plan: "Session 1 required", resource: "Reader p. 1", ask: "What does change mean?", listen: "to become different", reveal: "Read the definition together.", next: "Record V1." });
}

// 12–13 — V1 write/reveal
{
  const s = addSlide(); noteHeader(s, 12, "V1 • WRITE", "Vocabulary — Energy & Change", "Guided Notes • Reader p. 1", "WRITE");
  box(s, 138, 214, 1004, 262, C.white, C.border, 22, "shadow-sm");
  txt(s, "energy — the ability to cause ____________ .", 184, 260, 912, 68, { size: 36, color: C.navy, bold: true });
  txt(s, "change — to become ________________ .", 184, 356, 912, 68, { size: 36, color: C.navy, bold: true });
  txt(s, "Write the missing word in each blank.", 184, 518, 912, 48, { size: 27, color: C.soft, italic: true, align: "center" });
  speaker(s, 12, { mode: "Guided Notes V1 write", time: "2 min", plan: "Session 1 required", resource: "Guided Notes V1", ask: "Fill in each blank.", listen: "change; different", reveal: "Wait for students to write.", next: "Check V1." });
}
{
  const s = addSlide(); noteHeader(s, 13, "V1 • CHECK", "Vocabulary — Energy & Change", "Guided Notes • Reader p. 1", "CHECK");
  box(s, 138, 214, 1004, 262, C.white, C.gold, 22, "shadow-sm");
  txt(s, "energy — the ability to cause change .", 184, 260, 912, 68, { size: 36, color: C.navy, bold: true });
  txt(s, "change — to become different .", 184, 356, 912, 68, { size: 36, color: C.navy, bold: true });
  txt(s, "change  •  different", 380, 518, 520, 56, { size: 30, color: C.white, bold: true, align: "center", valign: "middle", fill: C.gold, radius: 18 });
  speaker(s, 13, { mode: "Guided Notes V1 check", time: "0.5 min", plan: "Session 1 required", resource: "Guided Notes V1", reveal: "change; different", next: "Read about evidence." });
}

// 14 — Seashore bridge
{
  const s = addSlide(C.media); img(s, art.shore, 0, 0, W, H, "Small waves and shifting sand at a seashore");
  box(s, 0, 0, 640, H, "#0E1428D9");
  chrome(s, 14, { title: "Look at the seashore", hud: "OBSERVE", dark: true, subtitle: "Reader p. 2 — the seashore changes all around us." });
  txt(s, "Waves move.\nSand shifts.\nWater makes sound.", 72, 214, 470, 180, { size: 35, color: C.white, bold: true, valign: "middle" });
  model(s, ["ENERGY", "CHANGE", "?"], 72, 456, 500, 66, 2, true);
  txt(s, "What are these changes a clue about?", 72, 558, 500, 56, { size: 27, color: C.white, bold: true, face: DISPLAY });
  speaker(s, 14, { mode: "Reader bridge", time: "2 min", plan: "Session 1 required", resource: "Reader p. 2", ask: "What changes can you find at the seashore?", listen: "waves move, sand shifts, sound", reveal: "Keep the last model box open.", next: "Record N1." });
}

// 15–16 — N1
{
  const s = addSlide(); noteHeader(s, 15, "N1 • WRITE", "N1 — Energy Causes Change", "Guided Notes • Reader pp. 1–2", "WRITE");
  model(s, ["ENERGY", "CHANGE", ""], 126, 210, 1028, 78, 2);
  box(s, 118, 330, 1044, 214, C.white, C.border, 22);
  txt(s, "Energy has the ability to cause change.", 164, 366, 952, 46, { size: 32, color: C.navy, bold: true });
  txt(s, "When you see a change, you are seeing ____________ of energy.", 164, 436, 952, 58, { size: 33, color: C.ink, bold: true });
  txt(s, "Write the missing word. Leave the last box of your model empty for now.", 150, 576, 980, 46, { size: 24, color: C.soft, italic: true, align: "center" });
  speaker(s, 15, { mode: "Guided Notes N1 write", time: "2 min", plan: "Session 1 required", resource: "Guided Notes N1", ask: "Fill in the sentence blank.", listen: "evidence", reveal: "Do not fill the model yet.", next: "Reveal N1." });
}
{
  const s = addSlide(); noteHeader(s, 16, "N1 • CHECK", "N1 — Energy Causes Change", "Guided Notes • Reader pp. 1–2", "CHECK");
  model(s, ["ENERGY", "CHANGE", "EVIDENCE"], 126, 206, 1028, 82);
  box(s, 118, 328, 1044, 214, C.white, C.gold, 22);
  txt(s, "Energy has the ability to cause change.", 164, 362, 952, 46, { size: 32, color: C.navy, bold: true });
  txt(s, "When you see a change, you are seeing evidence of energy.", 164, 432, 952, 58, { size: 33, color: C.ink, bold: true });
  txt(s, "Now write the same word in the last box of your model.", 150, 570, 980, 44, { size: 25, color: C.gold, bold: true, align: "center" });
  pill(s, "OPTIONAL MEDIA: ENERGY DETECTIVE", 442, 628, 396, C.navy, C.white, 15);
  speaker(s, 16, { mode: "Guided Notes N1 check", time: "1 min", plan: "Session 1 required", resource: "Guided Notes N1", reveal: "evidence; students copy it into the last model box", misconception: "Prefer evidence rather than proof.", next: "Close Session 1.", short: "Skip optional media." });
}

// 17 — Forms intro
{
  const s = addSlide(); chrome(s, 17, { title: "Energy has different forms", hud: "RECITE", subtitle: "Where can we observe evidence of energy causing change?" });
  img(s, art.forms, 44, 188, 1192, 300, "Five coordinated scenes for motion, sound, light, heat, and electrical energy", undefined, 18);
  const labels = ["motion", "sound", "light", "heat", "electrical energy"];
  labels.forEach((v, i) => pill(s, v.toUpperCase(), 56 + i * 238, 508, 214, i % 2 ? C.gold : C.navy, C.white, 15));
  txt(s, "Say the five forms together.", 220, 590, 840, 52, { size: 30, color: C.navy, bold: true, face: DISPLAY, align: "center" });
  speaker(s, 17, { mode: "Session 2 re-entry", time: "1 min", plan: "Session 2 required", resource: "Reader p. 3", ask: "Read the five forms together.", listen: "motion, sound, light, heat, electrical energy", next: "Observe examples." });
}

// 18 — typography preview
{
  const s = addSlide(C.navy); chrome(s, 18, { title: "Five forms of energy", hud: "OBSERVE", dark: true });
  const terms = [["MOTION", 92, 184, C.white], ["SOUND", 678, 184, C.gold], ["LIGHT", 222, 328, C.gold], ["HEAT", 760, 328, C.white], ["ELECTRICAL ENERGY", 196, 490, C.white]];
  for (const [t, x, y, color] of terms) txt(s, t, x, y, t.length > 10 ? 890 : 430, 104, { size: t.length > 10 ? 56 : 76, color, bold: true, face: DISPLAY, valign: "middle" });
  speaker(s, 18, { mode: "Optional visual hook", time: "1 min", plan: "Session 2 optional", ask: "Which form do you already know best?", next: "Teach examples.", short: "Skip to Slide 19." });
}

// 19 — Five forms cards
{
  const s = addSlide(); chrome(s, 19, { title: "Energy has different forms", hud: "OBSERVE" });
  const labels = ["motion", "sound", "light", "heat", "electrical energy"];
  const caps = ["A rolling ball moves.", "A bell makes sound.", "A lamp makes an area brighter.", "A warm mug gives off heat.", "A fan uses electrical energy to operate."];
  for (let i = 0; i < 5; i++) {
    const x = 42 + i * 244;
    box(s, x, 166, 220, 450, C.white, C.border, 18, "shadow-sm");
    img(s, art.forms, x + 12, 180, 196, 220, `${labels[i]} example`, { left: i / 5, top: 0, right: (4 - i) / 5, bottom: 0 }, 12);
    txt(s, labels[i], x + 18, 418, 184, 40, { size: labels[i].length > 12 ? 25 : 30, color: C.gold, bold: true, align: "center", valign: "middle" });
    txt(s, caps[i], x + 20, 474, 180, 116, { size: 24, color: C.navy, bold: true, align: "center", valign: "middle" });
  }
  speaker(s, 19, { mode: "Core concept visual", time: "3 min", plan: "Session 2 required", resource: "Reader p. 3", ask: "What change does each example show?", listen: "movement, sound, brighter, warmer, fan moves", next: "Record N2." });
}

// 20–21 — N2 tables
{
  const s = addSlide(); noteHeader(s, 20, "N2 • WRITE", "N2 — Energy Occurs in Different Forms", "Guided Notes • Reader p. 3", "WRITE");
  txt(s, "Write one example that shows a change for each form.", 108, 180, 1064, 42, { size: 28, color: C.soft, italic: true, align: "center" });
  addNativeTable(s, [["FORM", "ONE EXAMPLE THAT SHOWS A CHANGE"], ["motion", ""], ["sound", ""], ["light", ""], ["heat", ""], ["electrical energy", ""]], 132, 238, 1016, 374, [310, 706]);
  speaker(s, 20, { mode: "Guided Notes N2 write", time: "5 min", plan: "Session 2 required", resource: "Guided Notes N2", ask: "Write one example per form.", listen: "real examples that show a change", reveal: "No answers yet.", next: "Discuss sample answers." });
}
{
  const s = addSlide(); noteHeader(s, 21, "N2 • CHECK", "N2 — Energy Occurs in Different Forms", "Guided Notes • Reader p. 3", "CHECK");
  pill(s, "SAMPLE ANSWERS — YOUR EXAMPLES MAY DIFFER", 350, 178, 580, C.gold, C.white, 15);
  addNativeTable(s, [["FORM", "ONE EXAMPLE THAT SHOWS A CHANGE"], ["motion", "a ball moves across the floor"], ["sound", "a bell rings"], ["light", "a dark area becomes brighter"], ["heat", "something becomes warmer"], ["electrical energy", "a fan begins moving"]], 132, 230, 1016, 388, [310, 706], { answerCols: [1] });
  speaker(s, 21, { mode: "Guided Notes N2 sample check", time: "2 min", plan: "Session 2 required", resource: "Guided Notes N2", ask: "Compare your examples with these samples.", listen: "different valid examples", reveal: "Examples may differ.", next: "Teach stored energy." });
}

// 22 — Stored energy vocab
{
  const s = vocabSlide(22, "stored energy", "energy that has the ability to cause change at a later time", "Reader p. 4", art.stored, "Hands holding a stretched rubber band still");
  speaker(s, 22, { mode: "Vocabulary teach", time: "2 min", plan: "Session 2 required", resource: "Reader p. 4", ask: "What does later tell us?", listen: "the change can happen after", reveal: "Read the definition together.", next: "Record V2." });
}

// 23–24 — V2
{
  const s = addSlide(); noteHeader(s, 23, "V2 • WRITE", "Vocabulary — Stored Energy", "Guided Notes • Reader p. 4", "WRITE");
  box(s, 122, 232, 1036, 184, C.white, C.border, 22);
  txt(s, "stored energy — energy that has the ability to cause change at a ___________ time.", 164, 270, 952, 100, { size: 33, color: C.navy, bold: true, valign: "middle" });
  txt(s, "Write the missing word in the blank.", 174, 472, 932, 48, { size: 28, color: C.soft, italic: true, align: "center" });
  speaker(s, 23, { mode: "Guided Notes V2 write", time: "1 min", plan: "Session 2 required", resource: "Guided Notes V2", ask: "Fill in the blank.", listen: "later", reveal: "Wait for students to write.", next: "Check V2." });
}
{
  const s = addSlide(); noteHeader(s, 24, "V2 • CHECK", "Vocabulary — Stored Energy", "Guided Notes • Reader p. 4", "CHECK");
  box(s, 122, 232, 1036, 184, C.white, C.gold, 22);
  txt(s, "stored energy — energy that has the ability to cause change at a later time.", 164, 270, 952, 100, { size: 33, color: C.navy, bold: true, valign: "middle" });
  pill(s, "later", 520, 470, 240, C.gold, C.white, 24);
  speaker(s, 24, { mode: "Guided Notes V2 check", time: "0.5 min", plan: "Session 2 required", resource: "Guided Notes V2", reveal: "later", next: "Observe stored-energy examples." });
}

// 25 — Stored energy examples
{
  const s = addSlide(); chrome(s, 25, { title: "Objects can store energy", hud: "OBSERVE" });
  const labels = ["battery (in a flashlight)", "stretched rubber band", "raised object (apple)"];
  for (let i = 0; i < 3; i++) {
    const x = 52 + i * 410;
    box(s, x, 170, 386, 386, C.white, C.border, 18, "shadow-sm");
    img(s, art.storedExamples, x + 14, 184, 358, 278, labels[i], { left: i / 3, top: 0, right: (2 - i) / 3, bottom: 0 }, 12);
    txt(s, labels[i], x + 20, 480, 346, 58, { size: 25, color: C.navy, bold: true, align: "center", valign: "middle" });
  }
  txt(s, "What change could happen later?", 180, 590, 920, 58, { size: 35, color: C.gold, bold: true, face: DISPLAY, align: "center" });
  speaker(s, 25, { mode: "Concept application", time: "3 min", plan: "Session 2 required", resource: "Reader pp. 4–5", ask: "What change could happen later in each example?", listen: "light, snap back, fall", next: "Record N3." });
}

// 26–27 — N3
{
  const s = addSlide(); noteHeader(s, 26, "N3 • WRITE", "N3 — Objects Can Store Energy", "Guided Notes • Reader pp. 4–5", "WRITE");
  model(s, ["STORED ENERGY", "RELEASE", "CHANGE"], 178, 182, 924, 54);
  addNativeTable(s, [["EXAMPLE", "WHAT CHANGE COULD HAPPEN LATER?"], ["battery (in a flashlight)", ""], ["stretched rubber band", ""], ["raised object (apple)", ""]], 132, 262, 1016, 264, [440, 576]);
  txt(s, "Objects also have stored energy because of their ______________ .", 150, 566, 980, 52, { size: 30, color: C.navy, bold: true, align: "center" });
  speaker(s, 26, { mode: "Guided Notes N3 write", time: "4 min", plan: "Session 2 required", resource: "Guided Notes N3", ask: "Fill the table and the final blank.", listen: "reasonable later changes; position", reveal: "Wait for students to write.", next: "Check N3." });
}
{
  const s = addSlide(); noteHeader(s, 27, "N3 • CHECK", "N3 — Objects Can Store Energy", "Guided Notes • Reader pp. 4–5", "CHECK");
  model(s, ["STORED ENERGY", "RELEASE", "CHANGE"], 178, 182, 924, 54);
  addNativeTable(s, [["EXAMPLE", "WHAT CHANGE COULD HAPPEN LATER?"], ["battery (in a flashlight)", "the flashlight lights up"], ["stretched rubber band", "it snaps and makes a sound"], ["raised object (apple)", "it falls down"]], 132, 262, 1016, 264, [440, 576], { answerCols: [1] });
  txt(s, "Objects also have stored energy because of their position .", 150, 558, 980, 44, { size: 30, color: C.navy, bold: true, align: "center" });
  pill(s, "position  •  Sample answers shown — yours may differ.", 318, 614, 644, C.gold, C.white, 16);
  speaker(s, 27, { mode: "Guided Notes N3 check", time: "1 min", plan: "Session 2 required", resource: "Guided Notes N3", reveal: "position and sample table answers", next: "Close Session 2.", short: "Skip optional stored-energy media." });
}

// 28 — Recognizing evidence
{
  const s = addSlide(); chrome(s, 28, { title: "Recognizing Evidence", hud: "OBSERVE" });
  txt(s, "What changed? What is the evidence?", 160, 154, 960, 54, { size: 34, color: C.navy, bold: true, face: DISPLAY, align: "center" });
  const labels = ["LIGHT", "PENCIL", "MOTION"];
  for (let i = 0; i < 3; i++) {
    const x = 54 + i * 408;
    box(s, x, 232, 380, 336, C.white, C.border, 18, "shadow-sm");
    img(s, art.evidence, x + 14, 246, 352, 256, `${labels[i]} evidence`, { left: i / 3, top: 0, right: (2 - i) / 3, bottom: 0 }, 12);
    pill(s, labels[i], x + 102, 520, 176, i === 1 ? C.gold : C.navy, C.white, 16);
  }
  txt(s, "Describe only what you can observe.", 250, 610, 780, 42, { size: 26, color: C.soft, italic: true, align: "center" });
  speaker(s, 28, { mode: "Friday retrieval", time: "2 min", plan: "Session 3 required; no new core content", resource: "Reader pp. 1–5", ask: "What changed in each panel?", listen: "brighter, pencil sharper, ball moved", misconception: "Say evidence, not proof.", next: "Draw before and after.", short: "Keep the prompt brief." });
}

// 29 — N4 draw
{
  const s = addSlide(); noteHeader(s, 29, "N4 • WRITE/DRAW", "N4 — Recognizing Evidence", "Guided Notes • Reader pp. 1–5", "WRITE");
  txt(s, "Draw a change you observed. Show what it looked like BEFORE and AFTER.", 130, 172, 1020, 54, { size: 27, color: C.soft, italic: true, align: "center" });
  [[116, "BEFORE"], [700, "AFTER"]].forEach(([x, label]) => {
    box(s, x, 250, 464, 260, C.white, C.navy, 18);
    pill(s, label, x + 142, 266, 180, label === "AFTER" ? C.gold : C.navy, C.white, 16);
  });
  txt(s, "→", 590, 330, 100, 88, { size: 60, color: C.gold, bold: true, align: "center", valign: "middle" });
  txt(s, "What changed?", 116, 548, 464, 38, { size: 28, color: C.navy, bold: true });
  lines(s, 116, 606, 1048, 2, 46);
  speaker(s, 29, { mode: "Guided Notes N4 draw", time: "3.5 min", plan: "Session 3 required", resource: "Guided Notes N4", ask: "Draw one change before and after.", listen: "a clear matched pair", next: "Check your thinking." });
}

// 30–31 — Check write/reveal
{
  const s = addSlide(); noteHeader(s, 30, "CHECK • WRITE", "Check Your Thinking", "Guided Notes • Reader pp. 1–5", "WRITE");
  box(s, 134, 204, 1012, 164, C.paleGold, C.gold, 22);
  txt(s, "How do we know energy is involved if we cannot see energy itself?", 176, 236, 928, 100, { size: 35, color: C.navy, bold: true, face: DISPLAY, align: "center", valign: "middle" });
  txt(s, "Start with: “We know because we see …”", 164, 416, 952, 46, { size: 30, color: C.navy, bold: true });
  lines(s, 164, 512, 952, 3, 50);
  speaker(s, 30, { mode: "Guided Notes check write", time: "2.5 min", plan: "Session 3 required if time allows", resource: "Guided Notes N4", ask: "Complete the sentence starter.", listen: "a change as evidence", reveal: "Do not show Slide 31 until students write.", next: "Reveal a sample.", short: "Skip Slides 30–31 if past minute 6." });
}
{
  const s = addSlide(); noteHeader(s, 31, "CHECK • REVEAL", "Check Your Thinking", "Guided Notes • Reader pp. 1–5", "CHECK");
  box(s, 134, 204, 1012, 238, C.white, C.gold, 22, "shadow-sm");
  pill(s, "SAMPLE", 170, 232, 104, C.gold, C.white, 15);
  txt(s, "“We know because we see a change, like a ball starting to move or a light turning on.”", 176, 292, 928, 112, { size: 34, color: C.navy, bold: true, face: DISPLAY, align: "center", valign: "middle" });
  txt(s, "A change you observe is evidence of energy.", 190, 494, 900, 64, { size: 33, color: C.gold, bold: true, align: "center", valign: "middle" });
  speaker(s, 31, { mode: "Guided Notes check reveal", time: "1 min", plan: "Session 3 required if Slide 30 was completed", resource: "Guided Notes N4", reveal: "Sample response; accept any response connecting change to evidence.", next: "Optional media or return to BQ.", short: "Go to Slide 33." });
}

// 32 — Optional media
{
  const s = addSlide(C.media); mediaShell(s, 32, "CHAPTER 1 OPTIONAL REVIEW", "Listen for energy, change, and evidence.", "MEDIA SLOT: FINAL APPROVED CHAPTER 1 REVIEW / ENERGY DETECTIVE VIDEO", true);
  speaker(s, 32, { mode: "Optional review media", time: "2 min", plan: "Session 3 optional", ask: "Listen for energy, change, and evidence.", next: "Return to the Big Question.", short: "Skip to Slide 33." });
}

// 33 — BQ revisit
{
  const s = addSlide(); img(s, art.reflection, 0, 0, W, H, "Subdued classroom science still life"); box(s, 0, 0, W, H, "#F5EEDCCF");
  chrome(s, 33, { title: "The Big Question Revisited", hud: "WRITE", anchor: "BQ • NOW I THINK" });
  txt(s, "Where can we observe evidence of energy causing change?", 88, 156, 1104, 70, { size: 36, color: C.navy, bold: true, face: DISPLAY, align: "center", valign: "middle" });
  box(s, 88, 254, 352, 250, "#FFFFFFB8", C.border, 20);
  txt(s, "MY FIRST THINKING", 118, 280, 292, 32, { size: 18, color: C.soft, bold: true, align: "center" });
  txt(s, "Look back at page 1.", 118, 340, 292, 70, { size: 29, color: C.soft, italic: true, align: "center", valign: "middle" });
  box(s, 474, 254, 718, 250, C.white, C.gold, 20, "shadow-md");
  txt(s, "NOW I THINK", 508, 280, 650, 34, { size: 21, color: C.gold, bold: true });
  lines(s, 508, 360, 650, 3, 54);
  model(s, ["ENERGY", "CHANGE", "EVIDENCE"], 238, 558, 804, 58);
  speaker(s, 33, { mode: "Final Guided Notes reflection", time: "2.5 min", plan: "Session 3 required", resource: "Guided Notes p. 3", ask: "Answer the Big Question now.", listen: "a named change as evidence", next: "Friday quiz. Optional review slides follow.", short: "If late, complete after the quiz or during catch-up." });
}

const REVIEW = [
  { type: "concept", q: "Energy is best described as —", opts: ["a visible glow", "something only batteries have", "the ability to cause change", "a kind of fuel"], correct: 2, rationale: "Energy is the ability to cause change (Reader p. 1)." },
  { type: "visual", q: "A pencil is dull, then you sharpen it. What change do you observe?", opts: ["It gets shorter and sharper", "It gets longer", "It changes color", "It disappears"], correct: 0, rationale: "The pencil becomes shorter and sharper — a change.", visual: { file: art.pencil, alt: "Pencil before and after sharpening" } },
  { type: "scenario", q: "Which object has stored energy that can cause a change LATER?", opts: ["A ball already rolling", "A toy already moving", "A flashlight already on", "A stretched rubber band"], correct: 3, rationale: "The rubber band stores energy; it changes when released.", visual: { file: art.stored, alt: "Stretched rubber band held still" } },
  { type: "comparison", q: "A carousel spins and plays music. Which two forms of energy come from the spinning and the music?", opts: ["only light", "motion and sound", "motion and silence", "sound and stillness"], correct: 1, rationale: "The spinning is motion; the music is sound (Reader p. 3)." },
  { type: "concept", q: "How do we know energy is involved if we cannot see it?", opts: ["We observe a change happen", "Energy can always be seen", "We guess without evidence", "Nothing can change"], correct: 0, rationale: "We see a change — like movement — as evidence." },
  { type: "scenario", q: "A battery sits still in a flashlight. Does it have energy?", opts: ["No — still objects have no energy", "Only when it is moving", "Yes — stored energy that can cause change later", "Only when the flashlight is on"], correct: 2, rationale: "A battery stores energy. It can cause a change later.", visual: { file: art.storedExamples, alt: "Battery beside an open flashlight", crop: { left: 0, top: 0, right: 2 / 3, bottom: 0 } } },
];

function reviewSlide(n, idx, item, reveal) {
  const s = addSlide();
  const chromeParts = chrome(s, n, { title: `Review ${idx} — ${reveal ? "answer" : item.type}`, hud: reveal ? "CHECK" : "VOTE" });
  const qWidth = item.visual ? 790 : 1120;
  txt(s, item.q, 58, 152, qWidth, 92, { size: 34, color: C.navy, bold: true, face: DISPLAY, valign: "middle" });
  if (item.visual) img(s, item.visual.file, 900, 148, 320, 122, item.visual.alt, item.visual.crop, 14);
  if (item.visual) chromeParts.chapterLabel.bringToFront();
  const letters = ["A", "B", "C", "D"];
  for (let i = 0; i < 4; i++) {
    const x = 70 + (i % 2) * 576;
    const y = 278 + Math.floor(i / 2) * 126;
    const yes = reveal && i === item.correct;
    box(s, x, y, 544, 102, yes ? C.paleGold : C.white, yes ? C.gold : C.border, 18, yes ? "shadow-md" : "shadow-sm");
    pill(s, yes ? `✓  ${letters[i]}` : letters[i], x + 18, y + 22, yes ? 78 : 52, yes ? C.gold : C.navy, C.white, 18);
    txt(s, item.opts[i], x + (yes ? 108 : 86), y + 14, yes ? 414 : 438, 76, { size: 27, color: C.ink, bold: yes, valign: "middle" });
  }
  if (reveal) txt(s, item.rationale, 78, 552, 1124, 78, { size: 27, color: C.navy, bold: true, align: "center", valign: "middle", fill: C.mist, line: C.border, radius: 16, margin: 12 });
  speaker(s, n, { mode: reveal ? `Review ${idx} reveal` : `Review ${idx} question`, time: reveal ? "0.5 min" : "1 min", plan: "Optional end-of-chapter review", ask: reveal ? "" : "Students vote A, B, C, or D.", reveal: reveal ? item.opts[item.correct] : "Do not reveal yet.", next: reveal ? "Continue to the next question." : "Reveal the answer.", short: "Skip the optional review." });
  return s;
}

for (let i = 0; i < 5; i++) {
  reviewSlide(34 + i * 2, i + 1, REVIEW[i], false);
  reviewSlide(35 + i * 2, i + 1, REVIEW[i], true);
}
reviewSlide(44, 6, REVIEW[5], false);

// 45 — Review 6 reveal and close
{
  const item = REVIEW[5];
  const s = addSlide(C.media); img(s, art.close, 0, 0, W, H, "Classroom investigation still life with lamp, notebook, pencil, ball, and flashlight");
  box(s, 0, 0, W, H, "#071020B8");
  pill(s, "CHECK", 1120, 34, 110, C.gold, C.white, 16);
  txt(s, item.q, 64, 52, 1000, 72, { size: 33, color: C.white, bold: true, face: DISPLAY, valign: "middle" });
  box(s, 64, 144, 1152, 116, "#FFFFFFE8", C.gold, 18);
  pill(s, "✓  C", 92, 180, 86, C.gold, C.white, 18);
  txt(s, item.opts[item.correct], 202, 162, 630, 80, { size: 29, color: C.navy, bold: true, valign: "middle" });
  txt(s, item.rationale, 858, 162, 326, 80, { size: 22, color: C.ink, bold: true, valign: "middle" });
  model(s, ["ENERGY", "CHANGE", "EVIDENCE"], 156, 330, 968, 84, -1, true);
  txt(s, "Look for the change. Use the change as evidence that energy was involved.", 120, 492, 1040, 86, { size: 34, color: C.white, bold: true, face: DISPLAY, align: "center", valign: "middle" });
  txt(s, "CHAPTER 1 COMPLETE", 420, 630, 440, 40, { size: 20, color: C.gold, bold: true, align: "center" });
  txt(s, "45", 1190, 684, 42, 22, { size: 15, color: "#FFFFFFAA", align: "right" });
  speaker(s, 45, { mode: "Review 6 reveal and chapter close", time: "0.5 min", plan: "Optional end-of-chapter review", reveal: item.opts[item.correct], next: "Close the chapter review.", short: "Skip the optional review." });
}

if (presentation.slides.items.length !== 45) throw new Error(`Expected 45 slides, found ${presentation.slides.items.length}`);

await fs.mkdir(buildDir, { recursive: true });
await fs.mkdir(renderDir, { recursive: true });
await fs.mkdir(path.dirname(FINAL_PPTX), { recursive: true });
for (const [i, slide] of presentation.slides.items.entries()) {
  const png = await presentation.export({ slide, format: "png", scale: 1 });
  await fs.writeFile(path.join(renderDir, `slide-${String(i + 1).padStart(2, "0")}.png`), new Uint8Array(await png.arrayBuffer()));
}
const montage = await presentation.export({ format: "webp", montage: true, columns: 5, slideWidth: 320, padding: 10, gap: 10 });
await fs.writeFile(path.join(renderDir, "artifact-tool-montage.webp"), new Uint8Array(await montage.arrayBuffer()));

const candidatePath = path.join(buildDir, "candidate.pptx");
await (await PresentationFile.exportPptx(presentation)).save(candidatePath);
const { finalizePresentation } = await import(pathToFileURL(path.join(SKILL_DIR, "container_tools", "artifact_tool_utils.mjs")).href);
const result = await finalizePresentation({
  explicitTotalSlideCount: 45,
  requiredNativeTableOwnerSlides: [20, 21, 26, 27],
  requiredNativeChartOwnerSlides: [],
  workspaceDir,
  candidatePath,
  finalPath: FINAL_PPTX,
  pythonExecutable: RUNTIME_PYTHON,
  integrityValidatorPath: path.join(SKILL_DIR, "container_tools", "inspect_presentation_package_integrity.py"),
  layoutValidatorPath: path.join(SKILL_DIR, "container_tools", "inspect_presentation_layout_geometry.py"),
  layoutArgs: ["--expected-slide-size-emu", "12192000,6858000", "--validate-heading-fit", "--require-native-table-slide", "20", "--require-native-table-slide", "21", "--require-native-table-slide", "26", "--require-native-table-slide", "27"],
  fontPolicy: { basis: "design", families: [FONT, DISPLAY] },
  verifyArtifactToolImport: true,
  receiptPath: path.join(buildDir, "candidate.validation.json"),
});
console.log(JSON.stringify({ slides: presentation.slides.items.length, final: FINAL_PPTX, result }, null, 2));
