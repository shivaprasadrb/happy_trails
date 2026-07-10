const D={u:[0,-1],d:[0,1],l:[-1,0],r:[1,0]};
function feas(map,C,Y,F){const H=map.length,W=map[0].length,g=[];let cat,bed;
 for(let y=0;y<H;y++){g[y]=[];for(let x=0;x<W;x++){const c=map[y][x];
  if(c==='#')g[y][x]='B';else if(c==='~')g[y][x]='W';else if(c==='H')g[y][x]='Hd';else if(c===' ')g[y][x]='V';
  else if(c>='a'&&c<='z'){g[y][x]='.';cat={x,y};}else if(c>='A'&&c<='Z'){g[y][x]='E';bed={x,y};}else g[y][x]='.';}}
 const sOK=(x,y)=>x>=0&&y>=0&&x<W&&y<H&&(g[y][x]==='.'||g[y][x]==='E');
 const lOK=(x,y)=>x>=0&&y>=0&&x<W&&y<H&&g[y][x]==='.';
 const blk=(x,y)=>x>=0&&y>=0&&x<W&&y<H&&(g[y][x]==='Hd'||g[y][x]==='V');
 const seen=new Set();const st=[{x:cat.x,y:cat.y,d:'n',j:0,c:0,ya:0,f:0}];
 while(st.length){const s=st.pop();if(s.x===bed.x&&s.y===bed.y)return true;const k=[s.x,s.y,s.d,s.j,s.c,s.ya,s.f].join(',');if(seen.has(k))continue;seen.add(k);
  const sp=(s.x===cat.x&&s.y===cat.y&&s.d==='n');
  for(const e of['u','d','l','r']){const[dx,dy]=D[e];let V;if(sp)V=[[0,0,0]];else if(s.j)V=[[0,0,1]];else if(e===s.d)V=[[0,1,0],[1,0,0]];else V=[[1,0,0]];
   for(const[dc,dyy,df]of V){if(s.c+dc>C||s.ya+dyy>Y||s.f+df>F)continue;const nx=s.x+dx,ny=s.y+dy;if(sOK(nx,ny))st.push({x:nx,y:ny,d:e,j:0,c:s.c+dc,ya:s.ya+dyy,f:s.f+df});
    const mx=s.x+dx,my=s.y+dy,lx=s.x+2*dx,ly=s.y+2*dy;if(!blk(mx,my)&&lOK(lx,ly))st.push({x:lx,y:ly,d:e,j:1,c:s.c+dc,ya:s.ya+dyy,f:s.f+df});}}}return false;}

// carved maps (spaces = void = organic cutouts)
const LV=[
 {b:[4,0,0],m:[
  "  ....",
  " .....",
  "a....A",
  "..... ",
  "...   "]},
 {b:[1,5,0],m:[
  "a....",
  ".....",
  "  ...",
  "  ..A"]},
 {b:[1,4,1],m:[
  " ...A",
  ".....",
  "~~~~~",
  ".....",
  "a... "]},
 {b:[2,7,3],m:[
  "  ....A ",
  " ...... ",
  "~~~~~~~~",
  " ...... ",
  "########",
  " ...... ",
  "~~~~~~~~",
  " ...... ",
  " a..... "]},
 {b:[6,11,0],m:[
  "  HHHHH  ",
  " a..H... ",
  "HHH.H.HHH",
  "H...H...H",
  "H.HHHHH.H",
  "H.......H",
  "HHHHHHH.H",
  " ......A ",
  "  HHHHH  "]},
 {b:[6,13,1],m:[
  "  HHHHH  ",
  " a..H... ",
  "HHH~HHH.H",
  "H.H.....H",
  "H.HHHHH.H",
  "H.H.....H",
  "H.H.HHHHH",
  " ......A ",
  "  HHHHH  "]},
 {b:[8,21,2],m:[
  "  HHHHHHH  ",
  " a..H..... ",
  "HHH~H.H.H.H",
  "H.H.H.H.H.H",
  "H.H.H.H.H.H",
  "H.H#H.H.H.H",
  "H.H.HHH.H.H",
  "H.H.H...H.H",
  "H.H.H.HHH.H",
  " .....H..A ",
  "  HHHHHHH  "]},
 {b:[4,6,1],m:[
  " HHHHHHH ",
  "H..~....H",
  "H.HHHHH.H",
  "a.HHHHH.A",
  "H.HHHHH.H",
  "H.#..~..H",
  " HHHHHHH "]},
 {b:[3,9,1],m:[
  "  HHHHHHH  ",
  " a........ ",
  "HH.HH.HH.HH",
  "HH~HH.HH~HH",
  "HH.HH~HH.HH",
  "HH.HH.HH~HH",
  "HH.HH#HH.HH",
  "HH.HH.HH#HH",
  "HH.HH.HH.HH",
  " ......... ",
  "H....A....H",
  "  HHHHHHH  "]},
];
let allok=true;
LV.forEach((lv,i)=>{const W=Math.max(...lv.m.map(r=>r.length));
 // pad ragged rows to equal width with void
 const m=lv.m.map(r=>r.padEnd(W,' '));
 const ok=feas(m,lv.b[0],lv.b[1],lv.b[2]);
 const widths=[...new Set(lv.m.map(r=>r.length))];
 if(!ok)allok=false;
 console.log('L'+(i+1),'w='+W,'rowWidths='+widths.join(','),'solvable:',ok?'YES':'NO ❌');
});
LV.forEach((lv,i)=>{const ws=new Set(lv.m.map(r=>r.length));if(ws.size>1)console.log("L"+(i+1)+" RAGGED widths "+[...ws].join(",")+" ❌");});
console.log(allok?'\nALL CARVED LEVELS SOLVABLE ✅':'\nSOME FAILED ❌');
