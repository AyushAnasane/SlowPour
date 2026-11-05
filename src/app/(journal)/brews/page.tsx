"use client";

import { FormEvent, useState } from "react";
import styles from "./brews.module.css";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { SensoryRadar } from "@/components/charts/sensory-radar";

const brews = [
  { date: "TODAY · 8:42 AM", title: "A slower morning", coffee: "Ethiopia · Guji Natural", method: "Moka pot", note: "Rounder sweetness, with a soft cocoa finish.", score: "8.4", mood: "amber" },
  { date: "MONDAY · 9:16 AM", title: "Finding the balance", coffee: "Colombia · Huila Washed", method: "Moka pot", note: "A little bright at first, lovely as it cooled.", score: "7.8", mood: "rose" },
  { date: "OCT 31 · 10:03 AM", title: "A quiet experiment", coffee: "Konga Decaf · Yirgacheffe", method: "Pour-over", note: "Soft apricot and a very kind finish.", score: "8.1", mood: "sage" },
];

export default function BrewsPage() {
  const [showForm, setShowForm] = useState(false);
  const [saved, setSaved] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSaved(true); setShowForm(false); }
  return <div className={styles.page}>
  <header className={styles.topbar}><div className={styles.breadcrumb}>YOUR JOURNAL <span>/</span> BREW JOURNAL</div><div className={styles.topbarRight}><span className={styles.weather}>A record of the good cups</span><ThemeToggle/><div className={styles.avatar}>A</div></div></header>
  <section className={styles.intro}><div><p className={styles.eyebrow}>NOTES FROM THE COUNTER</p><h1>Every cup<br/><em>has a story.</em></h1><p className={styles.lede}>A quiet record of what you brewed, how it tasted, and what you might try next time.</p></div><div className={styles.introArt} aria-hidden="true"><div className={styles.circle}/><div className={styles.steamOne}/><div className={styles.steamTwo}/><div className={styles.cup}/><div className={styles.saucer}/></div></section>
  <div className={styles.toolbar}><div><span className={styles.count}>12</span><span className={styles.muted}> brews this month</span></div><button className={styles.primary} type="button" onClick={() => setShowForm((value) => !value)}>＋ Log a brew</button></div>
  {showForm && <form className={styles.entryForm} onSubmit={handleSubmit}><label>Coffee<input required name="coffee" placeholder="e.g. Ethiopia · Guji Natural" /></label><label>Method<select name="method" defaultValue="Moka pot"><option>Moka pot</option><option>Pour-over</option><option>French press</option><option>AeroPress</option></select></label><label>What did you notice?<input name="note" placeholder="A soft cocoa finish..." /></label><div className={styles.formActions}><button className={styles.textButton} type="button" onClick={() => setShowForm(false)}>Cancel</button><button className={styles.primary} type="submit">Save brew note</button></div></form>}
  <section className={styles.content}><div className={styles.list}>{brews.map((brew) => <article className={styles.brewCard} key={brew.title}><div className={`${styles.thumb} ${styles[brew.mood]}`}><div className={styles.thumbRing}/><div className={styles.thumbCup}/></div><div className={styles.brewInfo}><p className={styles.eyebrow}>{brew.date}</p><h2>{brew.title}</h2><p className={styles.coffee}>{brew.coffee}</p><p className={styles.note}>“{brew.note}”</p><div className={styles.meta}><span>{brew.method}</span><span>·</span><span>Personal note</span></div></div><div className={styles.score}><strong>{brew.score}</strong><span>YOUR RATING</span></div></article>)}</div><aside className={styles.insight}><div className={styles.insightHead}><div><p className={styles.eyebrow}>A TASTE, REMEMBERED</p><h2>Latest sensory notes</h2></div><span className={styles.flower}>✳</span></div><p className={styles.sub}>Ethiopia · Guji · Natural</p><SensoryRadar/><div className={styles.legend}><span><i/> Latest tasting</span><span>07 notes logged</span></div></aside></section>
  <section className={styles.bottomNote} id="new-brew"><span className={styles.promptMark}>✳</span><div><p className={styles.eyebrow}>THE NEXT CUP</p><h2>{saved ? "Brew note saved." : "Ready for another little experiment?"}</h2><p>Log the details while they’re still warm.</p></div><button className={styles.textButton} type="button" onClick={() => setShowForm(true)}>Start a brew note <span>↗</span></button></section>
</div>; }
