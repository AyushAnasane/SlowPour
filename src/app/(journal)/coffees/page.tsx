"use client";

import { FormEvent, useState } from "react";
import styles from "./coffees.module.css";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const coffees = [
  { name: "Guji Natural", roaster: "Daybreak Coffee Co.", origin: "Ethiopia · Guji", process: "Natural", roast: "Light", notes: "Blueberry, cocoa nib, jasmine", remaining: "248g", tone: "amber", opened: "Opened 4 days ago" },
  { name: "Huila El Diviso", roaster: "Field Notes Roasters", origin: "Colombia · Huila", process: "Washed", roast: "Light-medium", notes: "Red apple, panela, almond", remaining: "412g", tone: "rose", opened: "Opened 11 days ago" },
  { name: "Konga Decaf", roaster: "Nightjar Coffee", origin: "Ethiopia · Yirgacheffe", process: "EA Decaf", roast: "Medium", notes: "Apricot, caramel, tea", remaining: "190g", tone: "sage", opened: "Opened 18 days ago" },
  { name: "House Espresso", roaster: "Small Hours", origin: "Brazil · Mogiana", process: "Natural", roast: "Medium", notes: "Chocolate, hazelnut, molasses", remaining: "—", tone: "clay", opened: "Added this month" },
];

export default function CoffeesPage() {
  const [showForm, setShowForm] = useState(false);
  const [saved, setSaved] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
    setShowForm(false);
  }

  return <div className={styles.page}>
    <header className={styles.topbar}><div className={styles.breadcrumb}>YOUR JOURNAL <span>/</span> MY COFFEES</div><div className={styles.topbarRight}><span className={styles.weather}>A small library of good things</span><ThemeToggle/><div className={styles.avatar}>A</div></div></header>
    <section className={styles.intro}><div><p className={styles.eyebrow}>THE CUPBOARD</p><h1>Coffees worth<br/><em>remembering.</em></h1><p className={styles.lede}>Keep track of the beans on your counter, the ones you loved, and the ones still waiting for their moment.</p></div><div className={styles.introArt} aria-hidden="true"><div className={styles.sun}/><div className={`${styles.bean} ${styles.beanOne}`}/><div className={`${styles.bean} ${styles.beanTwo}`}/><div className={`${styles.bean} ${styles.beanThree}`}/></div></section>
    <div className={styles.toolbar}><div><span className={styles.count}>04</span><span className={styles.muted}> coffees in your cupboard</span></div><button className={styles.primary} type="button" onClick={() => setShowForm((value) => !value)}>＋ Add a coffee</button></div>
    {showForm && <form className={styles.entryForm} onSubmit={handleSubmit}><label>Coffee name<input required name="name" placeholder="e.g. Guji Natural" /></label><label>Roaster<input required name="roaster" placeholder="e.g. Daybreak Coffee Co." /></label><label>Origin<input name="origin" placeholder="e.g. Ethiopia · Guji" /></label><div className={styles.formActions}><button className={styles.textButton} type="button" onClick={() => setShowForm(false)}>Cancel</button><button className={styles.primary} type="submit">Save coffee</button></div></form>}
    <section className={styles.grid}>{coffees.map((coffee) => <article className={styles.card} key={coffee.name}><div className={`${styles.cardArt} ${styles[coffee.tone]}`}><div className={styles.package}><span>slow<br/>pour<span>.</span></span><small>{coffee.roast.toUpperCase()}</small></div><div className={styles.cardBean}/></div><div className={styles.cardBody}><div className={styles.cardTop}><div><p className={styles.eyebrow}>{coffee.roaster}</p><h2>{coffee.name}</h2></div><button className={styles.more} aria-label={`More options for ${coffee.name}`}>···</button></div><p className={styles.origin}>{coffee.origin} <span>·</span> {coffee.process}</p><p className={styles.notes}>{coffee.notes}</p><div className={styles.cardFoot}><div><strong>{coffee.remaining}</strong><span>remaining</span></div><span className={styles.opened}>{coffee.opened}</span></div></div></article>)}</section>
    <section className={styles.emptyPrompt} id="add-coffee"><span className={styles.promptMark}>✳</span><div><p className={styles.eyebrow}>A LITTLE MORE ROOM</p><h2>{saved ? "Coffee noted." : "Have another bag waiting?"}</h2><p>{saved ? "It’s ready to connect to your private coffee cupboard." : "Log it here when you’re ready. Your future self will thank you."}</p></div><button className={styles.textButton} type="button" onClick={() => setShowForm(true)}>Add a coffee <span>↗</span></button></section>
  </div>;
}
