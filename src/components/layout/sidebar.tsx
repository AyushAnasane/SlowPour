
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "../styles/sidebar.module.css";
import shared from "../styles/shared.module.css";

import { CoffeeMark } from "@/components/icons/coffee-mark";
import {
  BeanIcon,
  BookIcon,
  FlaskIcon,
  HomeIcon,
  SettingsIcon,
} from "@/components/icons/nav-icons";

const links = [
  { href: "/dashboard", label: "Today", Icon: HomeIcon },
  { href: "/coffees", label: "My coffees", Icon: BeanIcon },
  { href: "/recipes", label: "Recipes", Icon: BookIcon },
  { href: "/brews", label: "Brew journal", Icon: FlaskIcon },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <Link
        href="/dashboard"
        className={styles["brand-lockup"]}
      >
        <CoffeeMark className="h-8 w-8" />

        <span>
          slow pour
          <span className={styles["brand-period"]}>.</span>
        </span>
      </Link>

      <div className={styles["sidebar-label"]}>
        YOUR SPACE
      </div>

      <nav className={styles["nav-list"]}>
        {links.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            className={[
              styles["nav-link"],
              pathname === href || (href === "/dashboard" && pathname === "/")
                ? styles["nav-link-active"]
                : "",
            ].join(" ")}
            aria-current={pathname === href ? "page" : undefined}
          >
            <Icon />
            <span>{label}</span>
          </Link>
        ))}
      </nav>

      <div className={styles["sidebar-bottom"]}>
        <div className={styles["sidebar-note"]}>
          <span className={styles["note-spark"]}>✳</span>

          <p>
            Good coffee takes time.
            <br />
            So do good things.
          </p>
        </div>

        <Link href="/settings" className={styles["nav-link"]}>
          <SettingsIcon />
          <span>Settings</span>
        </Link>

        <div className={styles["profile-mini"]}>
          <div className={shared.avatar}>A</div>

          <div>
            <strong>Your journal</strong>
            <span>Personal space</span>
          </div>

          <span className={styles["profile-dots"]}>···</span>
        </div>
      </div>
    </aside>
  );
}
