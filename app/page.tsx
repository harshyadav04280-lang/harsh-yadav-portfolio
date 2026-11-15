 "use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUpRight, ArrowLeft, ArrowRight, X, Play, Plus, MoveUpRight, Menu, Instagram, Linkedin, Mail, Volume2, Sparkles } from "lucide-react";

const videoProjects: { n: string; name: string; client: string; kind: string; tone: string; desc: string; youtubeId?: string }[] = [
  {n:"01",name:"Campaign Films",client:"HDFC BANK / BRAND CAMPAIGNS",kind:"AI FILM · EDIT · STORY",tone:"orange",desc:"Campaign-led visual storytelling, built around a strong hook, clear pacing and a memorable final frame."},
  {n:"02",name:"AI Visual Worlds",client:"GENERATIVE VIDEO / VFX",kind:"AI PRODUCTION · COMPOSITING",tone:"purple",desc:"Exploring the edge of AI video production, image-to-video workflows, art direction and post-production."},
  {n:"03",name:"Motion Language",client:"MOTION DESIGN / AFTER EFFECTS",kind:"2D MOTION · TYPE · DESIGN",tone:"blue",desc:"Kinetic typography, transitions and graphic systems that give a story its own visual rhythm."},
  {n:"04",name:"Social First",client:"PHONEPE / ZOMATO / SOCIAL",kind:"SHORT-FORM · EDITING",tone:"lime",desc:"Platform-native edits designed to stop the scroll while keeping the brand voice intact."},
  {n:"05",name:"Culture & Sport",client:"MUMBAI INDIANS / ENTERTAINMENT",kind:"PROMO · HIGHLIGHTS · EDIT",tone:"red",desc:"Fast-moving entertainment and sports-led visuals shaped for energy, emotion and impact."}
];
const portfolioVideos: { file: string; title: string; category: string; priority: string; youtubeId?: string; extraCategories?: string[]; tags?: string[]; desc?: string }[] = [
  { file: "BFL_Delhi_Monsoon_Horizontal (3).mp4", title: "Delhi Monsoon", youtubeId: "Pm7zyz15HVU", category: "AI Commercial Ads", priority: "Featured" },
  { file: "BFL_Mumbai_4.mp4", title: "BFL Mumbai", youtubeId: "nQgvHOZ5Av8", category: "AI Commercial Ads", priority: "Featured" },
  { file: "BFL_kerala_D38 (1).mp4", title: "BFL Kerala", youtubeId: "VFVuX31-GQ0", category: "AI Commercial Ads", priority: "Secondary" },
  { file: "BGI_Cyber_9x16_v1.mp4", title: "BGI Cyber", youtubeId: "Agctuamx_hs", extraCategories: ["AI Motion Graphics"], category: "AI Reels & Social", priority: "Secondary" },
  { file: "Color_Reveal_16x9_V2.mp4", title: "Color Reveal", youtubeId: "LIZVTeq-UGk", category: "AI Commercial Ads", priority: "Secondary" },
  { file: "Duty_Free_Sample.mp4", title: "Duty Free", youtubeId: "rnxirJRp5WQ", extraCategories: ["AI Reels & Social", "AI Avatar", "AI Video Editing & VFX"], category: "AI Commercial Ads", priority: "Secondary" },
  { file: "Goldiee_Sprinkoo_TVC_1 (3) (2).mp4", youtubeId: "YY1zM_rH12o", title: "Goldiee Sprinkoo TVC", category: "AI Commercial Ads", priority: "Featured" },
  { file: "Havells_Sample.mp4", youtubeId: "R2omHqI_Qmw", title: "Havells", extraCategories: ["AI Reels & Social", "AI Avatar", "AI Video Editing & VFX"], category: "AI Commercial Ads", priority: "Secondary" },
  { file: "JioHotstar_BiggBoss_Sample.mp4", youtubeId: "ljDnpdFhNtY", title: "JioHotstar Bigg Boss", extraCategories: ["AI Reels & Social", "AI Video Editing & VFX", "AI Avatar"], tags: ["AVATAR", "VFX", "LIP-SYNC"], desc: "AI commercial with avatar generation, visual effects and lip-sync work.", category: "AI Commercial Ads", priority: "Featured" },
  { file: "Kenstar_Sample.mp4", youtubeId: "VmFhPwZzpo4", title: "Kenstar", category: "AI Commercial Ads", priority: "Secondary" },
  { file: "Kolkata_Monsoon_BFL_D8.mp4", youtubeId: "TaiOWadaMkw", title: "Kolkata Monsoon", category: "AI Commercial Ads", priority: "Featured" },
  { file: "MI_Hardik_Pandiya_Creative_Sample.mp4", youtubeId: "HlZNrb0hmcQ", title: "MI · Hardik Pandya", extraCategories: ["AI Reels & Social", "AI Avatar", "AI Video Editing & VFX"], category: "AI Commercial Ads", priority: "Featured" },
  { file: "Pine_Labs_Sample_3.mp4", youtubeId: "zWlxdlX1Mvg", title: "Pine Labs", extraCategories: ["AI Reels & Social", "AI Motion Graphics", "AI Avatar"], category: "AI Commercial Ads", priority: "Secondary" },
  { file: "Revised_MF26_Agricultural_3Stocks_02_09.mp4", youtubeId: "5hyYCIn1WUI", title: "Agricultural Stocks", extraCategories: ["AI Reels & Social", "AI Avatar"], category: "AI Motion Graphics", priority: "Secondary" },
  { file: "Revised_MF27_HDFCDefence_Sold_03_09.mp4", youtubeId: "jyT5Qv9uZVI", title: "HDFC Defence", extraCategories: ["AI Reels & Social", "AI Avatar"], category: "AI Motion Graphics", priority: "Secondary" },
  { file: "Revised_MF29_UTILargeCap_CapitalGoods_02_08.mp4", youtubeId: "K0aDkHfxSiI", title: "Large Cap · Capital Goods", extraCategories: ["AI Reels & Social", "AI Avatar"], category: "AI Motion Graphics", priority: "Secondary" },
  { file: "SBI_Retire_Smart_Plus_30-01-26.mp4", youtubeId: "vysZZia_eIs", title: "SBI Retire Smart Plus", extraCategories: ["AI Reels & Social", "AI Avatar", "AI Video Editing & VFX"], category: "AI Commercial Ads", priority: "Featured" },
  { file: "SLIC_LifeStageShield_English_6.mp4", youtubeId: "jVlfXKKgCXI", title: "LifeStage Shield", extraCategories: ["AI Video Editing & VFX"], category: "AI Commercial Ads", priority: "Featured" },
  { file: "Savvyy_render.mp4", youtubeId: "hej9uJ_cWGo", title: "Savvyy", desc: "AI-generated commercial film with a polished edit.", category: "AI Commercial Ads", priority: "Secondary" },
  { file: "Sprinkoo_TVC_2_24fps-001 (1).mov", youtubeId: "yZyVMAfui9o", title: "Sprinkoo TVC · Film", category: "AI Commercial Ads", priority: "Featured" },
  { file: "VIVO_Appearance_16x9_4k.mp4", youtubeId: "m44BddqfCQ0", title: "Vivo Appearance", category: "AI Commercial Ads", priority: "Featured" },
  { file: "Vivo_S2_10Secs_1.mp4", youtubeId: "rHQ-VSNCz7o", title: "Vivo S2 · 10 sec", category: "AI Commercial Ads", priority: "Featured" },
  { file: "krishna sample1.4.mp4", youtubeId: "-2Uldw372uY", title: "Krishna", extraCategories: ["AI Reels & Social"], category: "AI Video Editing & VFX", priority: "Secondary" },
  { file: "retail.mp4", youtubeId: "LQKRp4Qm4hA", title: "Retail", extraCategories: ["AI Motion Graphics"], category: "AI Commercial Ads", priority: "Secondary" },
];
const aiCategories = ["All AI Videos", "AI Commercial Ads", "AI Motion Graphics", "AI Reels & Social", "AI Avatar", "AI Video Editing & VFX"] as const;
const designProjects = portfolioVideos
  .filter(v=>v.category==="AI Reels & Social"||v.extraCategories?.includes("AI Reels & Social"))
  .map((v,i)=>({n:String(i+1).padStart(2,"0"),name:v.title,client:v.category.toUpperCase(),kind:"AI REEL · SOCIAL",tone:"purple",youtubeId:v.youtubeId,category:"Reels & Social",desc:v.desc||"Short-form video selected for social and reel formats."}));
const tools = ["Premiere Pro","After Effects","Photoshop","AI Video Workflows","VFX & Compositing","Motion Design","Runway","Firefly","Higgsfield","Pika"];
const brands = ["HDFC BANK","PHONEPE","ZOMATO","MUMBAI INDIANS","JioHotstar","BIGG BOSS","SAVVY"];
const timeline = [
  {year:"2026 — NOW",role:"Team Lead · AI Video Production",place:"TrueFan AI",copy:"Leading creative execution across AI-powered video production and branded visual content."},
  {year:"2025 — 2026",role:"AI Video Editor",place:"TrueFan AI",copy:"Produced AI-led video content for brands and creators, combining emerging tools with post-production craft."},
  {year:"BEFORE",role:"Video Editor · Motion Designer",place:"Creative & Brand Projects",copy:"Built a multidisciplinary foundation across editing, motion graphics, visual design and VFX."}
];

function Visual({tone, index}:{tone:string,index:number}) {
  return <div className={`visual ${tone}`}>
    <div className="visual-noise"/>
    <span className="visual-index">HY / 0{index+1}</span>
    {tone==="orange" && <><div className="v-orbit"/><div className="v-word">MAKE<br/><i>IMPACT.</i></div><div className="v-sphere"/></>}
    {tone==="purple" && <><div className="v-grid"/><div className="v-cube"><i/><i/><i/></div><div className="v-word small">REALITY<br/>IS A<br/><i>CHOICE.</i></div></>}
    {tone==="blue" && <><div className="v-type">MOVE<br/><em>WITH</em><br/>INTENT</div><div className="v-ellipse"/></>}
    {tone==="lime" && <><div className="v-disc"/><div className="v-word dark">CUT<br/>THROUGH.</div><div className="v-stripe"/></>}
    {tone==="red" && <><div className="v-red-ring"/><div className="v-word">FEEL<br/><i>THE</i><br/>FRAME.</div><div className="v-red-dot"/></>}
    <span className="visual-caption">CONCEPT PREVIEW · REPLACE WITH PROJECT MEDIA</span>
  </div>
}

export default function Home(){
  const [category,setCategory]=useState<"video"|"design">("design");
  const [aiFilter,setAiFilter]=useState<(typeof aiCategories)[number]>("All AI Videos");
  const [featuredIndex,setFeaturedIndex]=useState(0);
  const [active,setActive]=useState<any>(null);
  const [rotation,setRotation]=useState(0);
  const [dragStart,setDragStart]=useState<number|null>(null);
  const reelDrag=useRef<{x:number;scrollLeft:number}|null>(null);
  const reelMoved=useRef(false);
  const [menu,setMenu]=useState(false);
  const [folder,setFolder]=useState<string|null>(null);
  const [time,setTime]=useState("--:--");
  const [desk,setDesk]=useState("Select an object on the desk");
  const carouselRef=useRef<HTMLDivElement>(null);
  const items=category==="video"?videoProjects:designProjects;
  const featuredVideos=portfolioVideos.filter(v=>v.priority==="Featured");
  const featuredVideo=featuredVideos[featuredIndex%featuredVideos.length];
  const filteredVideos=portfolioVideos.filter(v=>aiFilter==="All AI Videos"||v.category===aiFilter||v.extraCategories?.includes(aiFilter));

  useEffect(()=>{const tick=()=>setTime(new Intl.DateTimeFormat("en-IN",{timeZone:"Asia/Kolkata",hour:"2-digit",minute:"2-digit",hour12:false}).format(new Date()));tick();const t=setInterval(tick,30000);return()=>clearInterval(t)},[]);
  useEffect(()=>{setRotation(0)},[category]);

  const move=(dir:number)=>setRotation(r=>r+dir*(360/items.length));
  const onPointerDown=(e:React.PointerEvent<HTMLDivElement>)=>{if(category==="design"){reelDrag.current={x:e.clientX,scrollLeft:e.currentTarget.scrollLeft};reelMoved.current=false;e.currentTarget.setPointerCapture(e.pointerId);return}setDragStart(e.clientX)};
  const onPointerMove=(e:React.PointerEvent<HTMLDivElement>)=>{if(category==="design"&&reelDrag.current){const delta=e.clientX-reelDrag.current.x;if(Math.abs(delta)>5)reelMoved.current=true;e.currentTarget.scrollLeft=reelDrag.current.scrollLeft-delta}};
  const onPointerUp=(e:React.PointerEvent<HTMLDivElement>)=>{if(category==="design"){reelDrag.current=null;return}if(dragStart!==null){const delta=e.clientX-dragStart;if(Math.abs(delta)>25)setRotation(r=>r+delta*.45);setDragStart(null)}};
  const activeIndex=((Math.round(-rotation/(360/items.length))%items.length)+items.length)%items.length;

  return <main>
    <div className="grain-global"/>
    <header className="topbar">
      <a className="signature" href="#home"><span className="sig-icon">HY.</span><span>HARSH YADAV<small>INDEPENDENT CREATIVE</small></span></a>
      <div className="top-status"><i/> OPEN TO THE RIGHT PROJECTS <span>·</span> INDIA {time}</div>
      <button className="menu-btn" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button>
      <nav className={menu?"nav-open":""}><a href="#ai-videos" onClick={()=>setMenu(false)}>AI VIDEOS <sup>24</sup></a><a href="#work" onClick={()=>setMenu(false)}>WORK <sup>01</sup></a><a href="#archive" onClick={()=>setMenu(false)}>ARCHIVE <sup>02</sup></a><a href="#about" onClick={()=>setMenu(false)}>ABOUT <sup>03</sup></a><a href="#contact" onClick={()=>setMenu(false)}>CONTACT <sup>04</sup></a></nav>
    </header>

    <section className="hero" id="home">
      <div className="hero-topline"><span>CREATIVE GENERALIST / AI-DRIVEN VISUALS</span><span>GURUGRAM, INDIA ↗</span></div>
      <div className="hero-main">
        <motion.div className="hero-copy" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8}}>
          <div className="eyebrow"><span className="green-dot"/> VISUAL STORYTELLER · 5 YEARS IN THE FRAME</div>
          <h1>IDEAS INTO<br/><span className="stroke">IMAGES.</span><br/><em>IMPACT.</em></h1>
          <div className="hero-bottom-copy"><p>I’m Harsh — an all-round creative working across <b>video, motion, AI, VFX and visual design.</b> I turn ambitious ideas into visuals people remember.</p><a href="#work" className="round-arrow"><ArrowDown/></a></div>
        </motion.div>
        <motion.div className="hero-art" initial={{opacity:0,scale:.92,rotate:3}} animate={{opacity:1,scale:1,rotate:0}} transition={{duration:1,delay:.2}}>
          <div className="art-label label-a">CREATIVE<br/>ENGINE / 001</div><div className="art-label label-b">EDIT · DESIGN<br/>GENERATE · REPEAT</div>
          <div className="hero-portal"><div className="portal-inner"><span>HY</span></div></div>
          <div className="app-float app-premiere"><b>Pr</b><span>Premiere Pro</span></div><div className="app-float app-aftereffects"><b>Ae</b><span>After Effects</span></div><div className="app-float app-photoshop"><b>Ps</b><span>Photoshop</span></div><div className="app-float app-claude"><b>✳</b><span>Claude</span></div><div className="app-float app-higgsfield"><b>H</b><span>Higgsfield</span></div><div className="app-float app-chatgpt"><b>◎</b><span>ChatGPT</span></div>
          <div className="hero-cross">✳</div><div className="hero-sideword">MAKE IT MATTER</div>
        </motion.div>
      </div>
      <div className="hero-footer"><span>SCROLL TO EXPLORE ↓</span><span>FROM FIRST THOUGHT TO FINAL FRAME</span><span>© 2026</span></div>
    </section>

    <section className="ticker"><div className="ticker-track">{Array.from({length:4}).map((_,i)=><span key={i}>VIDEO EDITING <b>✳</b> AI PRODUCTION <b>✳</b> MOTION DESIGN <b>✳</b> VISUAL STORYTELLING <b>✳</b> VFX <b>✳</b></span>)}</div></section>

    <section className="work section" id="work">
      <div className="section-intro"><div><span className="eyebrow">01 / SELECTED WORK</span><h2>THE SHOW<span>CASE.</span></h2></div><p>Different mediums. One obsession:<br/>making the frame matter.</p></div>
      <div className="work-controls"><div className="tabs"><a className="tab-link" href="#ai-videos">▶ AI VIDEOS <sup>24</sup></a><button className={category==="design"?"selected":""} onClick={()=>setCategory("design")}>✳ REELS <sup>{String(designProjects.length).padStart(2,"0")}</sup></button></div><div className="drag-hint">{category==="design"?"DRAG / SWIPE TO EXPLORE · TAP TO PLAY":"DRAG / SWIPE TO EXPLORE"} <span>{category==="design"?"↔":"↔"}</span></div></div>
      <div className={`carousel-shell ${category==="design"?"reel-mode":""}`} onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={onPointerUp} onPointerLeave={onPointerUp}>
        <div className="carousel-stage" ref={carouselRef}>
          {items.map((p,i)=>{
            const angle=(i*360/items.length)+rotation;
            const radians=angle*Math.PI/180;
            const x=Math.sin(radians)*330;
            const z=(Math.cos(radians)+1)*-155;
            const scale=.68+(Math.cos(radians)+1)*.16;
            const isFront=i===activeIndex;
            return <motion.button key={category+p.n} className={`carousel-card ${isFront?"front":""}`} animate={{x, y:Math.abs(x)*.035, z, scale, opacity:.36+(Math.cos(radians)+1)*.32, rotateY:-Math.sin(radians)*17}} transition={{type:"spring",stiffness:90,damping:18}} onClick={()=>{if(category==="design"){if(reelMoved.current){reelMoved.current=false;return}setActive(p)}else if(isFront)setActive(p);else setRotation(rotation+(i-activeIndex)*(360/items.length))}}>
              {p.youtubeId ? <div className="reel-cover reel-poster"><img src={`https://i.ytimg.com/vi/${p.youtubeId}/maxresdefault.jpg`} alt={`${p.name} reel thumbnail`} onError={e=>{if(!e.currentTarget.src.includes("hqdefault.jpg"))e.currentTarget.src=`https://i.ytimg.com/vi/${p.youtubeId}/hqdefault.jpg`}}/><span className="reel-play"><Play fill="currentColor"/></span><div className="reel-poster-top"><span>{p.n} / {String(items.length).padStart(2,"0")}</span><span>AI REEL</span></div><div className="reel-poster-bottom"><b>{p.name}</b><small>{p.client}</small></div></div> : <Visual tone={p.tone} index={i}/>}<div className="carousel-card-foot"><span>{p.n} / {String(items.length).padStart(2,"0")}</span><span>{p.kind}</span></div>
            </motion.button>
          })}
        </div>
        {category!=="design"&&<div className="carousel-nav"><button onClick={()=>move(-1)} aria-label="Previous"><ArrowLeft/></button><span>{String(activeIndex+1).padStart(2,"0")} <i>/</i> {String(items.length).padStart(2,"0")}</span><button onClick={()=>move(1)} aria-label="Next"><ArrowRight/></button></div>}
      </div>
      {category!=="design"&&<><div className="featured-caption"><div><span className="eyebrow">CURRENTLY IN FOCUS</span><h3>{items[activeIndex]?.name}</h3><p>{items[activeIndex]?.client}</p></div><button className="text-link" onClick={()=>setActive(items[activeIndex])}>EXPLORE PROJECT <MoveUpRight size={16}/></button></div>
      <p className="disclaimer">PROJECT PANELS ARE VISUAL PLACEHOLDERS. REAL CAMPAIGN STILLS, VIDEO LINKS AND CREDITS WILL REPLACE THESE BEFORE PUBLIC LAUNCH.</p></>}
    </section>

    <section className="ai-gallery section" id="ai-videos">
      <div className="section-intro"><div><span className="eyebrow">01A / THE AI VIDEO LIBRARY</span><h2>AI <span>FILMS.</span></h2></div><p>24 AI-created projects.<br/>Browse by format and craft.</p></div>
      {featuredVideo&&<div className="featured-single"><button className="featured-single-thumb" onClick={()=>featuredVideo.youtubeId&&setActive(featuredVideo)} aria-label={`Play featured video ${featuredVideo.title}`}><img src={featuredVideo.youtubeId?`https://i.ytimg.com/vi/${featuredVideo.youtubeId}/maxresdefault.jpg`:""} alt={`${featuredVideo.title} thumbnail`} onError={e=>{if(featuredVideo.youtubeId&&!e.currentTarget.src.includes("hqdefault.jpg"))e.currentTarget.src=`https://i.ytimg.com/vi/${featuredVideo.youtubeId}/hqdefault.jpg`}}/>{featuredVideo.youtubeId?<span className="thumb-play"><Play fill="currentColor"/></span>:<span className="featured-video-pending">VIDEO PENDING</span>}</button><div className="featured-single-copy"><span className="eyebrow">FEATURED VIDEO / {featuredVideo.category.toUpperCase()}</span><h3>{featuredVideo.title}</h3><p>A featured AI campaign film from the selected portfolio work.</p>{featuredVideo.youtubeId&&<button className="text-link" onClick={()=>setActive(featuredVideo)}>PLAY FEATURED VIDEO <MoveUpRight size={16}/></button>}<div className="featured-single-nav"><button aria-label="Previous featured video" onClick={()=>setFeaturedIndex(i=>(i-1+featuredVideos.length)%featuredVideos.length)}><ArrowLeft/></button><span>{String(featuredIndex+1).padStart(2,"0")} <i>/</i> {String(featuredVideos.length).padStart(2,"0")}</span><button aria-label="Next featured video" onClick={()=>setFeaturedIndex(i=>(i+1)%featuredVideos.length)}><ArrowRight/></button></div></div></div>}
      <div className="ai-filter-row">{aiCategories.map(c=><button key={c} className={aiFilter===c?"active":""} onClick={()=>setAiFilter(c)}>{c}</button>)}</div>
      <div className="ai-video-grid">{filteredVideos.map(v=><article className="ai-video-card" key={v.file}>{v.youtubeId ? <button className="video-thumb" onClick={()=>setActive(v)} aria-label={`Play ${v.title}`}><img src={`https://i.ytimg.com/vi/${v.youtubeId}/maxresdefault.jpg`} alt={`${v.title} video thumbnail`} onError={e=>{if(!e.currentTarget.src.includes("hqdefault.jpg"))e.currentTarget.src=`https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`}}/><span className="thumb-play"><Play fill="currentColor"/></span></button> : <div className="video-pending"><span>VIDEO PREVIEW</span><b>{v.title}</b><small>Online video link pending</small></div>}<div className="ai-video-meta"><span>{[v.category,...(v.extraCategories||[]),...(v.tags||[])].join(" · ")}</span><span className={v.priority==="Featured"?"priority-featured":""}>{v.priority}</span></div><h3>{v.title}</h3></article>)}</div>
      <p className="disclaimer">All 24 portfolio videos are linked to their YouTube previews.</p>
    </section>

    <section className="archive section" id="archive">
      <div className="section-intro"><div><span className="eyebrow">02 / THE CREATIVE ARCHIVE</span><h2>OPEN A<br/><span>FOLDER.</span></h2></div><p>A little organised chaos.<br/>A look at what makes the work.</p></div>
      <div className="folder-grid">
        {[{name:"THE TOOLKIT",sub:"SOFTWARE / AI / CRAFT",icon:"✳",color:"folder-green",body:"Premiere Pro · After Effects · Photoshop · Runway · Firefly · Higgsfield · Pika Labs · VFX & compositing."},{name:"BRAND UNIVERSE",sub:"CAMPAIGNS / COLLABORATIONS",icon:"◈",color:"folder-orange",body:"Selected brand and production experience includes HDFC Bank, PhonePe, Zomato, Mumbai Indians, JioHotstar, Bigg Boss and Savvy."},{name:"THE PROCESS",sub:"IDEA / BUILD / FINISH",icon:"⌘",color:"folder-purple",body:"Concept and references → visual direction → production / AI generation → edit and motion → finishing and delivery."}].map(f=><button className={`folder ${f.color}`} key={f.name} onClick={()=>setFolder(folder===f.name?null:f.name)}><div className="folder-top"><span>{f.icon}</span><Plus/></div><div className="folder-shape"><i/><i/><i/></div><div className="folder-info"><span>{f.sub}</span><h3>{f.name}</h3></div></button>)}
      </div>
      <AnimatePresence>{folder&&<motion.div className="folder-detail" initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}}><div><span className="eyebrow">INSIDE THE FOLDER</span><h3>{folder}</h3><p>{folder==="THE TOOLKIT"?"Premiere Pro · After Effects · Photoshop · Runway · Firefly · Higgsfield · Pika Labs · VFX & compositing.":folder==="BRAND UNIVERSE"?"Selected brand and production experience includes HDFC Bank, PhonePe, Zomato, Mumbai Indians, JioHotstar, Bigg Boss and Savvy.":"Concept and references → visual direction → production / AI generation → edit and motion → finishing and delivery."}</p></div><button onClick={()=>setFolder(null)}><X/></button></motion.div>}</AnimatePresence>
      <div className="brand-wall"><div className="eyebrow">SELECTED BRAND EXPERIENCE</div><div className="brand-logos">{brands.map((b,i)=><span key={b} className={`brand-logo brand-${i}`}>{b}</span>)}</div><p>Brand names represent selected project experience. Detailed campaign credits can be added to individual case studies.</p></div>
    </section>

    <section className="manifesto"><div className="manifesto-inner"><span className="eyebrow">THE CREATIVE PRINCIPLE</span><h2>TOOLS CHANGE.<br/><span>GOOD TASTE</span><br/>DOESN’T.</h2><div className="manifesto-note">TECHNIQUE IS THE TOOL.<br/>THE IDEA IS THE POINT. <b>✳</b></div></div></section>

    <section className="about section" id="about">
      <div className="section-intro"><div><span className="eyebrow">03 / A LITTLE ABOUT ME</span><h2>THE HUMAN<br/><span>BEHIND HY.</span></h2></div><p>Curious by nature.<br/>Creative by practice.</p></div>
      <div className="about-grid">
        <div className="about-note"><div className="about-stamp">NOT ONE<br/>BOX.<br/><b>EVER.</b></div><p>I’m Harsh Yadav, a multidisciplinary creative with around five years of experience making visual content for brands, creators and digital platforms.</p><p>My sweet spot is where craft meets curiosity — combining strong editing instincts, motion design, VFX and AI tools to make work that feels fresh, intentional and human.</p></div>
        <div className="desk-panel"><div className="desk-top"><span>THE CREATIVE DESK</span><span>INTERACTIVE / 001</span></div><div className="desk-scene"><button className="desk-object monitor" onClick={()=>setDesk("Premiere Pro — where the story finds its rhythm.")}><i/><b>PR</b></button><button className="desk-object tablet" onClick={()=>setDesk("Photoshop — visual ideas, composited into reality.")}><b>Ps</b></button><button className="desk-object cube" onClick={()=>setDesk("After Effects — motion, systems and a little magic.")}><b>Ae</b></button><button className="desk-object orb" onClick={()=>setDesk("AI tools — a new way to explore the impossible.")}><Sparkles/></button><span className="desk-floor"/></div><div className="desk-hint"><span>{desk}</span><span>CLICK AN OBJECT ↗</span></div></div>
      </div>
      <div className="capabilities"><span className="eyebrow">THE TOOLKIT / WHAT I BRING</span><div className="tool-tags">{tools.map((t,i)=><span key={t}><i>0{i+1}</i>{t}</span>)}</div></div>
      <div className="timeline"><div className="timeline-head"><span className="eyebrow">04 / THE STORY SO FAR</span><h2>IN PROGRESS.</h2></div><div className="timeline-list">{timeline.map((t,i)=><div className="timeline-item" key={t.year}><span className="timeline-year">{t.year}</span><div><h3>{t.role}</h3><b>{t.place}</b><p>{t.copy}</p></div><span className="timeline-no">0{i+1}</span></div>)}</div></div>
    </section>

    <section className="contact" id="contact"><div className="contact-top"><span className="eyebrow">05 / YOUR IDEA, NEXT?</span><span>AVAILABLE FOR SELECT PROJECTS</span></div><h2>LET’S MAKE<br/><em>SOMETHING.</em></h2><a className="contact-cta" href="mailto:YOUR_EMAIL_HERE">HAVE A PROJECT? LET’S TALK <ArrowUpRight/></a><div className="contact-bottom"><span>CREATIVE ROLES · FREELANCE · COLLABORATIONS</span><div><a href="https://www.linkedin.com/in/harsh-yadav-6561a6223/" target="_blank" rel="noreferrer"><Linkedin/> LINKEDIN</a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><Instagram/> INSTAGRAM</a><a href="mailto:YOUR_EMAIL_HERE"><Mail/> EMAIL</a></div></div></section>
    <footer><a href="#home" className="signature"><span className="sig-icon">HY.</span><span>HARSH YADAV<small>INDEPENDENT CREATIVE</small></span></a><span>© 2026 · MADE WITH INTENT IN INDIA</span><a href="#home">BACK TO TOP ↑</a></footer>

    <AnimatePresence>{active&&<motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setActive(null)}><motion.div className="project-modal" initial={{y:30,scale:.97}} animate={{y:0,scale:1}} exit={{y:20,scale:.98}} onClick={e=>e.stopPropagation()}><button className="modal-x" onClick={()=>setActive(null)}><X/></button><span className="eyebrow">{active.n ? `PROJECT / ${active.n} — SELECTED WORK` : active.category}</span><h3>{active.name||active.title}</h3><p className="modal-client">{active.client||active.category}</p>{active.youtubeId ? <iframe className={`modal-video ${active.kind?.includes("REEL")?"modal-reel-video":""}`} src={`https://www.youtube-nocookie.com/embed/${active.youtubeId}?autoplay=1`} title={active.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen/> : <Visual tone={active.tone} index={Number(active.n)-1}/>}<p>{active.desc||active.file}</p>{active.n&&<small>Replace this concept preview with the final video, stills, campaign objective and your exact role.</small>}</motion.div></motion.div>}</AnimatePresence>
  </main>
}
