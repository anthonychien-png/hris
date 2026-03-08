import { useState, useMemo } from "react";

const BRANCHES = [
  { id:"b1", name:"H&M Global HQ", parentId:null },
  { id:"b2", name:"North America Division", parentId:"b1" },
  { id:"b3", name:"New York Flagship", parentId:"b2" },
  { id:"b4", name:"Los Angeles Store", parentId:"b2" },
  { id:"b5", name:"Chicago Store", parentId:"b2" },
  { id:"b6", name:"Corporate Office NYC", parentId:"b2" },
];
const DEPTS = ["Sales","Marketing","IT","Operations","HR","Engineering"];
const PLANS = ["General Health Plan","Dental Plan","Vision Plan","Drug Plan"];

const EMPS = [
  {id:"e1", name:"Victoria Anderson",title:"Chief Revenue Officer",    jobLevel:"C-Level", dept:"Sales",      branch:"b6",managerId:null, type:"Exempt",   comp:"Salary",salary:350000,hourly:0,  status:"Active",  email:"v.anderson@hm.com",phone:"212-555-0101",startDate:"2018-03-01",address:"245 Park Ave, New York, NY 10167"},
  {id:"e2", name:"Marcus Chen",      title:"Chief Marketing Officer",  jobLevel:"C-Level", dept:"Marketing",  branch:"b6",managerId:null, type:"Exempt",   comp:"Salary",salary:320000,hourly:0,  status:"Active",  email:"m.chen@hm.com",    phone:"212-555-0102",startDate:"2019-07-15",address:"1 Bryant Park, New York, NY 10036"},
  {id:"e3", name:"Sarah Williams",   title:"Chief Information Officer",jobLevel:"C-Level", dept:"IT",         branch:"b6",managerId:null, type:"Exempt",   comp:"Salary",salary:330000,hourly:0,  status:"Active",  email:"s.williams@hm.com",phone:"212-555-0103",startDate:"2017-11-20",address:"30 Rockefeller Plaza, NY 10112"},
  {id:"e4", name:"Robert Kim",       title:"Chief HR Officer",         jobLevel:"C-Level", dept:"HR",         branch:"b6",managerId:null, type:"Exempt",   comp:"Salary",salary:310000,hourly:0,  status:"Active",  email:"r.kim@hm.com",     phone:"212-555-0104",startDate:"2016-05-10",address:"590 Madison Ave, New York, NY 10022"},
  {id:"e5", name:"Emily Rodriguez",  title:"Chief Technology Officer", jobLevel:"C-Level", dept:"Engineering",branch:"b6",managerId:null, type:"Exempt",   comp:"Salary",salary:340000,hourly:0,  status:"Active",  email:"e.rodriguez@hm.com",phone:"212-555-0105",startDate:"2020-01-06",address:"100 Park Ave, New York, NY 10017"},
  {id:"e6", name:"James Thompson",   title:"Director of Sales",        jobLevel:"Director",dept:"Sales",      branch:"b6",managerId:"e1",type:"Exempt",   comp:"Salary",salary:180000,hourly:0,  status:"Active",  email:"j.thompson@hm.com",phone:"212-555-0106",startDate:"2019-02-14",address:"350 Fifth Ave, New York, NY 10118"},
  {id:"e7", name:"Lisa Park",        title:"Director of Marketing",    jobLevel:"Director",dept:"Marketing",  branch:"b6",managerId:"e2",type:"Exempt",   comp:"Salary",salary:175000,hourly:0,  status:"Active",  email:"l.park@hm.com",    phone:"212-555-0107",startDate:"2020-04-01",address:"1251 Ave of Americas, NY 10020"},
  {id:"e8", name:"David Lee",        title:"Director of IT",           jobLevel:"Director",dept:"IT",         branch:"b6",managerId:"e3",type:"Exempt",   comp:"Salary",salary:185000,hourly:0,  status:"Active",  email:"d.lee@hm.com",     phone:"212-555-0108",startDate:"2018-09-17",address:"200 Vesey St, New York, NY 10281"},
  {id:"e9", name:"Jennifer Brown",   title:"Director of Operations",   jobLevel:"Director",dept:"Operations", branch:"b6",managerId:"e4",type:"Exempt",   comp:"Salary",salary:170000,hourly:0,  status:"Active",  email:"j.brown@hm.com",   phone:"212-555-0109",startDate:"2017-06-25",address:"4 World Trade Ctr, NY 10007"},
  {id:"e10",name:"Michael Davis",    title:"Director of HR",           jobLevel:"Director",dept:"HR",         branch:"b6",managerId:"e4",type:"Exempt",   comp:"Salary",salary:165000,hourly:0,  status:"Active",  email:"m.davis@hm.com",   phone:"212-555-0110",startDate:"2021-03-08",address:"One World Trade, NY 10007"},
  {id:"e11",name:"Amanda Wilson",    title:"Director of Engineering",  jobLevel:"Director",dept:"Engineering",branch:"b6",managerId:"e5",type:"Exempt",   comp:"Salary",salary:195000,hourly:0,  status:"Active",  email:"a.wilson@hm.com",  phone:"212-555-0111",startDate:"2020-10-12",address:"85 Broad St, New York, NY 10004"},
  {id:"e12",name:"John Doe",         title:"Sales Manager",            jobLevel:"Manager", dept:"Sales",      branch:"b3",managerId:"e6",type:"Exempt",   comp:"Salary",salary:95000, hourly:0,  status:"Active",  email:"j.doe@hm.com",     phone:"917-555-0112",startDate:"2021-08-01",address:"150 E 42nd St, New York, NY 10017"},
  {id:"e13",name:"Jane Doe",         title:"Marketing Manager",        jobLevel:"Manager", dept:"Marketing",  branch:"b3",managerId:"e7",type:"Exempt",   comp:"Salary",salary:90000, hourly:0,  status:"Active",  email:"jane.doe@hm.com",  phone:"917-555-0113",startDate:"2022-01-15",address:"320 W 57th St, New York, NY 10019"},
  {id:"e14",name:"Sam Smith",        title:"IT Manager",               jobLevel:"Manager", dept:"IT",         branch:"b6",managerId:"e8",type:"Exempt",   comp:"Salary",salary:100000,hourly:0,  status:"Active",  email:"s.smith@hm.com",   phone:"917-555-0114",startDate:"2020-05-20",address:"75 Varick St, New York, NY 10013"},
  {id:"e15",name:"Carlos Martinez",  title:"Operations Manager",       jobLevel:"Manager", dept:"Operations", branch:"b4",managerId:"e9",type:"Exempt",   comp:"Salary",salary:88000, hourly:0,  status:"Active",  email:"c.martinez@hm.com",phone:"310-555-0115",startDate:"2021-11-30",address:"8500 Beverly Blvd, LA 90048"},
  {id:"e16",name:"Rachel Green",     title:"HR Manager",               jobLevel:"Manager", dept:"HR",         branch:"b6",managerId:"e10",type:"Exempt",  comp:"Salary",salary:85000, hourly:0,  status:"Active",  email:"r.green@hm.com",   phone:"917-555-0116",startDate:"2022-07-11",address:"11 Times Square, NY 10036"},
  {id:"e17",name:"Tyler Johnson",    title:"Engineering Manager",      jobLevel:"Manager", dept:"Engineering",branch:"b6",managerId:"e11",type:"Exempt",  comp:"Salary",salary:120000,hourly:0,  status:"Active",  email:"t.johnson@hm.com", phone:"917-555-0117",startDate:"2019-12-02",address:"641 Lexington Ave, NY 10022"},
  {id:"e18",name:"Priya Patel",      title:"Store Manager",            jobLevel:"Manager", dept:"Sales",      branch:"b4",managerId:"e6",type:"Exempt",   comp:"Salary",salary:78000, hourly:0,  status:"Active",  email:"p.patel@hm.com",   phone:"310-555-0118",startDate:"2023-02-01",address:"6801 Hollywood Blvd, LA 90028"},
  {id:"e19",name:"Derek Wong",       title:"Store Manager",            jobLevel:"Manager", dept:"Operations", branch:"b5",managerId:"e9",type:"Exempt",   comp:"Salary",salary:76000, hourly:0,  status:"Active",  email:"d.wong@hm.com",    phone:"312-555-0119",startDate:"2022-09-19",address:"111 N State St, Chicago 60602"},
  {id:"e20",name:"Sophia Turner",    title:"Software Engineer",        jobLevel:"Working", dept:"Engineering",branch:"b6",managerId:"e17",type:"Exempt",  comp:"Salary",salary:85000, hourly:0,  status:"Active",  email:"s.turner@hm.com",  phone:"917-555-0120",startDate:"2023-06-05",address:"88 Leonard St, New York, NY 10013"},
  {id:"e21",name:"Nathan Brooks",    title:"Marketing Specialist",     jobLevel:"Working", dept:"Marketing",  branch:"b3",managerId:"e13",type:"Exempt",  comp:"Salary",salary:60000, hourly:0,  status:"Active",  email:"n.brooks@hm.com",  phone:"917-555-0121",startDate:"2023-03-14",address:"205 W 57th St, New York, NY 10019"},
  {id:"e22",name:"Olivia Scott",     title:"HR Specialist",            jobLevel:"Working", dept:"HR",         branch:"b6",managerId:"e16",type:"Exempt",  comp:"Salary",salary:58000, hourly:0,  status:"Active",  email:"o.scott@hm.com",   phone:"917-555-0122",startDate:"2024-01-08",address:"477 Madison Ave, NY 10022"},
  {id:"e23",name:"Mason Clark",      title:"Store Associate",          jobLevel:"Working", dept:"Sales",      branch:"b3",managerId:"e12",type:"Non-exempt",comp:"Hourly",salary:0,   hourly:18, status:"Active",  email:"m.clark@hm.com",   phone:"917-555-0123",startDate:"2023-09-01",address:"34 W 34th St, New York, NY 10001"},
  {id:"e24",name:"Isabella Lewis",   title:"Store Associate",          jobLevel:"Working", dept:"Sales",      branch:"b3",managerId:"e12",type:"Non-exempt",comp:"Hourly",salary:0,   hourly:17, status:"Active",  email:"i.lewis@hm.com",   phone:"917-555-0124",startDate:"2024-03-18",address:"40 W 34th St, New York, NY 10001"},
  {id:"e25",name:"Ethan Harris",     title:"Sales Floor Associate",    jobLevel:"Working", dept:"Sales",      branch:"b4",managerId:"e18",type:"Non-exempt",comp:"Hourly",salary:0,   hourly:16.5,status:"Active", email:"e.harris@hm.com",  phone:"310-555-0125",startDate:"2024-05-20",address:"7080 Hollywood Blvd, LA 90028"},
  {id:"e26",name:"Ava Robinson",     title:"Cashier",                  jobLevel:"Working", dept:"Sales",      branch:"b5",managerId:"e19",type:"Non-exempt",comp:"Hourly",salary:0,   hourly:16, status:"Active",  email:"a.robinson@hm.com",phone:"312-555-0126",startDate:"2024-07-10",address:"123 N Michigan Ave, Chicago"},
  {id:"e27",name:"Liam Walker",      title:"Stock Associate",          jobLevel:"Working", dept:"Operations", branch:"b3",managerId:"e12",type:"Non-exempt",comp:"Hourly",salary:0,   hourly:17.5,status:"Active", email:"l.walker@hm.com",  phone:"917-555-0127",startDate:"2023-11-27",address:"50 W 34th St, New York, NY 10001"},
  {id:"e28",name:"Emma Hall",        title:"Customer Service Rep",     jobLevel:"Working", dept:"Sales",      branch:"b4",managerId:"e18",type:"Non-exempt",comp:"Hourly",salary:0,   hourly:16, status:"Active",  email:"e.hall@hm.com",    phone:"310-555-0128",startDate:"2024-02-14",address:"6100 Sunset Blvd, LA 90028"},
  {id:"e29",name:"Noah Allen",       title:"Visual Merchandiser",      jobLevel:"Working", dept:"Marketing",  branch:"b3",managerId:"e13",type:"Non-exempt",comp:"Hourly",salary:0,   hourly:19, status:"Active",  email:"n.allen@hm.com",   phone:"917-555-0129",startDate:"2023-10-09",address:"18 W 34th St, New York, NY 10001"},
  {id:"e30",name:"Mia Young",        title:"IT Support Technician",    jobLevel:"Working", dept:"IT",         branch:"b5",managerId:"e14",type:"Non-exempt",comp:"Hourly",salary:0,   hourly:22, status:"Inactive",email:"m.young@hm.com",   phone:"312-555-0130",startDate:"2022-06-01",address:"55 E Monroe St, Chicago 60603"},
];

function buildPayrolls(emps) {
  const rows=[]; let n=1; const r2=v=>Math.round(v*100)/100;
  const fmt=d=>d.toISOString().split("T")[0];
  for(let m=0;m<6;m++){const sd=new Date(2025,m,1),ed=new Date(2025,m+1,0);emps.filter(e=>e.jobLevel==="C-Level"&&e.status==="Active").forEach(e=>{const g=e.salary/12;rows.push({id:`pr${n++}`,empId:e.id,freq:"Monthly",sd:fmt(sd),ed:fmt(ed),regH:173,otH:0,gross:r2(g),taxes:r2(g*0.37),net:r2(g*0.63),status:"Committed"});});}
  for(let p=0;p<12;p++){const m=Math.floor(p/2),first=p%2===0,sd=new Date(2025,m,first?1:16),ed=new Date(2025,m,first?15:new Date(2025,m+1,0).getDate());emps.filter(e=>e.jobLevel==="Director"&&e.status==="Active").forEach(e=>{const g=e.salary/24;rows.push({id:`pr${n++}`,empId:e.id,freq:"Semi-monthly",sd:fmt(sd),ed:fmt(ed),regH:87,otH:0,gross:r2(g),taxes:r2(g*0.32),net:r2(g*0.68),status:"Committed"});});}
  for(let p=0;p<13;p++){const sd=new Date(2025,0,5+p*14),ed=new Date(sd);ed.setDate(ed.getDate()+13);emps.filter(e=>e.jobLevel==="Manager"&&e.status==="Active").forEach(e=>{const g=e.salary/26;rows.push({id:`pr${n++}`,empId:e.id,freq:"Bi-weekly",sd:fmt(sd),ed:fmt(ed),regH:80,otH:0,gross:r2(g),taxes:r2(g*0.28),net:r2(g*0.72),status:"Committed"});});}
  for(let w=0;w<26;w++){const sd=new Date(2025,0,5+w*7),ed=new Date(sd);ed.setDate(ed.getDate()+6);emps.filter(e=>e.type==="Non-exempt"&&e.status==="Active").forEach(e=>{const ot=(w%3===0)?4:0,g=e.hourly*40+e.hourly*1.5*ot;rows.push({id:`pr${n++}`,empId:e.id,freq:"Weekly",sd:fmt(sd),ed:fmt(ed),regH:40,otH:ot,gross:r2(g),taxes:r2(g*0.22),net:r2(g*0.78),status:w<12?"Committed":"Pending"});});}
  return rows;
}

const INIT_PTO=[
  {id:"pto1",empId:"e23",sd:"2025-01-20",ed:"2025-01-22",hrs:24,reason:"Personal vacation", status:"Approved",mgr:"e12"},
  {id:"pto2",empId:"e24",sd:"2025-02-10",ed:"2025-02-11",hrs:16,reason:"Family event",       status:"Pending", mgr:"e12"},
  {id:"pto3",empId:"e20",sd:"2025-03-03",ed:"2025-03-07",hrs:40,reason:"Spring vacation",    status:"Approved",mgr:"e17"},
  {id:"pto4",empId:"e21",sd:"2025-01-15",ed:"2025-01-15",hrs:8, reason:"Doctor appointment",status:"Approved",mgr:"e13"},
  {id:"pto5",empId:"e25",sd:"2025-04-07",ed:"2025-04-09",hrs:24,reason:"Personal",           status:"Pending", mgr:"e18"},
];
const INIT_TIME=[
  {id:"t1",empId:"e23",week:"2025-01-06",mon:8,tue:8,wed:8,thu:8,fri:8,sat:0,sun:0,ot:0,status:"Approved"},
  {id:"t2",empId:"e24",week:"2025-01-06",mon:8,tue:8,wed:8,thu:8,fri:8,sat:4,sun:0,ot:4,status:"Approved"},
  {id:"t3",empId:"e27",week:"2025-01-06",mon:8,tue:8,wed:8,thu:8,fri:8,sat:6,sun:0,ot:6,status:"Approved"},
  {id:"t4",empId:"e25",week:"2025-01-13",mon:8,tue:8,wed:8,thu:8,fri:8,sat:0,sun:0,ot:0,status:"Submitted"},
  {id:"t5",empId:"e29",week:"2025-01-13",mon:8,tue:8,wed:8,thu:8,fri:8,sat:0,sun:0,ot:0,status:"Submitted"},
];
const INIT_ENROLL=[
  {id:"en1",empId:"e12",plans:["General Health Plan","Dental Plan","Vision Plan"]},
  {id:"en2",empId:"e13",plans:["General Health Plan","Drug Plan"]},
  {id:"en3",empId:"e20",plans:["General Health Plan","Dental Plan","Vision Plan","Drug Plan"]},
  {id:"en4",empId:"e23",plans:["General Health Plan"]},
  {id:"en5",empId:"e17",plans:["General Health Plan","Dental Plan","Vision Plan","Drug Plan"]},
];
const INIT_CLAIMS=[
  {id:"cl1",empId:"e12",plan:"Dental Plan",        date:"2025-01-15",amount:250, desc:"Annual cleaning",     status:"Approved"},
  {id:"cl2",empId:"e23",plan:"General Health Plan",date:"2025-02-03",amount:150, desc:"Doctor visit",        status:"Pending"},
  {id:"cl3",empId:"e20",plan:"Vision Plan",        date:"2025-01-28",amount:200, desc:"Prescription glasses",status:"Approved"},
  {id:"cl4",empId:"e13",plan:"Drug Plan",          date:"2025-03-10",amount:85,  desc:"Monthly prescription",status:"Approved"},
  {id:"cl5",empId:"e17",plan:"Dental Plan",        date:"2025-02-20",amount:1200,desc:"Crown procedure",     status:"Pending"},
];

// ── Design tokens ──────────────────────────────────────────────
const C={bg:"#f4f4f8",surface:"#fff",border:"#e4e4ec",text:"#16161e",textMd:"#46465c",textSm:"#888898",red:"#cc0015",redBg:"#fff0f1",redBd:"#ffd0d4"};
const LC={"C-Level":["#6d28d9","#ede9fe"],"Director":["#0369a1","#e0f2fe"],"Manager":["#0f766e","#ccfbf1"],"Working":["#b45309","#fef3c7"]};
const SC={Active:["#15803d","#dcfce7"],Inactive:["#b91c1c","#fee2e2"],Pending:["#b45309","#fef3c7"],Approved:["#15803d","#dcfce7"],Rejected:["#b91c1c","#fee2e2"],Committed:["#1d4ed8","#dbeafe"],Submitted:["#6d28d9","#ede9fe"]};

// ── Helpers ────────────────────────────────────────────────────
const uid=()=>Math.random().toString(36).slice(2,9);
const $=v=>"$"+Number(v).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2});
const ini=n=>n.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();

function Badge({label,colors}){
  const[fg,bg]=colors||SC[label]||["#555","#eee"];
  return <span style={{display:"inline-flex",padding:"2px 9px",borderRadius:20,fontSize:11,fontWeight:600,background:bg,color:fg}}>{label}</span>;
}
function Av({name,size=30}){
  const h=(name.charCodeAt(0)*41+(name.charCodeAt(1)||0)*13)%360;
  return <div style={{width:size,height:size,borderRadius:"50%",background:`hsl(${h},50%,91%)`,border:`1.5px solid hsl(${h},50%,74%)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*.36,fontWeight:700,color:`hsl(${h},50%,32%)`,flexShrink:0}}>{ini(name)}</div>;
}
function Card({children,style={}}){return <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:12,padding:18,...style}}>{children}</div>;}
function Btn({children,onClick,v="primary",s="md",disabled=false}){
  const base={cursor:disabled?"not-allowed":"pointer",border:"none",borderRadius:8,fontFamily:"'DM Sans',sans-serif",fontWeight:600,display:"inline-flex",alignItems:"center",gap:5,opacity:disabled?.45:1,whiteSpace:"nowrap",lineHeight:1.2};
  const sz=s==="sm"?{padding:"4px 10px",fontSize:11}:{padding:"8px 15px",fontSize:13};
  const co=v==="primary"?{background:C.red,color:"#fff",boxShadow:"0 1px 4px rgba(204,0,21,.22)"}:v==="ghost"?{background:"transparent",color:C.textMd,border:`1px solid ${C.border}`}:v==="danger"?{background:"#fee2e2",color:"#b91c1c",border:"1px solid #fca5a5"}:{background:C.redBg,color:C.red,border:`1px solid ${C.redBd}`};
  return <button style={{...base,...sz,...co}} onClick={onClick} disabled={disabled}>{children}</button>;
}
function Inp({label,value,onChange,type="text",placeholder="",required=false,options=null}){
  const s={background:C.bg,border:`1px solid ${C.border}`,color:C.text,padding:"8px 11px",borderRadius:8,fontSize:13,width:"100%",fontFamily:"'DM Sans',sans-serif",outline:"none"};
  return(
    <div style={{marginBottom:14}}>
      {label&&<label style={{display:"block",fontSize:11,color:C.textSm,letterSpacing:".06em",textTransform:"uppercase",marginBottom:4,fontWeight:600}}>{label}{required&&<span style={{color:C.red}}> *</span>}</label>}
      {options?<select value={value} onChange={e=>onChange(e.target.value)} style={s}>{options.map(o=><option key={o}>{o}</option>)}</select>:<input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={s}/>}
    </div>
  );
}
function Modal({title,onClose,children,wide=false}){
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(10,10,22,.45)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:900,backdropFilter:"blur(4px)"}} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:16,padding:26,width:wide?"700px":"490px",maxHeight:"92vh",overflowY:"auto",maxWidth:"96vw",boxShadow:"0 24px 60px rgba(0,0,0,.14)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:800,color:C.text}}>{title}</h2>
          <button onClick={onClose} style={{background:"none",border:"none",fontSize:20,cursor:"pointer",color:C.textSm}}>&times;</button>
        </div>
        {children}
      </div>
    </div>
  );
}
function Tbl({cols,rows}){
  return(
    <div style={{overflowX:"auto"}}>
      <table style={{borderCollapse:"collapse",width:"100%"}}>
        <thead><tr style={{background:C.bg,borderBottom:`1px solid ${C.border}`}}>{cols.map(c=><th key={c.key} style={{padding:"9px 13px",textAlign:"left",color:C.textSm,fontSize:10,letterSpacing:".08em",textTransform:"uppercase",fontWeight:700,whiteSpace:"nowrap"}}>{c.label}</th>)}</tr></thead>
        <tbody>
          {rows.length===0?<tr><td colSpan={cols.length} style={{padding:32,textAlign:"center",color:C.textSm,fontSize:13}}>No records</td></tr>
          :rows.map((row,i)=>(
            <tr key={i} style={{borderBottom:`1px solid ${C.border}`,cursor:row._click?"pointer":"default"}}
              onMouseEnter={e=>{e.currentTarget.style.background="#f8f8fc"}} onMouseLeave={e=>{e.currentTarget.style.background=""}}
              onClick={row._click}>
              {cols.map(c=><td key={c.key} style={{padding:"10px 13px",fontSize:13,color:C.textMd,whiteSpace:"nowrap"}}>{c.render?c.render(row):row[c.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function TabBar({tabs,active,onChange}){
  return(
    <div style={{display:"flex",gap:2,background:C.bg,border:`1px solid ${C.border}`,padding:3,borderRadius:10,width:"fit-content",marginBottom:20}}>
      {tabs.map(t=><button key={t.id} onClick={()=>onChange(t.id)} style={{padding:"6px 17px",borderRadius:7,border:"none",cursor:"pointer",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:12,background:active===t.id?C.red:"transparent",color:active===t.id?"#fff":C.textSm,transition:"all .15s"}}>{t.label}</button>)}
    </div>
  );
}
function Hdr({title,sub,action}){
  return(
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:22}}>
      <div>
        <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:23,fontWeight:800,color:C.text,letterSpacing:"-.03em"}}>{title}</h1>
        {sub&&<p style={{color:C.textSm,fontSize:13,marginTop:3}}>{sub}</p>}
      </div>
      {action}
    </div>
  );
}

// ── Employee Profile ───────────────────────────────────────────
function Profile({emp:init,employees,payrolls,ptoRequests,timeEntries,enrollments,claims,branches,onClose,onSave,canEdit}){
  const [tab,setTab]=useState("overview");
  const [editing,setEditing]=useState(false);
  const [emp,setEmp]=useState(init);
  const [form,setForm]=useState({...init});

  const mgr=employees.find(e=>e.id===emp.managerId);
  const rpts=employees.filter(e=>e.managerId===emp.id&&e.status==="Active");
  const pay=payrolls.filter(p=>p.empId===emp.id).slice(0,15);
  const pto=ptoRequests.filter(p=>p.empId===emp.id);
  const time=timeEntries.filter(t=>t.empId===emp.id);
  const enroll=enrollments.find(e=>e.empId===emp.id);
  const clms=claims.filter(c=>c.empId===emp.id);
  const bname=id=>branches.find(b=>b.id===id)?.name||"—";

  const tenure=()=>{
    const s=new Date(emp.startDate||""),now=new Date();
    if(isNaN(s))return "—";
    const y=Math.floor((now-s)/(1e3*60*60*24*365)),m=Math.floor(((now-s)%(1e3*60*60*24*365))/(1e3*60*60*24*30));
    return `${y}y ${m}m`;
  };

  function save(){const u={...form,salary:+form.salary||0,hourly:+form.hourly||0};onSave(u);setEmp(u);setEditing(false);}
  const TABS=[{id:"overview",label:"Overview"},{id:"payroll",label:"Payroll"},{id:"time",label:"Time & PTO"},{id:"benefits",label:"Benefits"}];
  const [lc,lb]=LC[emp.jobLevel]||["#888","#eee"];

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(8,8,20,.48)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,backdropFilter:"blur(5px)"}} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:C.surface,borderRadius:20,width:880,maxWidth:"97vw",maxHeight:"94vh",display:"flex",flexDirection:"column",boxShadow:"0 28px 70px rgba(0,0,0,.18)",overflow:"hidden"}}>

        {/* Banner */}
        <div style={{background:`linear-gradient(135deg,${C.red} 0%,#7b000e 100%)`,padding:"24px 28px 0",flexShrink:0}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
            <div style={{display:"flex",alignItems:"center",gap:14}}>
              <div style={{width:58,height:58,borderRadius:"50%",background:"rgba(255,255,255,.18)",border:"2px solid rgba(255,255,255,.3)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:19,fontWeight:800,color:"#fff",flexShrink:0}}>{ini(emp.name)}</div>
              <div>
                <div style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:"#fff",letterSpacing:"-.03em"}}>{emp.name}</div>
                <div style={{color:"rgba(255,255,255,.72)",fontSize:13,marginTop:2}}>{emp.title}</div>
                <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>
                  {[[emp.jobLevel,lb,lc],[emp.dept,"rgba(255,255,255,.16)","#fff"],[emp.status,emp.status==="Active"?"rgba(34,197,94,.28)":"rgba(239,68,68,.28)","#fff"],[emp.type+" · "+emp.comp,"rgba(255,255,255,.12)","rgba(255,255,255,.82)"]].map(([t,bg,fg])=>(
                    <span key={t} style={{background:bg,color:fg,padding:"2px 10px",borderRadius:20,fontSize:11,fontWeight:600}}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
            <div style={{display:"flex",gap:7}}>
              {canEdit&&!editing&&<button onClick={()=>{setForm({...emp});setEditing(true);setTab("overview");}} style={{background:"rgba(255,255,255,.14)",border:"1px solid rgba(255,255,255,.28)",color:"#fff",padding:"7px 14px",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:600,fontFamily:"'DM Sans',sans-serif"}}>✎ Edit Profile</button>}
              {editing&&<><button onClick={save} style={{background:"rgba(255,255,255,.9)",border:"none",color:C.red,padding:"7px 14px",borderRadius:8,cursor:"pointer",fontSize:12,fontWeight:700,fontFamily:"'DM Sans',sans-serif"}}>✓ Save</button><button onClick={()=>setEditing(false)} style={{background:"rgba(255,255,255,.12)",border:"1px solid rgba(255,255,255,.25)",color:"#fff",padding:"7px 14px",borderRadius:8,cursor:"pointer",fontSize:12,fontFamily:"'DM Sans',sans-serif"}}>Cancel</button></>}
              <button onClick={onClose} style={{background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.22)",color:"#fff",padding:"7px 12px",borderRadius:8,cursor:"pointer",fontSize:17,lineHeight:1}}>&times;</button>
            </div>
          </div>
          <div style={{display:"flex"}}>
            {TABS.map(t=><button key={t.id} onClick={()=>{setTab(t.id);if(t.id!=="overview")setEditing(false);}} style={{padding:"9px 19px",border:"none",background:"transparent",color:tab===t.id?"#fff":"rgba(255,255,255,.5)",fontFamily:"'DM Sans',sans-serif",fontWeight:600,fontSize:13,cursor:"pointer",borderBottom:tab===t.id?"2px solid #fff":"2px solid transparent",transition:"all .15s"}}>{t.label}</button>)}
          </div>
        </div>

        {/* Body */}
        <div style={{flex:1,overflowY:"auto",padding:24,background:C.bg}}>

          {/* Overview – View */}
          {tab==="overview"&&!editing&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <Card>
                <div style={{fontSize:10,fontWeight:700,color:C.textSm,letterSpacing:".08em",textTransform:"uppercase",marginBottom:12,paddingBottom:10,borderBottom:`1px solid ${C.border}`}}>Contact Information</div>
                {[["Email",emp.email||"—"],["Phone",emp.phone||"—"],["Address",emp.address||"—"]].map(([l,v])=>(
                  <div key={l} style={{marginBottom:12}}><div style={{fontSize:10,color:C.textSm,fontWeight:700,textTransform:"uppercase",letterSpacing:".05em",marginBottom:2}}>{l}</div><div style={{fontSize:13,color:C.text,fontWeight:500}}>{v}</div></div>
                ))}
              </Card>
              <Card>
                <div style={{fontSize:10,fontWeight:700,color:C.textSm,letterSpacing:".08em",textTransform:"uppercase",marginBottom:12,paddingBottom:10,borderBottom:`1px solid ${C.border}`}}>Employment Details</div>
                {[["Start Date",emp.startDate||"—"],["Tenure",tenure()],["Compensation",emp.comp==="Salary"?$(emp.salary)+"/yr":$(emp.hourly)+"/hr"],["Branch",bname(emp.branch)],["ID",emp.id]].map(([l,v])=>(
                  <div key={l} style={{display:"flex",justifyContent:"space-between",paddingBottom:9,marginBottom:9,borderBottom:`1px solid ${C.border}`}}>
                    <span style={{fontSize:12,color:C.textSm}}>{l}</span>
                    <span style={{fontSize:13,fontWeight:500,color:C.text}}>{v}</span>
                  </div>
                ))}
              </Card>
              <Card>
                <div style={{fontSize:10,fontWeight:700,color:C.textSm,letterSpacing:".08em",textTransform:"uppercase",marginBottom:12,paddingBottom:10,borderBottom:`1px solid ${C.border}`}}>Reporting Structure</div>
                <div style={{marginBottom:14}}>
                  <div style={{fontSize:10,color:C.textSm,fontWeight:700,textTransform:"uppercase",letterSpacing:".06em",marginBottom:7}}>Reports To</div>
                  {mgr?<div style={{display:"flex",alignItems:"center",gap:9,padding:"9px 11px",background:C.bg,borderRadius:8,border:`1px solid ${C.border}`}}><Av name={mgr.name} size={30}/><div><div style={{fontSize:13,fontWeight:600,color:C.text}}>{mgr.name}</div><div style={{fontSize:11,color:C.textSm}}>{mgr.title}</div></div></div>:<div style={{fontSize:13,color:C.textSm,fontStyle:"italic"}}>Top-level executive</div>}
                </div>
                <div style={{fontSize:10,color:C.textSm,fontWeight:700,textTransform:"uppercase",letterSpacing:".06em",marginBottom:8}}>Direct Reports ({rpts.length})</div>
                {rpts.length===0?<div style={{fontSize:13,color:C.textSm,fontStyle:"italic"}}>None</div>:rpts.slice(0,4).map(r=><div key={r.id} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 10px",background:C.bg,borderRadius:7,border:`1px solid ${C.border}`,marginBottom:6}}><Av name={r.name} size={24}/><div><div style={{fontSize:12,fontWeight:600,color:C.text}}>{r.name}</div><div style={{fontSize:10,color:C.textSm}}>{r.title}</div></div></div>)}
                {rpts.length>4&&<div style={{fontSize:12,color:C.red,fontWeight:600,marginTop:4}}>+{rpts.length-4} more</div>}
              </Card>
              <Card>
                <div style={{fontSize:10,fontWeight:700,color:C.textSm,letterSpacing:".08em",textTransform:"uppercase",marginBottom:12,paddingBottom:10,borderBottom:`1px solid ${C.border}`}}>Activity Summary</div>
                {[["Pay Runs YTD",pay.length,"#6d28d9"],["PTO Approved",pto.filter(p=>p.status==="Approved").reduce((s,p)=>s+p.hrs,0)+"h","#0369a1"],["Benefits Plans",enroll?.plans.length||0,"#0f766e"],["Benefits Claims",clms.length,C.red],["YTD Net Pay",$(pay.reduce((s,p)=>s+p.net,0)),"#15803d"]].map(([l,v,co])=>(
                  <div key={l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingBottom:9,marginBottom:9,borderBottom:`1px solid ${C.border}`}}>
                    <span style={{fontSize:12,color:C.textSm}}>{l}</span>
                    <span style={{fontSize:15,fontWeight:800,color:co}}>{v}</span>
                  </div>
                ))}
              </Card>
            </div>
          )}

          {/* Overview – Edit */}
          {tab==="overview"&&editing&&(
            <div>
              <Card style={{marginBottom:14}}>
                <div style={{fontSize:10,fontWeight:700,color:C.textSm,letterSpacing:".08em",textTransform:"uppercase",marginBottom:14,paddingBottom:10,borderBottom:`1px solid ${C.border}`}}>Personal Information</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 18px"}}>
                  <div style={{gridColumn:"1/-1"}}><Inp label="Full Name" value={form.name} onChange={v=>setForm(f=>({...f,name:v}))} required/></div>
                  <Inp label="Job Title" value={form.title} onChange={v=>setForm(f=>({...f,title:v}))} required/>
                  <Inp label="Email" type="email" value={form.email||""} onChange={v=>setForm(f=>({...f,email:v}))}/>
                  <Inp label="Phone" value={form.phone||""} onChange={v=>setForm(f=>({...f,phone:v}))}/>
                  <div style={{gridColumn:"1/-1"}}><Inp label="Address" value={form.address||""} onChange={v=>setForm(f=>({...f,address:v}))}/></div>
                </div>
              </Card>
              <Card>
                <div style={{fontSize:10,fontWeight:700,color:C.textSm,letterSpacing:".08em",textTransform:"uppercase",marginBottom:14,paddingBottom:10,borderBottom:`1px solid ${C.border}`}}>Employment Details</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 18px"}}>
                  <Inp label="Department"       value={form.dept}     onChange={v=>setForm(f=>({...f,dept:v}))}     options={DEPTS}/>
                  <Inp label="Job Level"         value={form.jobLevel} onChange={v=>setForm(f=>({...f,jobLevel:v}))} options={["C-Level","Director","Manager","Working"]}/>
                  <Inp label="Employment Type"   value={form.type}     onChange={v=>setForm(f=>({...f,type:v}))}     options={["Exempt","Non-exempt"]}/>
                  <Inp label="Compensation Type" value={form.comp}     onChange={v=>setForm(f=>({...f,comp:v}))}     options={["Salary","Hourly"]}/>
                  {form.comp==="Salary"?<Inp label="Annual Salary ($)" type="number" value={form.salary} onChange={v=>setForm(f=>({...f,salary:v}))}/>:<Inp label="Hourly Rate ($)" type="number" value={form.hourly} onChange={v=>setForm(f=>({...f,hourly:v}))}/>}
                  <Inp label="Start Date" type="date" value={form.startDate||""} onChange={v=>setForm(f=>({...f,startDate:v}))}/>
                  <Inp label="Status" value={form.status} onChange={v=>setForm(f=>({...f,status:v}))} options={["Active","Inactive"]}/>
                  <div style={{marginBottom:14}}>
                    <label style={{display:"block",fontSize:11,color:C.textSm,letterSpacing:".06em",textTransform:"uppercase",marginBottom:4,fontWeight:600}}>Branch</label>
                    <select value={form.branch} onChange={e=>setForm(f=>({...f,branch:e.target.value}))} style={{background:C.bg,border:`1px solid ${C.border}`,color:C.text,padding:"8px 11px",borderRadius:8,fontSize:13,width:"100%",fontFamily:"'DM Sans',sans-serif",outline:"none"}}>
                      {BRANCHES.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                  </div>
                  <div style={{marginBottom:14}}>
                    <label style={{display:"block",fontSize:11,color:C.textSm,letterSpacing:".06em",textTransform:"uppercase",marginBottom:4,fontWeight:600}}>Reports To</label>
                    <select value={form.managerId||""} onChange={e=>setForm(f=>({...f,managerId:e.target.value||null}))} style={{background:C.bg,border:`1px solid ${C.border}`,color:C.text,padding:"8px 11px",borderRadius:8,fontSize:13,width:"100%",fontFamily:"'DM Sans',sans-serif",outline:"none"}}>
                      <option value="">None (Top Executive)</option>
                      {employees.filter(e=>e.id!==emp.id&&e.status==="Active").map(e=><option key={e.id} value={e.id}>{e.name} — {e.title}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{display:"flex",gap:9,marginTop:4}}><Btn onClick={save}>✓ Save Changes</Btn><Btn v="ghost" onClick={()=>setEditing(false)}>Cancel</Btn></div>
              </Card>
            </div>
          )}

          {/* Payroll */}
          {tab==="payroll"&&(
            <div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:16}}>
                {[["YTD Gross",$(pay.reduce((s,p)=>s+p.gross,0)),"#6d28d9"],["YTD Taxes",$(pay.reduce((s,p)=>s+p.taxes,0)),"#b45309"],["YTD Net",$(pay.reduce((s,p)=>s+p.net,0)),"#15803d"]].map(([l,v,co])=>(
                  <Card key={l} style={{textAlign:"center"}}><div style={{fontSize:10,color:C.textSm,textTransform:"uppercase",letterSpacing:".08em",fontWeight:700,marginBottom:5}}>{l}</div><div style={{fontFamily:"'Syne',sans-serif",fontSize:21,fontWeight:800,color:co}}>{v}</div></Card>
                ))}
              </div>
              <Card style={{padding:0}}><Tbl cols={[{key:"freq",label:"Freq"},{key:"sd",label:"Start"},{key:"ed",label:"End"},{key:"regH",label:"Reg",render:r=>`${r.regH}h`},{key:"otH",label:"OT",render:r=><span style={{color:r.otH>0?"#b45309":C.textSm}}>{r.otH}h</span>},{key:"gross",label:"Gross",render:r=><b style={{color:C.text}}>{$(r.gross)}</b>},{key:"taxes",label:"Tax",render:r=><span style={{color:C.textSm}}>{$(r.taxes)}</span>},{key:"net",label:"Net",render:r=><b style={{color:"#15803d"}}>{$(r.net)}</b>},{key:"status",label:"Status",render:r=><Badge label={r.status}/>}]} rows={pay}/></Card>
            </div>
          )}

          {/* Time */}
          {tab==="time"&&(
            <div style={{display:"grid",gap:14}}>
              <Card style={{padding:0}}>
                <div style={{padding:"12px 17px",borderBottom:`1px solid ${C.border}`,fontSize:10,fontWeight:700,color:C.textSm,textTransform:"uppercase",letterSpacing:".08em"}}>Timesheets</div>
                <Tbl cols={[{key:"week",label:"Week"},["mon","tue","wed","thu","fri","sat"].map(d=>({key:d,label:d.charAt(0).toUpperCase()+d.slice(1),render:r=><span style={{color:r[d]>0?C.text:C.textSm}}>{r[d]}h</span>})),...[],{key:"ot",label:"OT",render:r=><span style={{color:r.ot>0?"#b91c1c":C.textSm,fontWeight:r.ot>0?700:400}}>{r.ot}h</span>},{key:"status",label:"Status",render:r=><Badge label={r.status}/>}].flat()} rows={time}/>
              </Card>
              <Card style={{padding:0}}>
                <div style={{padding:"12px 17px",borderBottom:`1px solid ${C.border}`,fontSize:10,fontWeight:700,color:C.textSm,textTransform:"uppercase",letterSpacing:".08em"}}>PTO Requests</div>
                <Tbl cols={[{key:"sd",label:"Start"},{key:"ed",label:"End"},{key:"hrs",label:"Hours",render:r=>`${r.hrs}h`},{key:"reason",label:"Reason"},{key:"status",label:"Status",render:r=><Badge label={r.status}/>}]} rows={pto}/>
              </Card>
            </div>
          )}

          {/* Benefits */}
          {tab==="benefits"&&(
            <div style={{display:"grid",gap:14}}>
              <Card>
                <div style={{fontSize:10,fontWeight:700,color:C.textSm,letterSpacing:".08em",textTransform:"uppercase",marginBottom:12,paddingBottom:10,borderBottom:`1px solid ${C.border}`}}>Enrolled Plans</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  {PLANS.map(plan=>{const on=enroll?.plans.includes(plan);return(
                    <div key={plan} style={{padding:"12px 14px",background:on?C.redBg:C.bg,border:`1px solid ${on?C.redBd:C.border}`,borderRadius:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <div><div style={{fontSize:13,fontWeight:600,color:on?C.red:C.textMd}}>{plan}</div><div style={{fontSize:11,color:C.textSm,marginTop:2}}>{on?"Active":"Not enrolled"}</div></div>
                      {on&&<span style={{fontSize:17,color:C.red,fontWeight:700}}>✓</span>}
                    </div>
                  );})}
                </div>
              </Card>
              <Card style={{padding:0}}>
                <div style={{padding:"12px 17px",borderBottom:`1px solid ${C.border}`,fontSize:10,fontWeight:700,color:C.textSm,textTransform:"uppercase",letterSpacing:".08em"}}>Claims History</div>
                <Tbl cols={[{key:"plan",label:"Plan"},{key:"date",label:"Date"},{key:"amount",label:"Amount",render:r=><b>{$(r.amount)}</b>},{key:"desc",label:"Description"},{key:"status",label:"Status",render:r=><Badge label={r.status}/>}]} rows={clms}/>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Dashboard ──────────────────────────────────────────────────
function Dashboard({employees,payrolls,ptoRequests,claims}){
  const act=employees.filter(e=>e.status==="Active").length;
  const monthPay=payrolls.filter(p=>p.freq==="Monthly"&&p.sd.startsWith("2025-01")).reduce((s,p)=>s+p.gross,0);
  const stats=[{l:"Total Employees",v:employees.length,sub:`${act} active`,co:C.red},{l:"Monthly Payroll",v:$(monthPay),sub:"Jan 2025",co:"#6d28d9"},{l:"Pending PTO",v:ptoRequests.filter(p=>p.status==="Pending").length,sub:"awaiting approval",co:"#b45309"},{l:"Open Claims",v:claims.filter(c=>c.status==="Pending").length,sub:"benefits claims",co:"#0369a1"}];
  const ld=["C-Level","Director","Manager","Working"].map(l=>({l,n:employees.filter(e=>e.jobLevel===l&&e.status==="Active").length}));
  const dd=DEPTS.map(d=>({d,n:employees.filter(e=>e.dept===d&&e.status==="Active").length}));
  return(
    <div style={{padding:30}}>
      <Hdr title="Dashboard" sub="H&M People Platform — 2025"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:22}}>
        {stats.map(s=><Card key={s.l} style={{borderTop:`3px solid ${s.co}`}}><div style={{fontSize:10,color:C.textSm,letterSpacing:".08em",textTransform:"uppercase",fontWeight:700,marginBottom:5}}>{s.l}</div><div style={{fontFamily:"'Syne',sans-serif",fontSize:25,fontWeight:800,color:s.co,letterSpacing:"-.02em"}}>{s.v}</div><div style={{fontSize:12,color:C.textSm,marginTop:3}}>{s.sub}</div></Card>)}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}}>
        <Card>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:C.text,marginBottom:12}}>Workforce by Level</div>
          {ld.map(({l,n})=>{const[co]=LC[l];return(<div key={l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:9}}><div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:7,height:7,borderRadius:"50%",background:co}}/><span style={{fontSize:13,color:C.textMd}}>{l}</span></div><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:78,height:5,background:C.bg,borderRadius:3,border:`1px solid ${C.border}`}}><div style={{width:`${(n/act)*100}%`,height:"100%",background:co,borderRadius:3}}/></div><span style={{fontSize:13,fontWeight:700,color:C.text,width:16,textAlign:"right"}}>{n}</span></div></div>);})}
        </Card>
        <Card>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:C.text,marginBottom:12}}>Headcount by Department</div>
          {dd.map(({d,n})=>(<div key={d} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:9}}><span style={{fontSize:13,color:C.textMd}}>{d}</span><div style={{display:"flex",alignItems:"center",gap:8}}><div style={{width:78,height:5,background:C.bg,borderRadius:3,border:`1px solid ${C.border}`}}><div style={{width:`${(n/act)*100}%`,height:"100%",background:C.red,borderRadius:3}}/></div><span style={{fontSize:13,fontWeight:700,color:C.text,width:16,textAlign:"right"}}>{n}</span></div></div>))}
        </Card>
        <Card>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:C.text,marginBottom:12}}>Recent PTO Requests</div>
          {ptoRequests.slice(0,5).map(p=><div key={p.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,paddingBottom:10,borderBottom:`1px solid ${C.border}`}}><div><div style={{fontSize:13,color:C.text,fontWeight:500}}>{p.sd}</div><div style={{fontSize:11,color:C.textSm,marginTop:1}}>{p.hrs}h · {p.reason}</div></div><Badge label={p.status}/></div>)}
        </Card>
      </div>
    </div>
  );
}

// ── Employees ──────────────────────────────────────────────────
function Employees({employees,setEmployees,branches,payrolls,ptoRequests,timeEntries,enrollments,claims,currentRole,currentUserId}){
  const [search,setSearch]=useState("");
  const [fDept,setFDept]=useState("All");
  const [fStat,setFStat]=useState("All");
  const [fLvl,setFLvl]=useState("All");
  const [showCreate,setShowCreate]=useState(false);
  const [profile,setProfile]=useState(null);
  const [form,setForm]=useState({});
  const canEdit=currentRole==="HR Admin";

  const filtered=useMemo(()=>{
    let list=currentRole==="Employee"?employees.filter(e=>e.id===currentUserId):employees;
    if(fStat!=="All")list=list.filter(e=>e.status===fStat);
    if(fDept!=="All")list=list.filter(e=>e.dept===fDept);
    if(fLvl!=="All") list=list.filter(e=>e.jobLevel===fLvl);
    if(search)list=list.filter(e=>[e.name,e.title,e.email||""].some(s=>s.toLowerCase().includes(search.toLowerCase())));
    return list;
  },[employees,fDept,fStat,fLvl,search,currentRole,currentUserId]);

  function openCreate(){setForm({name:"",title:"",jobLevel:"Working",dept:"Sales",branch:"b3",managerId:"",type:"Exempt",comp:"Salary",salary:"",hourly:"",status:"Active",email:"",phone:"",startDate:"",address:""});setShowCreate(true);}
  function doCreate(){if(!form.name||!form.title)return;setEmployees(p=>[...p,{...form,id:"e"+uid(),salary:+form.salary||0,hourly:+form.hourly||0}]);setShowCreate(false);}
  function saveProfile(u){setEmployees(p=>p.map(e=>e.id===u.id?u:e));setProfile(u);}
  function deactivate(id,ev){ev.stopPropagation();setEmployees(p=>p.map(e=>e.id===id?{...e,status:"Inactive"}:e));}
  const bname=id=>branches.find(b=>b.id===id)?.name||"—";
  const mname=id=>employees.find(e=>e.id===id)?.name||"—";

  return(
    <div style={{padding:30}}>
      <Hdr title="Employees" sub={`${filtered.length} of ${employees.length} employees`} action={canEdit&&<Btn onClick={openCreate}>＋ New Employee</Btn>}/>
      <div style={{display:"flex",gap:9,marginBottom:18,flexWrap:"wrap"}}>
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name, title, email…" style={{background:C.surface,border:`1px solid ${C.border}`,color:C.text,padding:"8px 12px",borderRadius:8,fontSize:13,width:255,fontFamily:"'DM Sans',sans-serif",outline:"none"}}/>
        {[[fDept,setFDept,["All",...DEPTS]],[fLvl,setFLvl,["All","C-Level","Director","Manager","Working"]],[fStat,setFStat,["All","Active","Inactive"]]].map(([v,fn,opts],i)=>(
          <select key={i} value={v} onChange={e=>fn(e.target.value)} style={{background:C.surface,border:`1px solid ${C.border}`,color:C.textMd,padding:"8px 11px",borderRadius:8,fontSize:13,fontFamily:"'DM Sans',sans-serif",outline:"none",cursor:"pointer"}}>
            {opts.map(o=><option key={o}>{o}</option>)}
          </select>
        ))}
      </div>
      <Card style={{padding:0,overflow:"hidden"}}>
        <Tbl cols={[
          {key:"name",label:"Employee",render:e=><div style={{display:"flex",alignItems:"center",gap:9,cursor:"pointer"}} onClick={()=>setProfile(e)}><Av name={e.name} size={29}/><div><div style={{fontSize:13,fontWeight:600,color:C.text}}>{e.name}</div><div style={{fontSize:11,color:C.textSm,marginTop:1}}>{e.email}</div></div></div>},
          {key:"title",label:"Title",render:e=><span style={{color:C.textMd,fontSize:12}}>{e.title}</span>},
          {key:"dept",label:"Department"},
          {key:"jl",label:"Level",render:e=><Badge label={e.jobLevel} colors={LC[e.jobLevel]}/>},
          {key:"type",label:"Type",render:e=><span style={{fontSize:12,color:C.textSm}}>{e.type}</span>},
          {key:"pay",label:"Pay",render:e=><span style={{fontSize:12,fontWeight:600,color:C.text}}>{e.comp==="Salary"?$(e.salary)+"/yr":$(e.hourly)+"/hr"}</span>},
          {key:"mgr",label:"Manager",render:e=><span style={{fontSize:12,color:C.textSm}}>{mname(e.managerId)}</span>},
          {key:"branch",label:"Branch",render:e=><span style={{fontSize:12,color:C.textSm}}>{bname(e.branch)}</span>},
          {key:"status",label:"Status",render:e=><Badge label={e.status}/>},
          {key:"actions",label:"",render:e=><div style={{display:"flex",gap:6}}><Btn s="sm" v="soft" onClick={ev=>{ev.stopPropagation();setProfile(e);}}>View</Btn>{canEdit&&e.status==="Active"&&<Btn s="sm" v="danger" onClick={ev=>deactivate(e.id,ev)}>Deactivate</Btn>}</div>},
        ]} rows={filtered.map(e=>({...e,_click:()=>setProfile(e)}))}/>
      </Card>

      {showCreate&&<Modal title="New Employee" onClose={()=>setShowCreate(false)} wide>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 18px"}}>
          <div style={{gridColumn:"1/-1"}}><Inp label="Full Name" value={form.name} onChange={v=>setForm(f=>({...f,name:v}))} required/></div>
          <Inp label="Job Title" value={form.title} onChange={v=>setForm(f=>({...f,title:v}))} required/>
          <Inp label="Email" type="email" value={form.email} onChange={v=>setForm(f=>({...f,email:v}))}/>
          <Inp label="Phone" value={form.phone} onChange={v=>setForm(f=>({...f,phone:v}))}/>
          <Inp label="Department"    value={form.dept}     onChange={v=>setForm(f=>({...f,dept:v}))}     options={DEPTS}/>
          <Inp label="Job Level"     value={form.jobLevel} onChange={v=>setForm(f=>({...f,jobLevel:v}))} options={["C-Level","Director","Manager","Working"]}/>
          <Inp label="Emp. Type"     value={form.type}     onChange={v=>setForm(f=>({...f,type:v}))}     options={["Exempt","Non-exempt"]}/>
          <Inp label="Comp. Type"    value={form.comp}     onChange={v=>setForm(f=>({...f,comp:v}))}     options={["Salary","Hourly"]}/>
          {form.comp==="Salary"?<Inp label="Salary ($)" type="number" value={form.salary} onChange={v=>setForm(f=>({...f,salary:v}))}/>:<Inp label="Hourly Rate ($)" type="number" value={form.hourly} onChange={v=>setForm(f=>({...f,hourly:v}))}/>}
          <Inp label="Start Date" type="date" value={form.startDate} onChange={v=>setForm(f=>({...f,startDate:v}))}/>
          <Inp label="Status" value={form.status} onChange={v=>setForm(f=>({...f,status:v}))} options={["Active","Inactive"]}/>
          <div style={{gridColumn:"1/-1"}}><Inp label="Address" value={form.address} onChange={v=>setForm(f=>({...f,address:v}))}/></div>
        </div>
        <div style={{display:"flex",gap:9,marginTop:6}}><Btn onClick={doCreate}>Create Employee</Btn><Btn v="ghost" onClick={()=>setShowCreate(false)}>Cancel</Btn></div>
      </Modal>}

      {profile&&<Profile emp={profile} employees={employees} branches={branches} payrolls={payrolls} ptoRequests={ptoRequests} timeEntries={timeEntries} enrollments={enrollments} claims={claims} canEdit={canEdit} onClose={()=>setProfile(null)} onSave={saveProfile}/>}
    </div>
  );
}

// ── Time & PTO ─────────────────────────────────────────────────
function TimePTO({employees,timeEntries,setTimeEntries,ptoRequests,setPtoRequests,currentRole,currentUserId}){
  const [tab,setTab]=useState("timesheet");
  const [showTF,setShowTF]=useState(false);
  const [showPF,setShowPF]=useState(false);
  const [tf,setTF]=useState({empId:currentUserId,week:"",mon:8,tue:8,wed:8,thu:8,fri:8,sat:0,sun:0});
  const [pf,setPF]=useState({empId:currentUserId,sd:"",ed:"",hrs:"",reason:""});
  const isA=currentRole==="HR Admin",isM=currentRole==="Manager";
  const vt=timeEntries.filter(t=>isA?true:isM?employees.find(e=>e.id===t.empId)?.managerId===currentUserId||t.empId===currentUserId:t.empId===currentUserId);
  const vp=ptoRequests.filter(p=>isA?true:isM?employees.find(e=>e.id===p.empId)?.managerId===currentUserId||p.empId===currentUserId:p.empId===currentUserId);
  const nm=id=>employees.find(e=>e.id===id)?.name||id;
  function submitT(){const tot=[tf.mon,tf.tue,tf.wed,tf.thu,tf.fri,tf.sat,tf.sun].reduce((s,v)=>s+ +v,0);setTimeEntries(p=>[...p,{id:"t"+uid(),...tf,mon:+tf.mon,tue:+tf.tue,wed:+tf.wed,thu:+tf.thu,fri:+tf.fri,sat:+tf.sat,sun:+tf.sun,ot:Math.max(0,tot-40),status:"Submitted"}]);setShowTF(false);}
  function submitP(){setPtoRequests(p=>[...p,{id:"pto"+uid(),...pf,hrs:+pf.hrs,mgr:employees.find(e=>e.id===pf.empId)?.managerId||"",status:"Pending"}]);setShowPF(false);}
  return(
    <div style={{padding:30}}>
      <Hdr title="Time &amp; PTO" sub="Timesheets and leave management"/>
      <TabBar tabs={[{id:"timesheet",label:"Timesheets"},{id:"pto",label:"PTO Requests"}]} active={tab} onChange={setTab}/>
      {tab==="timesheet"&&<><div style={{marginBottom:14}}><Btn onClick={()=>setShowTF(true)}>＋ Submit Timesheet</Btn></div>
        <Card style={{padding:0}}><Tbl cols={[{key:"empId",label:"Employee",render:r=><b style={{color:C.text}}>{nm(r.empId)}</b>},{key:"week",label:"Week"},["mon","tue","wed","thu","fri","sat"].map(d=>({key:d,label:d.charAt(0).toUpperCase()+d.slice(1),render:r=><span style={{color:r[d]>0?C.text:C.textSm}}>{r[d]}h</span>})),...[],{key:"ot",label:"OT",render:r=><span style={{color:r.ot>0?"#b91c1c":C.textSm,fontWeight:r.ot>0?700:400}}>{r.ot}h</span>},{key:"status",label:"Status",render:r=><Badge label={r.status}/>}].flat()} rows={vt}/></Card></>}
      {tab==="pto"&&<><div style={{marginBottom:14}}><Btn onClick={()=>setShowPF(true)}>＋ Request PTO</Btn></div>
        <Card style={{padding:0}}><Tbl cols={[{key:"empId",label:"Employee",render:r=><b style={{color:C.text}}>{nm(r.empId)}</b>},{key:"sd",label:"Start"},{key:"ed",label:"End"},{key:"hrs",label:"Hours",render:r=>`${r.hrs}h`},{key:"reason",label:"Reason"},{key:"status",label:"Status",render:r=><Badge label={r.status}/>},(isA||isM)?{key:"act",label:"",render:r=>r.status==="Pending"?<div style={{display:"flex",gap:6}}><Btn s="sm" onClick={()=>setPtoRequests(p=>p.map(x=>x.id===r.id?{...x,status:"Approved"}:x))}>✓ Approve</Btn><Btn s="sm" v="danger" onClick={()=>setPtoRequests(p=>p.map(x=>x.id===r.id?{...x,status:"Rejected"}:x))}>✗ Reject</Btn></div>:null}:{key:"noop",label:""}]} rows={vp}/></Card></>}
      {showTF&&<Modal title="Submit Timesheet" onClose={()=>setShowTF(false)}><Inp label="Week Of" type="date" value={tf.week} onChange={v=>setTF(f=>({...f,week:v}))}/><div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"0 12px"}}>{["mon","tue","wed","thu","fri","sat","sun"].map(d=><Inp key={d} label={d.charAt(0).toUpperCase()+d.slice(1)} type="number" value={tf[d]} onChange={v=>setTF(f=>({...f,[d]:v}))}/>)}</div><div style={{display:"flex",gap:9}}><Btn onClick={submitT}>Submit</Btn><Btn v="ghost" onClick={()=>setShowTF(false)}>Cancel</Btn></div></Modal>}
      {showPF&&<Modal title="Request PTO" onClose={()=>setShowPF(false)}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}><Inp label="Start" type="date" value={pf.sd} onChange={v=>setPF(f=>({...f,sd:v}))}/><Inp label="End" type="date" value={pf.ed} onChange={v=>setPF(f=>({...f,ed:v}))}/><Inp label="Hours" type="number" value={pf.hrs} onChange={v=>setPF(f=>({...f,hrs:v}))}/></div><Inp label="Reason" value={pf.reason} onChange={v=>setPF(f=>({...f,reason:v}))}/><div style={{display:"flex",gap:9}}><Btn onClick={submitP}>Submit</Btn><Btn v="ghost" onClick={()=>setShowPF(false)}>Cancel</Btn></div></Modal>}
    </div>
  );
}

// ── Payroll ────────────────────────────────────────────────────
function Payroll({employees,payrolls,currentRole,currentUserId}){
  const [freq,setFreq]=useState("All");
  const [search,setSearch]=useState("");
  const isA=currentRole==="HR Admin";
  const vis=useMemo(()=>{let r=isA?payrolls:payrolls.filter(x=>x.empId===currentUserId);if(freq!=="All")r=r.filter(x=>x.freq===freq);if(search)r=r.filter(x=>employees.find(e=>e.id===x.empId)?.name.toLowerCase().includes(search.toLowerCase()));return r.slice(0,100);},[payrolls,freq,search,isA,currentUserId]);
  const nm=id=>employees.find(e=>e.id===id)?.name||id;
  return(
    <div style={{padding:30}}>
      <Hdr title="Payroll" sub="Pay runs and earnings history"/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:20}}>
        {["Weekly","Bi-weekly","Semi-monthly","Monthly"].map(f=>{const fr=(isA?payrolls:payrolls.filter(r=>r.empId===currentUserId)).filter(r=>r.freq===f);return(<Card key={f} style={{cursor:"pointer",borderTop:`3px solid ${freq===f?C.red:C.border}`}} onClick={()=>setFreq(p=>p===f?"All":f)}><div style={{fontSize:10,color:C.textSm,textTransform:"uppercase",letterSpacing:".08em",fontWeight:700,marginBottom:4}}>{f}</div><div style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:800,color:C.text}}>{$(fr.reduce((s,r)=>s+r.gross,0))}</div><div style={{fontSize:11,color:C.textSm,marginTop:2}}>{fr.length} runs</div></Card>);})}
      </div>
      <div style={{display:"flex",gap:9,marginBottom:14,alignItems:"center"}}>
        {isA&&<input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search employee…" style={{background:C.surface,border:`1px solid ${C.border}`,color:C.text,padding:"8px 12px",borderRadius:8,fontSize:13,width:220,fontFamily:"'DM Sans',sans-serif",outline:"none"}}/>}
        <select value={freq} onChange={e=>setFreq(e.target.value)} style={{background:C.surface,border:`1px solid ${C.border}`,color:C.textMd,padding:"8px 11px",borderRadius:8,fontSize:13,fontFamily:"'DM Sans',sans-serif",outline:"none"}}><option>All</option><option>Weekly</option><option>Bi-weekly</option><option>Semi-monthly</option><option>Monthly</option></select>
        <span style={{marginLeft:"auto",fontSize:13,color:C.textSm}}>Total: <b style={{color:C.text}}>{$(vis.reduce((s,r)=>s+r.gross,0))}</b></span>
      </div>
      <Card style={{padding:0}}><Tbl cols={[isA?{key:"empId",label:"Employee",render:r=><b style={{color:C.text}}>{nm(r.empId)}</b>}:{key:"noop",label:""},{key:"freq",label:"Freq"},{key:"sd",label:"Start"},{key:"ed",label:"End"},{key:"regH",label:"Reg",render:r=>`${r.regH}h`},{key:"otH",label:"OT",render:r=><span style={{color:r.otH>0?"#b45309":C.textSm}}>{r.otH}h</span>},{key:"gross",label:"Gross",render:r=><b style={{color:C.text}}>{$(r.gross)}</b>},{key:"taxes",label:"Tax",render:r=><span style={{color:C.textSm}}>{$(r.taxes)}</span>},{key:"net",label:"Net",render:r=><b style={{color:"#15803d"}}>{$(r.net)}</b>},{key:"status",label:"Status",render:r=><Badge label={r.status}/>}]} rows={vis}/></Card>
    </div>
  );
}

// ── Benefits ───────────────────────────────────────────────────
function Benefits({employees,enrollments,setEnrollments,claims,setClaims,currentRole,currentUserId}){
  const [tab,setTab]=useState("enrollment");
  const [showC,setShowC]=useState(false);
  const [cf,setCF]=useState({empId:currentUserId,plan:"General Health Plan",date:"",amount:"",desc:""});
  const isA=currentRole==="HR Admin";
  const me=enrollments.find(e=>e.empId===currentUserId);
  const nm=id=>employees.find(e=>e.id===id)?.name||id;
  function toggle(plan){setEnrollments(p=>{const i=p.findIndex(e=>e.empId===currentUserId);if(i===-1)return[...p,{id:"en"+uid(),empId:currentUserId,plans:[plan]}];const pl=p[i].plans.includes(plan)?p[i].plans.filter(x=>x!==plan):[...p[i].plans,plan];return p.map((e,j)=>j===i?{...e,plans:pl}:e);});}
  return(
    <div style={{padding:30}}>
      <Hdr title="Benefits" sub="Enrollment and claims management"/>
      <TabBar tabs={[{id:"enrollment",label:"Enrollment"},{id:"claims",label:"Claims"}]} active={tab} onChange={setTab}/>
      {tab==="enrollment"&&<>
        {!isA&&<Card style={{marginBottom:16}}><div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:C.text,marginBottom:12}}>My Benefit Plans</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>{PLANS.map(plan=>{const on=me?.plans.includes(plan);return(<div key={plan} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 14px",background:on?C.redBg:C.bg,border:`1px solid ${on?C.redBd:C.border}`,borderRadius:10}}><div><div style={{fontSize:13,fontWeight:600,color:on?C.red:C.textMd}}>{plan}</div><div style={{fontSize:11,color:C.textSm,marginTop:1}}>{on?"Active":"Not enrolled"}</div></div><Btn s="sm" v={on?"ghost":"primary"} onClick={()=>toggle(plan)}>{on?"Unenroll":"Enroll"}</Btn></div>);})}</div></Card>}
        {isA&&<Card style={{padding:0}}><Tbl cols={[{key:"empId",label:"Employee",render:r=><b style={{color:C.text}}>{nm(r.empId)}</b>},...PLANS.map(p=>({key:p,label:p,render:r=><span style={{color:r.plans.includes(p)?"#15803d":C.border,fontSize:16,fontWeight:700}}>{r.plans.includes(p)?"●":"○"}</span>})),{key:"n",label:"Plans",render:r=><Badge label={r.plans.length} colors={["#6d28d9","#ede9fe"]}/>}]} rows={enrollments}/></Card>}
      </>}
      {tab==="claims"&&<><div style={{marginBottom:14}}><Btn onClick={()=>setShowC(true)}>＋ Submit Claim</Btn></div>
        <Card style={{padding:0}}><Tbl cols={[isA?{key:"empId",label:"Employee",render:r=><b style={{color:C.text}}>{nm(r.empId)}</b>}:{key:"noop",label:""},{key:"plan",label:"Plan"},{key:"date",label:"Date"},{key:"amount",label:"Amount",render:r=><b>{$(r.amount)}</b>},{key:"desc",label:"Description"},{key:"status",label:"Status",render:r=><Badge label={r.status}/>}]} rows={isA?claims:claims.filter(c=>c.empId===currentUserId)}/></Card></>}
      {showC&&<Modal title="Submit Benefits Claim" onClose={()=>setShowC(false)}><Inp label="Plan" value={cf.plan} onChange={v=>setCF(f=>({...f,plan:v}))} options={PLANS}/><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}><Inp label="Date" type="date" value={cf.date} onChange={v=>setCF(f=>({...f,date:v}))}/><Inp label="Amount ($)" type="number" value={cf.amount} onChange={v=>setCF(f=>({...f,amount:v}))}/></div><Inp label="Description" value={cf.desc} onChange={v=>setCF(f=>({...f,desc:v}))}/><div style={{display:"flex",gap:9}}><Btn onClick={()=>{setClaims(p=>[...p,{id:"cl"+uid(),...cf,amount:+cf.amount,status:"Pending"}]);setShowC(false);}}>Submit</Btn><Btn v="ghost" onClick={()=>setShowC(false)}>Cancel</Btn></div></Modal>}
    </div>
  );
}

// ── Reports ────────────────────────────────────────────────────
function Reports({employees,payrolls,ptoRequests,timeEntries,enrollments,claims}){
  const [rep,setRep]=useState("headcount-dept");
  const RPTS=[{g:"Workforce",items:[{id:"headcount-dept",l:"Headcount by Dept"},{id:"headcount-level",l:"Headcount by Level"},{id:"active-inactive",l:"Active vs Inactive"},{id:"span-control",l:"Span of Control"}]},{g:"Payroll",items:[{id:"payroll-summary",l:"Payroll Summary"},{id:"payroll-dept",l:"Payroll by Dept"}]},{g:"Time",items:[{id:"pto-balances",l:"PTO Balances"},{id:"overtime",l:"Overtime"}]},{g:"Benefits",items:[{id:"benefits-enroll",l:"Enrollment Summary"},{id:"benefits-claims",l:"Claims Summary"}]}];
  const label=RPTS.flatMap(g=>g.items).find(r=>r.id===rep)?.l||"";
  function render(){
    switch(rep){
      case "headcount-dept":  return <Tbl cols={[{key:"d",label:"Dept"},{key:"a",label:"Active",render:r=><b style={{color:C.text}}>{r.a}</b>},{key:"i",label:"Inactive"},{key:"t",label:"Total",render:r=><b style={{color:C.red}}>{r.t}</b>}]} rows={DEPTS.map(d=>({d,a:employees.filter(e=>e.dept===d&&e.status==="Active").length,i:employees.filter(e=>e.dept===d&&e.status==="Inactive").length,t:employees.filter(e=>e.dept===d).length}))}/>;
      case "headcount-level": return <Tbl cols={[{key:"l",label:"Level",render:r=><Badge label={r.l} colors={LC[r.l]}/>},{key:"c",label:"Count",render:r=><b style={{color:C.text}}>{r.c}</b>},{key:"e",label:"Exempt"},{key:"n",label:"Non-exempt"}]} rows={["C-Level","Director","Manager","Working"].map(l=>({l,c:employees.filter(e=>e.jobLevel===l&&e.status==="Active").length,e:employees.filter(e=>e.jobLevel===l&&e.type==="Exempt"&&e.status==="Active").length,n:employees.filter(e=>e.jobLevel===l&&e.type==="Non-exempt"&&e.status==="Active").length}))}/>;
      case "active-inactive": {const a=employees.filter(e=>e.status==="Active").length,i=employees.filter(e=>e.status==="Inactive").length;return <Tbl cols={[{key:"s",label:"Status",render:r=><Badge label={r.s}/>},{key:"c",label:"Count",render:r=><b style={{color:C.text}}>{r.c}</b>},{key:"p",label:"%"}]} rows={[{s:"Active",c:a,p:((a/employees.length)*100).toFixed(1)+"%"},{s:"Inactive",c:i,p:((i/employees.length)*100).toFixed(1)+"%"}]}/>}
      case "payroll-summary": return <Tbl cols={[{key:"f",label:"Frequency"},{key:"r",label:"Runs"},{key:"g",label:"Gross",render:r=><b style={{color:C.text}}>{$(r.g)}</b>},{key:"n",label:"Net",render:r=><b style={{color:"#15803d"}}>{$(r.n)}</b>}]} rows={["Weekly","Bi-weekly","Semi-monthly","Monthly"].map(f=>({f,r:payrolls.filter(p=>p.freq===f).length,g:payrolls.filter(p=>p.freq===f).reduce((s,p)=>s+p.gross,0),n:payrolls.filter(p=>p.freq===f).reduce((s,p)=>s+p.net,0)}))}/>;
      case "payroll-dept":    return <Tbl cols={[{key:"d",label:"Dept"},{key:"e",label:"Employees"},{key:"g",label:"Total Gross",render:r=><b style={{color:C.text}}>{$(r.g)}</b>}]} rows={DEPTS.map(d=>{const ids=new Set(employees.filter(e=>e.dept===d).map(e=>e.id));return{d,e:employees.filter(e=>e.dept===d).length,g:payrolls.filter(p=>ids.has(p.empId)).reduce((s,p)=>s+p.gross,0)};})}/>;
      case "span-control":    return <Tbl cols={[{key:"n",label:"Manager"},{key:"l",label:"Level",render:r=><Badge label={r.l} colors={LC[r.l]}/>},{key:"d",label:"Dept"},{key:"r",label:"Direct Reports",render:r=><b style={{color:C.text}}>{r.r}</b>}]} rows={employees.filter(e=>["C-Level","Director","Manager"].includes(e.jobLevel)&&e.status==="Active").map(e=>({n:e.name,l:e.jobLevel,d:e.dept,r:employees.filter(x=>x.managerId===e.id&&x.status==="Active").length})).sort((a,b)=>b.r-a.r)}/>;
      case "pto-balances":    return <Tbl cols={[{key:"n",label:"Employee"},{key:"d",label:"Dept"},{key:"a",label:"Approved",render:r=><span style={{color:"#15803d",fontWeight:600}}>{r.a}h</span>},{key:"p",label:"Pending",render:r=><span style={{color:"#b45309",fontWeight:600}}>{r.p}h</span>}]} rows={employees.filter(e=>e.status==="Active").map(e=>({n:e.name,d:e.dept,a:ptoRequests.filter(p=>p.empId===e.id&&p.status==="Approved").reduce((s,p)=>s+p.hrs,0),p:ptoRequests.filter(p=>p.empId===e.id&&p.status==="Pending").reduce((s,p)=>s+p.hrs,0)})).filter(r=>r.a+r.p>0)}/>;
      case "overtime":        return <Tbl cols={[{key:"n",label:"Employee"},{key:"w",label:"Week"},{key:"o",label:"OT Hrs",render:r=><b style={{color:"#b91c1c"}}>{r.o}h</b>},{key:"p",label:"OT Pay"}]} rows={timeEntries.filter(t=>t.ot>0).map(t=>{const e=employees.find(x=>x.id===t.empId);return{n:e?.name||t.empId,w:t.week,o:t.ot,p:e?$(e.hourly*1.5*t.ot):"—"}})}/>;
      case "benefits-enroll": return <Tbl cols={[{key:"p",label:"Plan"},{key:"e",label:"Enrolled",render:r=><b style={{color:C.text}}>{r.e}</b>},{key:"n",label:"Not Enrolled"}]} rows={PLANS.map(p=>({p,e:enrollments.filter(e=>e.plans.includes(p)).length,n:employees.filter(e=>e.status==="Active").length-enrollments.filter(e=>e.plans.includes(p)).length}))}/>;
      case "benefits-claims": return <Tbl cols={[{key:"p",label:"Plan"},{key:"c",label:"Claims"},{key:"a",label:"Approved"},{key:"t",label:"Total",render:r=><b style={{color:C.text}}>{$(r.t)}</b>}]} rows={PLANS.map(p=>({p,c:claims.filter(c=>c.plan===p).length,a:claims.filter(c=>c.plan===p&&c.status==="Approved").length,t:claims.filter(c=>c.plan===p).reduce((s,c)=>s+c.amount,0)}))}/>;
      default: return null;
    }
  }
  return(
    <div style={{padding:30}}>
      <Hdr title="Reports" sub="Analytics and workforce insights"/>
      <div style={{display:"flex",gap:18}}>
        <div style={{width:200,flexShrink:0}}>
          <Card style={{padding:"6px 0"}}>
            {RPTS.map(g=><div key={g.g}><div style={{padding:"9px 15px 3px",fontSize:9,fontWeight:700,color:C.textSm,textTransform:"uppercase",letterSpacing:".1em"}}>{g.g}</div>{g.items.map(r=><button key={r.id} onClick={()=>setRep(r.id)} style={{display:"block",width:"100%",textAlign:"left",padding:"7px 15px",border:"none",background:rep===r.id?C.redBg:"transparent",color:rep===r.id?C.red:C.textMd,cursor:"pointer",fontSize:12,fontFamily:"'DM Sans',sans-serif",fontWeight:rep===r.id?600:400,borderLeft:rep===r.id?`2px solid ${C.red}`:"2px solid transparent",transition:"all .12s"}}>{r.l}</button>)}</div>)}
          </Card>
        </div>
        <div style={{flex:1}}>
          <Card style={{padding:0,overflow:"hidden"}}>
            <div style={{padding:"12px 18px",borderBottom:`1px solid ${C.border}`,background:C.bg}}><div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:C.text}}>{label}</div></div>
            {render()}
          </Card>
        </div>
      </div>
    </div>
  );
}

// ── Admin ──────────────────────────────────────────────────────
function Admin({employees,setEmployees,branches,setBranches,payrolls,currentRole}){
  const [sec,setSec]=useState("branches");
  const [bm,setBM]=useState(null);
  const [bf,setBF]=useState({name:"",parentId:""});
  const [rm,setRM]=useState(null);
  const [rf,setRF]=useState({empId:"",managerId:""});
  if(currentRole!=="HR Admin")return <div style={{padding:30,color:C.textSm}}>Access restricted to HR Administrators.</div>;
  const com=payrolls.filter(p=>p.status==="Committed").length,pen=payrolls.filter(p=>p.status==="Pending").length;
  function saveBr(){if(!bf.name)return;if(bm==="create")setBranches(p=>[...p,{id:"b"+uid(),name:bf.name,parentId:bf.parentId||null}]);else setBranches(p=>p.map(b=>b.id===bm?{...b,...bf}:b));setBM(null);}
  function delBr(id){if(employees.some(e=>e.branch===id)){alert("Branch has employees.");return;}setBranches(p=>p.filter(b=>b.id!==id));}
  function saveRel(){if(!rf.empId)return;let c=rf.managerId;for(let i=0;i<10;i++){if(!c)break;const e=employees.find(x=>x.id===c);if(!e)break;if(e.managerId===rf.empId){alert("Circular hierarchy!");return;}c=e.managerId;}setEmployees(p=>p.map(e=>e.id===rf.empId?{...e,managerId:rf.managerId||null}:e));setRM(null);}
  const SECS=[{id:"branches",l:"Branch Hierarchy"},{id:"relations",l:"Manager Relationships"},{id:"payroll",l:"Payroll Commit"}];
  return(
    <div style={{padding:30}}>
      <Hdr title="Admin" sub="Governance and system configuration"/>
      <div style={{display:"flex",gap:18}}>
        <div style={{width:195,flexShrink:0}}><Card style={{padding:"6px 0"}}>{SECS.map(s=><button key={s.id} onClick={()=>setSec(s.id)} style={{display:"block",width:"100%",textAlign:"left",padding:"10px 15px",border:"none",background:sec===s.id?C.redBg:"transparent",color:sec===s.id?C.red:C.textMd,cursor:"pointer",fontSize:13,fontFamily:"'DM Sans',sans-serif",fontWeight:sec===s.id?600:400,borderLeft:sec===s.id?`2px solid ${C.red}`:"2px solid transparent",transition:"all .12s"}}>{s.l}</button>)}</Card></div>
        <div style={{flex:1}}>
          {sec==="branches"&&<Card><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}><div style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700,color:C.text}}>Branch Hierarchy</div><Btn s="sm" onClick={()=>{setBF({name:"",parentId:""});setBM("create");}}>＋ New Branch</Btn></div>{branches.map(b=><div key={b.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 13px",background:C.bg,borderRadius:8,marginBottom:7,border:`1px solid ${C.border}`,borderLeft:`3px solid ${b.parentId?C.border:C.red}`}}><div><div style={{fontSize:13,fontWeight:500,color:C.text,paddingLeft:b.parentId?12:0}}>{b.parentId?"↳ ":""}{b.name}</div><div style={{fontSize:11,color:C.textSm,marginTop:1}}>{b.parentId?`Parent: ${branches.find(x=>x.id===b.parentId)?.name||"—"}`:"Root"} · {employees.filter(e=>e.branch===b.id).length} employees</div></div><div style={{display:"flex",gap:6}}><Btn s="sm" v="ghost" onClick={()=>{setBF({name:b.name,parentId:b.parentId||""});setBM(b.id);}}>Edit</Btn><Btn s="sm" v="danger" onClick={()=>delBr(b.id)}>Delete</Btn></div></div>)}</Card>}
          {sec==="relations"&&<Card><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}><div style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700,color:C.text}}>Manager–Employee Relationships</div><Btn s="sm" onClick={()=>{setRF({empId:"",managerId:""});setRM("create");}}>＋ Assign</Btn></div><Tbl cols={[{key:"name",label:"Employee",render:e=><div style={{display:"flex",alignItems:"center",gap:8}}><Av name={e.name} size={25}/><b style={{color:C.text}}>{e.name}</b></div>},{key:"jl",label:"Level",render:e=><Badge label={e.jobLevel} colors={LC[e.jobLevel]}/>},{key:"mgr",label:"Reports To",render:e=><span style={{color:C.textMd}}>{employees.find(m=>m.id===e.managerId)?.name||<i style={{color:C.textSm}}>No manager</i>}</span>},{key:"act",label:"",render:e=><Btn s="sm" v="ghost" onClick={()=>{setRF({empId:e.id,managerId:e.managerId||""});setRM("edit");}}>Change</Btn>}]} rows={employees.filter(e=>e.status==="Active")}/></Card>}
          {sec==="payroll"&&<Card><div style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700,color:C.text,marginBottom:18}}>Payroll Commit Control</div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:18}}><div style={{background:"#dcfce7",border:"1px solid #bbf7d0",borderRadius:10,padding:14}}><div style={{fontSize:9,color:"#166534",textTransform:"uppercase",letterSpacing:".08em",fontWeight:700,marginBottom:4}}>Committed</div><div style={{fontFamily:"'Syne',sans-serif",fontSize:26,fontWeight:800,color:"#15803d"}}>{com}</div><div style={{fontSize:12,color:"#166534",marginTop:2}}>finalized</div></div><div style={{background:"#fef3c7",border:"1px solid #fde68a",borderRadius:10,padding:14}}><div style={{fontSize:9,color:"#92400e",textTransform:"uppercase",letterSpacing:".08em",fontWeight:700,marginBottom:4}}>Pending</div><div style={{fontFamily:"'Syne',sans-serif",fontSize:26,fontWeight:800,color:"#b45309"}}>{pen}</div><div style={{fontSize:12,color:"#92400e",marginTop:2}}>awaiting</div></div></div><div style={{padding:12,background:"#fff7ed",border:"1px solid #fed7aa",borderRadius:8,marginBottom:14,fontSize:13,color:"#92400e",lineHeight:1.6}}>⚠️ Committing payroll is permanent and locks pay runs.</div>{["Weekly","Bi-weekly","Semi-monthly","Monthly"].map(f=>{const p=payrolls.filter(x=>x.freq===f&&x.status==="Pending").length;return(<div key={f} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 14px",background:C.bg,borderRadius:8,marginBottom:7,border:`1px solid ${C.border}`}}><div><div style={{fontSize:13,fontWeight:500,color:C.text}}>{f}</div><div style={{fontSize:11,color:C.textSm,marginTop:1}}>{p} pending</div></div><Btn s="sm" disabled={p===0}>Commit {f}</Btn></div>);})}</Card>}
        </div>
      </div>
      {bm&&<Modal title={bm==="create"?"New Branch":"Edit Branch"} onClose={()=>setBM(null)}><Inp label="Branch Name" value={bf.name} onChange={v=>setBF(f=>({...f,name:v}))} required/><div style={{marginBottom:14}}><label style={{display:"block",fontSize:11,color:C.textSm,letterSpacing:".06em",textTransform:"uppercase",marginBottom:4,fontWeight:600}}>Parent Branch</label><select value={bf.parentId} onChange={e=>setBF(f=>({...f,parentId:e.target.value}))} style={{background:C.bg,border:`1px solid ${C.border}`,color:C.text,padding:"8px 11px",borderRadius:8,fontSize:13,width:"100%",fontFamily:"'DM Sans',sans-serif",outline:"none"}}><option value="">None (Root)</option>{branches.filter(b=>b.id!==bm).map(b=><option key={b.id} value={b.id}>{b.name}</option>)}</select></div><div style={{display:"flex",gap:9}}><Btn onClick={saveBr}>{bm==="create"?"Create":"Save"}</Btn><Btn v="ghost" onClick={()=>setBM(null)}>Cancel</Btn></div></Modal>}
      {rm&&<Modal title="Manager–Employee Relationship" onClose={()=>setRM(null)}><div style={{marginBottom:14}}><label style={{display:"block",fontSize:11,color:C.textSm,letterSpacing:".06em",textTransform:"uppercase",marginBottom:4,fontWeight:600}}>Employee</label><select value={rf.empId} onChange={e=>setRF(f=>({...f,empId:e.target.value}))} style={{background:C.bg,border:`1px solid ${C.border}`,color:C.text,padding:"8px 11px",borderRadius:8,fontSize:13,width:"100%",fontFamily:"'DM Sans',sans-serif",outline:"none"}}><option value="">— Select —</option>{employees.filter(e=>e.status==="Active").map(e=><option key={e.id} value={e.id}>{e.name} ({e.title})</option>)}</select></div><div style={{marginBottom:14}}><label style={{display:"block",fontSize:11,color:C.textSm,letterSpacing:".06em",textTransform:"uppercase",marginBottom:4,fontWeight:600}}>Reports To</label><select value={rf.managerId} onChange={e=>setRF(f=>({...f,managerId:e.target.value}))} style={{background:C.bg,border:`1px solid ${C.border}`,color:C.text,padding:"8px 11px",borderRadius:8,fontSize:13,width:"100%",fontFamily:"'DM Sans',sans-serif",outline:"none"}}><option value="">None (Top Executive)</option>{employees.filter(e=>e.status==="Active"&&e.id!==rf.empId).map(e=><option key={e.id} value={e.id}>{e.name} — {e.title}</option>)}</select></div><div style={{display:"flex",gap:9}}><Btn onClick={saveRel}>Save</Btn><Btn v="ghost" onClick={()=>setRM(null)}>Cancel</Btn></div></Modal>}
    </div>
  );
}

// ── Root App ───────────────────────────────────────────────────
export default function App(){
  const [page,setPage]=useState("dashboard");
  const [role,setRole]=useState("HR Admin");
  const [uid2,setUid2]=useState("e4");
  const [employees,setEmployees]=useState(EMPS);
  const [branches,setBranches]=useState(BRANCHES);
  const [payrolls]=useState(()=>buildPayrolls(EMPS));
  const [ptoReqs,setPtoReqs]=useState(INIT_PTO);
  const [timeEnt,setTimeEnt]=useState(INIT_TIME);
  const [enrollments,setEnrollments]=useState(INIT_ENROLL);
  const [claims,setClaims]=useState(INIT_CLAIMS);
  const me=employees.find(e=>e.id===uid2);
  const sh={employees,setEmployees,branches,setBranches,payrolls,ptoRequests:ptoReqs,setPtoRequests:setPtoReqs,timeEntries:timeEnt,setTimeEntries:setTimeEnt,enrollments,setEnrollments,claims,setClaims,currentRole:role,currentUserId:uid2};
  const NAV=[{id:"dashboard",ic:"⊞",l:"Dashboard"},{id:"employees",ic:"⚉",l:"Employees"},{id:"time",ic:"◷",l:"Time & PTO"},{id:"payroll",ic:"◈",l:"Payroll"},{id:"benefits",ic:"♡",l:"Benefits"},{id:"reports",ic:"≡",l:"Reports"},{id:"admin",ic:"⚙",l:"Admin",adm:true}];
  return(
    <div style={{display:"flex",height:"100vh",fontFamily:"'DM Sans',sans-serif",background:C.bg,color:C.text,overflow:"hidden"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=Syne:wght@700;800&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:5px;height:5px}::-webkit-scrollbar-track{background:#f0f0f5}::-webkit-scrollbar-thumb{background:#d0d0dc;border-radius:4px}input:focus,select:focus{border-color:#cc0015!important;box-shadow:0 0 0 3px rgba(204,0,21,.08)!important;outline:none!important}button:focus{outline:none}`}</style>
      {/* Sidebar */}
      <aside style={{width:224,background:C.surface,borderRight:`1px solid ${C.border}`,display:"flex",flexDirection:"column",flexShrink:0}}>
        <div style={{padding:"20px 18px 14px",borderBottom:`1px solid ${C.border}`}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:26,fontWeight:800,color:C.red,letterSpacing:"-.04em",lineHeight:1}}>H&M</div>
          <div style={{fontSize:9,color:C.textSm,letterSpacing:".18em",textTransform:"uppercase",marginTop:3}}>People Platform</div>
        </div>
        <div style={{padding:"11px 13px 4px"}}>
          <div style={{fontSize:9,color:C.textSm,letterSpacing:".1em",textTransform:"uppercase",marginBottom:4,fontWeight:700}}>Viewing As</div>
          <select value={role} onChange={e=>{const r=e.target.value;setRole(r);setUid2(r==="HR Admin"?"e4":r==="Manager"?"e12":"e23");}} style={{width:"100%",background:C.bg,border:`1px solid ${C.border}`,color:C.text,padding:"7px 10px",borderRadius:7,fontSize:12,fontFamily:"'DM Sans',sans-serif",cursor:"pointer",outline:"none"}}>
            <option>HR Admin</option><option>Manager</option><option>Employee</option>
          </select>
        </div>
        <nav style={{flex:1,padding:"5px 9px",overflowY:"auto"}}>
          {NAV.filter(n=>!n.adm||role==="HR Admin").map(n=>{const a=page===n.id;return(<button key={n.id} onClick={()=>setPage(n.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:9,padding:"9px 11px",borderRadius:8,border:"none",cursor:"pointer",marginBottom:1,textAlign:"left",background:a?C.redBg:"transparent",color:a?C.red:C.textMd,fontFamily:"'DM Sans',sans-serif",fontSize:13,fontWeight:a?600:400,transition:"all .12s"}}><span style={{fontSize:14,opacity:a?1:.65}}>{n.ic}</span>{n.l}{a&&<div style={{marginLeft:"auto",width:5,height:5,borderRadius:"50%",background:C.red}}/>}</button>);})}
        </nav>
        {me&&<div style={{padding:"12px 13px",borderTop:`1px solid ${C.border}`}}><div style={{display:"flex",alignItems:"center",gap:9}}><Av name={me.name} size={32}/><div style={{minWidth:0}}><div style={{fontSize:12,fontWeight:600,color:C.text,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{me.name}</div><div style={{fontSize:10,color:C.textSm,marginTop:1,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{role}</div></div></div></div>}
      </aside>
      {/* Main */}
      <main style={{flex:1,overflowY:"auto"}}>
        {page==="dashboard"&&<Dashboard {...sh}/>}
        {page==="employees"&&<Employees {...sh}/>}
        {page==="time"&&<TimePTO {...sh}/>}
        {page==="payroll"&&<Payroll {...sh}/>}
        {page==="benefits"&&<Benefits {...sh}/>}
        {page==="reports"&&<Reports {...sh}/>}
        {page==="admin"&&<Admin {...sh}/>}
      </main>
    </div>
  );
}
