/** Candidate only. Shared fixed-row DOCX geometry; frozen builders are never invoked. */
const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, Footer,
  WidthType, HeightRule, BorderStyle, ShadingType, AlignmentType, TableLayoutType } = require('docx');
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'production/candidates/chapter-01/guided-notes-polish');
const tokens = JSON.parse(fs.readFileSync(path.join(ROOT, 'assets/visual-system/design-tokens.json')));
const U = tokens.colors.unit, C = tokens.colors.chapters.ch1;
const color = x => x.replace('#','');
const W = 10656; // 7.4 inches, 0.55 inch margins.
const BQ = 'Where can we observe evidence of energy causing change?';
const line = { style: BorderStyle.SINGLE, size: 6, color: color(U.ink) };
const none = { style: BorderStyle.NONE, size: 0, color: color(U.paper) };
const borders = { top:none,bottom:none,left:none,right:none };
let KEY = false;
function run(text, size=13.5, bold=false, ink=U.ink, extra={}) {
  return new TextRun({text, size:size*2, font:'Arial', bold, color:color(ink), ...extra});
}
function p(text='', size=13.5, bold=false, ink=U.ink, opts={}) {
  return new Paragraph({spacing:{before:0,after:0,line:Math.round(size*24),lineRule:'exact'},
    children: typeof text==='string' ? [run(text,size,bold,ink)] : text, ...opts});
}
function cell(children, width, opts={}) {
  return new TableCell({width:{size:width,type:WidthType.DXA},borders,
    margins:{top:0,bottom:0,left:0,right:0},children:Array.isArray(children)?children:[children],...opts});
}
function table(widths, rows) {
  return new Table({width:{size:widths.reduce((a,b)=>a+b,0),type:WidthType.DXA},columnWidths:widths,
    layout:TableLayoutType.FIXED,borders:{...borders,insideH:none,insideV:none},rows});
}
function row(cells, height) {return new TableRow({height:{value:height*20,rule:HeightRule.EXACT},cantSplit:true,children:cells});}
function band(text,height=36,width=W,size=14) {
  return table([width],[row([cell(p(text,size,true,C.primary),width,{shading:{fill:color(C.surface),type:ShadingType.CLEAR},margins:{left:100,right:100,top:70,bottom:0}})],height)]);
}
function head(code,title,ref,width=W) {
  return table([width],[row([cell(p([run(code+'  ',15,true,C.accent),run(title,15,true,C.primary)]),width,{borders:{...borders,bottom:{...line,color:color(C.primary)}}})],22),
    row([cell(p(ref,9.5,false,U.ink_soft,{spacing:{before:40,after:0,line:240,lineRule:'exact'}}),width)],16)]);
}
function write(sample,n=2,width=W) {
  return table([width],Array.from({length:n},(_,i)=>row([cell(p(KEY ? (sample[i]||'') : '',12,false,C.primary),width,{borders:{...borders,bottom:line}})],28)));
}
function blank(lead,answer,trail='',width=W,blankWidth=1900) {
  const leadWidth=lead?Math.min(width-blankWidth-700,Math.ceil(lead.length*7.7*20)):0;
  const tail=width-leadWidth-blankWidth;
  return table([...(leadWidth?[leadWidth]:[]),blankWidth,...(tail?[tail]:[])],[row([
    ...(leadWidth?[cell(p(lead),leadWidth)]:[]),cell(p(KEY?answer:'',13.5,KEY,C.primary),blankWidth,{borders:{...borders,bottom:line}}),
    ...(tail?[cell(p(trail),tail)]:[])],28)]);
}
function chain(words,width=W,open=false) {
  const box=Math.floor((width-800)/3), widths=[box,400,box,400,width-800-2*box];
  return table(widths,[row(widths.map((w,i)=>cell(p(i%2?'→':(open&&i===4&&!KEY?'':words[i/2]),12,true,i%2?C.accent:C.primary,{alignment:AlignmentType.CENTER}),w,
    i%2?{}:{shading:{fill:color(C.surface),type:ShadingType.CLEAR},borders:{top:line,bottom:line,left:line,right:line}})),28)]);
}
function spacer(height=8) {return new Paragraph({spacing:{before:0,after:0,line:height*20,lineRule:'exact'},children:[run('',1)]});}
function sampleNote(width=W) {return p(KEY?'Sample answer — student wording may vary.':'',11.5,false,C.primary);}
function examples(labels,answers,width) {
  return table([width],labels.map((label,i)=>row([cell([
    p(label,12,true,C.primary), p(KEY?answers[i]:'',12,false,C.primary,{border:{bottom:line},spacing:{before:0,after:0,line:480,lineRule:'exact'}})
  ],width)],42)));
}
function pageOne() {
  const left=5148,right=5148,gap=360;
  const top=[p('UNIT 1 · ENERGY TRANSFER & TRANSFORMATION',9.5,true,U.ink_soft),spacer(4),
    p('Chapter 1 · Energy Causes Change',23,true,C.primary),p('GUIDED NOTES',11.5,true),spacer(4),
    p('Name: ____________________   Homeroom: ○ 4A  ○ 4B  ○ 4C  ○ 4D',12),spacer(8),
    band('BQ  '+BQ,24),p('My first thinking',14,true,C.primary),
    write(['A pencil gets shorter and sharper.']),spacer(4),
    head('V1','VOCABULARY — ENERGY & CHANGE','Reader p. 1'),
    blank('energy — the ability to cause','change','.'),blank('change — to become','different','.'),spacer(8),
    head('N1','ENERGY CAUSES CHANGE','Reader pp. 1–2'),
    p('Energy has the ability to cause change.',13.5,true),
    blank('When you see a change, you are seeing','evidence','of energy.',W,1900),spacer(4),
    chain(['ENERGY','CHANGE','EVIDENCE'],W,true),spacer(6)];
  const L=[head('N2','DIFFERENT FORMS','Reader p. 3',left),
    p('Write one example that shows a change for each form.',12),spacer(4),
    band('FORM / EXAMPLE OF A CHANGE',22,left,11.5),
    examples(['motion','sound','light','heat','electrical energy'],[
      'a ball rolls across the floor','a drum makes a noise','a flashlight lights up the room','a warm mug warms my hands','a fan spins when plugged in'],left),
    sampleNote(left)];
  const R=[head('V2','STORED ENERGY','Reader p. 4',right),
    p('stored energy — energy that has the ability to cause change at a',13.5),
    blank('', 'later','time.',right,1900),spacer(8),
    head('N3','OBJECTS CAN STORE ENERGY','Reader pp. 4–5',right),
    chain(['STORED ENERGY','RELEASE','CHANGE'],right),spacer(4),
    p('What change could happen later?',12),
    examples(['battery (in a flashlight)','stretched rubber band','raised object (apple)'],[
      'the flashlight lights up','it snaps and makes a sound','it falls down'],right),
    p('Objects also have stored energy because of their',13.5),blank('','position','.',right,1900)];
  top.push(head('N2','ENERGY OCCURS IN DIFFERENT FORMS','Reader p. 3'),
    p('Write one example that shows a change for each form.',12),spacer(6),
    table([3000,W-3000],[row([cell(p('FORM',11.5,true,C.primary),3000),cell(p('ONE EXAMPLE THAT SHOWS A CHANGE',11.5,true,C.primary),W-3000)],22),
      ...['motion','sound','light','heat','electrical energy'].map((label,i)=>row([
        cell(p(label,13.5,true,C.primary),3000,{borders:{...borders,bottom:line}}),
        cell(p(KEY?['a ball rolls across the floor','a drum makes a noise','a flashlight lights up the room','a warm mug warms my hands','a fan spins when plugged in'][i]:'',12,false,C.primary),W-3000,{borders:{...borders,bottom:line}})
      ],26))]),spacer(6),head('V2','VOCABULARY — STORED ENERGY','Reader p. 4'),
    p('stored energy — energy that has the ability to cause change'),blank('at a','later','time.'),spacer(6));
  return top;
}
function pageTwo() {
  const left=5148,right=5148;
  const out=[p('Chapter 1 · Energy Causes Change',12,true,C.primary,{pageBreakBefore:true})];
  const n3=[head('N3','OBJECTS CAN STORE ENERGY','Reader pp. 4–5',left),spacer(10),
    chain(['STORED ENERGY','RELEASE','CHANGE'],left),spacer(6),p('What change could happen later?',12),
    examples(['battery (in a flashlight)','stretched rubber band','raised object (apple)'],[
      'the flashlight lights up','it snaps and makes a sound','it falls down'],left),spacer(8),
    p('Objects also have stored energy because of their',13.5),blank('','position','.',left,1900)];
  const n4=[
    head('N4','RECOGNIZING EVIDENCE','Reader pp. 1–5'),
    p('Draw a change you observed. Show what it looked like BEFORE and AFTER.',12),spacer(10)];
  n4[0]=head('N4','RECOGNIZING EVIDENCE','Reader pp. 1–5',right);
  n4.push(table([right],[row([cell([p('BEFORE',12,true,C.primary),p(KEY?'Sample: a dull pencil, long, rounded tip':'',12,false,C.primary)],right,{borders:{top:line,bottom:line,left:line,right:line},margins:{left:100,right:100,top:60}})],144),
    row([cell([p('AFTER',12,true,C.primary),p(KEY?'Sample: shorter pencil, sharp tip, shavings':'',12,false,C.primary)],right,{borders:{top:line,bottom:line,left:line,right:line},margins:{left:100,right:100,top:60}})],144)]));
  // Drawing panels are side-by-side across full width instead: two 3.575 x 2 inch zones.
  const paired=[head('N3','OBJECTS CAN STORE ENERGY','Reader pp. 4–5'),
    chain(['STORED ENERGY','RELEASE','CHANGE']),
    p('Write what change could happen later for each example.',12),
    table([3800,W-3800],[...['battery (in a flashlight)','stretched rubber band','raised object (apple)'].map((label,i)=>row([
      cell(p(label,12,true,C.primary),3800,{borders:{...borders,bottom:line}}),
      cell(p(KEY?['the flashlight lights up','it snaps and makes a sound','it falls down'][i]:'',12,false,C.primary),W-3800,{borders:{...borders,bottom:line}})
    ],24))]),blank('Objects also have stored energy because of their','position','.'),spacer(4),
    head('N4','RECOGNIZING EVIDENCE','Reader pp. 1–5'),p('Draw a change you observed. Show what it looked like BEFORE and AFTER.',12),spacer(4)];
  out.push(...paired,table([5148,360,5148],[row([
    cell([p('BEFORE',14,true,C.primary,{alignment:AlignmentType.CENTER}),spacer(12),
      p(KEY?'Sample: a dull pencil, long, rounded tip':'',12,false,C.primary)],5148,{borders:{top:line,bottom:line,left:line,right:line},margins:{left:120,right:120,top:100}}),
    cell(p('',1),360),cell([p('AFTER',14,true,C.primary,{alignment:AlignmentType.CENTER}),spacer(12),
      p(KEY?'Sample: shorter pencil, sharp tip, shavings':'',12,false,C.primary)],5148,{borders:{top:line,bottom:line,left:line,right:line},margins:{left:120,right:120,top:100}})
  ],144)]),p('What changed?',14,true),write(['The pencil got shorter and sharper.']),spacer(4),
  p([run('CHECK  ',15,true,C.accent),run('YOUR THINKING',15,true,C.primary)]),p('How do we know energy is involved if we cannot see energy itself?',14,true),
  p('Start with: “We know because we see …”',12,false,U.ink_soft),
  write(['We know because we see a change, like a ball starting to move','or a light turning on.'],2),spacer(6),
  band('BQ · NOW I THINK  '+BQ,36),
  write(['We see evidence of energy when things move, make sound, light up,','heat up, or change shape.'],3));
  return out;
}
async function build(key) {
  KEY=key;
  const suffix=key?'-key':'';
  const footer=new Footer({children:[p([
    run('CORE · ADAPTED · Candidate only · Chapter 1 · Guided Notes',9,false,U.ink_soft),
    run(key?'    TEACHER KEY':'',9,true,C.primary)
  ],9),p(key?'Sample answer — student wording may vary.':'',9,false,C.primary)]});
  const doc=new Document({creator:'Grade 4 Energy curriculum',title:'Chapter 1 Guided Notes'+(key?' — Teacher Key':''),
    styles:{default:{document:{run:{font:'Arial',size:2},paragraph:{spacing:{before:0,after:0,line:20,lineRule:'exact'}}}}},
    sections:[{properties:{page:{size:{width:12240,height:15840},margin:{top:720,bottom:720,left:792,right:792,footer:360}}},
      footers:{default:footer},children:[...pageOne(),...pageTwo(),spacer(1)]}]});
  fs.mkdirSync(OUT,{recursive:true});
  fs.writeFileSync(path.join(OUT,`01-ch1-energy-causes-change-guided-notes-polish${suffix}.docx`),await Packer.toBuffer(doc));
}
(async()=>{await build(false);await build(true);console.log('Candidate DOCX masters written to '+OUT)})().catch(e=>{console.error(e);process.exit(1)});