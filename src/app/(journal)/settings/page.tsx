"use client";

import { useState } from "react";
import styles from "./settings.module.css";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export default function SettingsPage() {
  const [editing, setEditing] = useState(false);
  return <div className={styles.page}>
  <header className={styles.topbar}><div className={styles.breadcrumb}>YOUR JOURNAL <span>/</span> SETTINGS</div><div className={styles.topbarRight}><span className={styles.weather}>Make this space feel like yours</span><ThemeToggle/><div className={styles.avatar}>A</div></div></header>
  <section className={styles.intro}><div><p className={styles.eyebrow}>YOUR SPACE</p><h1>A few gentle<br/><em>preferences.</em></h1><p className={styles.lede}>Small choices that help Slow Pour feel a little more like your own corner of the kitchen.</p></div><div className={styles.introArt} aria-hidden="true"><div className={styles.sun}/><div className={styles.window}><span/><span/><span/></div></div></section>
  <section className={styles.settingsGrid}><div className={styles.panel}><div className={styles.panelHead}><div><p className={styles.eyebrow}>PROFILE</p><h2>Your journal</h2></div><span className={styles.panelIcon}>◌</span></div>{editing ? <div className={styles.profileEdit}><label>Display name<input defaultValue="Your journal" /></label><label>Short note<input defaultValue="Personal space" /></label><div><button className={styles.outlineButton} type="button" onClick={() => setEditing(false)}>Done</button></div></div> : <div className={styles.profileRow}><div className={styles.largeAvatar}>A</div><div><strong>Personal space</strong><p>This is your private coffee journal.</p></div><button className={styles.outlineButton} type="button" onClick={() => setEditing(true)}>Edit profile</button></div>}</div>
    <div className={styles.panel}><div className={styles.panelHead}><div><p className={styles.eyebrow}>APPEARANCE</p><h2>How it looks</h2></div><span className={styles.panelIcon}>☼</span></div><div className={styles.preference}><div><strong>Dark theme</strong><p>Keep the evening cups easy on the eyes.</p></div><ThemeToggle/></div></div>
    <div className={styles.panel}><div className={styles.panelHead}><div><p className={styles.eyebrow}>JOURNAL NOTES</p><h2>Defaults</h2></div><span className={styles.panelIcon}>✳</span></div><label className={styles.field}>Preferred brew method<select defaultValue="moka-pot"><option value="moka-pot">Moka pot</option><option value="pour-over">Pour-over</option><option value="french-press">French press</option><option value="aeropress">AeroPress</option></select></label><label className={styles.field}>Default visibility<select defaultValue="private"><option value="private">Private — just for you</option><option value="public">Public — share with others</option></select></label></div>
    <div className={styles.panel}><div className={styles.panelHead}><div><p className={styles.eyebrow}>ABOUT SLOW POUR</p><h2>Take your time.</h2></div><span className={styles.panelIcon}>♡</span></div><p className={styles.about}>Slow Pour is a quieter place to notice the details: the first aroma, the temperature as it cools, and the small ritual of making something good.</p><p className={styles.version}>A coffee journal · version 0.1</p></div>
  </section>
  <footer className={styles.footer}>MADE FOR THE LOVE OF A GOOD CUP <span>TAKE YOUR TIME. TASTE THE DIFFERENCE.</span></footer>
</div>; }
