"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import styles from "./recipes.module.css";
import { ThemeToggle } from "@/components/layout/theme-toggle";

const recipes = [
  { name: "The everyday pour-over", method: "Pour-over", details: "15g coffee · 250g water · 93°C", time: "3:10", note: "Clean, sweet, and quietly dependable.", featured: true },
  { name: "A softer moka pot", method: "Moka pot", details: "18g coffee · low and slow", time: "4:30", note: "For mornings that need a little more weight." },
  { name: "Sunday French press", method: "French press", details: "30g coffee · 500g water · 4 min", time: "5:00", note: "A generous cup for an unhurried table." },
  { name: "The afternoon aeropress", method: "AeroPress", details: "15g coffee · 200g water · inverted", time: "2:00", note: "Bright, quick, and a little playful." },
];

export default function RecipesPage() {
  const [showForm, setShowForm] = useState(false);
  const [saved, setSaved] = useState(false);
  function handleSubmit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSaved(true); setShowForm(false); }
  return <div className={styles.page}>
  <header className={styles.topbar}><div className={styles.breadcrumb}>YOUR JOURNAL <span>/</span> RECIPES</div><div className={styles.topbarRight}><span className={styles.weather}>Rituals, written down</span><ThemeToggle/><div className={styles.avatar}>A</div></div></header>
  <section className={styles.intro}><div><p className={styles.eyebrow}>YOUR LITTLE RITUALS</p><h1>Recipes for<br/><em>slow mornings.</em></h1><p className={styles.lede}>The methods you return to, refined over time and ready whenever the kettle starts to sing.</p></div><div className={styles.introArt} aria-hidden="true"><div className={styles.paper}><span>pour<br/>slowly</span><i>✳</i></div><div className={styles.line}/></div></section>
  <div className={styles.toolbar}><div><span className={styles.count}>06</span><span className={styles.muted}> saved recipes</span></div><button className={styles.primary} type="button" onClick={() => setShowForm((value) => !value)}>＋ New recipe</button></div>
  {showForm && <form className={styles.entryForm} onSubmit={handleSubmit}><label>Recipe name<input required name="name" placeholder="e.g. The everyday pour-over" /></label><label>Method<select name="method" defaultValue="Pour-over"><option>Pour-over</option><option>Moka pot</option><option>French press</option><option>AeroPress</option></select></label><label>Recipe note<input name="note" placeholder="What makes this one yours?" /></label><div className={styles.formActions}><button className={styles.textButton} type="button" onClick={() => setShowForm(false)}>Cancel</button><button className={styles.primary} type="submit">Save recipe</button></div></form>}
  <section className={styles.recipeGrid}>{recipes.map((recipe, index) => <article key={recipe.name} className={`${styles.recipeCard} ${recipe.featured ? styles.featured : ""}`}><div className={styles.recipeNumber}>0{index + 1}</div><div className={styles.recipeContent}><div className={styles.recipeHeader}><div><p className={styles.eyebrow}>{recipe.method}</p><h2>{recipe.name}</h2></div><span className={styles.kebab}>···</span></div><p className={styles.note}>“{recipe.note}”</p><div className={styles.details}><span>{recipe.details}</span><strong>{recipe.time}</strong></div><Link className={styles.viewLink} href="#recipe-detail">View recipe <span>↗</span></Link></div></article>)}</section>
  <section className={styles.bottomNote} id="new-recipe"><span className={styles.promptMark}>✳</span><div><p className={styles.eyebrow}>A RECIPE IS A STARTING POINT</p><h2>{saved ? "Recipe noted." : "Make it yours."}</h2><p>Save the details that make a good cup feel like your cup.</p></div><button className={styles.textButton} type="button" onClick={() => setShowForm(true)}>Create a recipe <span>↗</span></button></section>
</div>; }
