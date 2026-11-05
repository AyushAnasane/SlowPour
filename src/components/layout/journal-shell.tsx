import styles from "../styles/shell.module.css";
import { Sidebar } from "./sidebar";
export function JournalShell({ children }: { children: React.ReactNode }) {
  return <div className={styles["app-shell"]}><Sidebar/><main className={styles["main-content"]}>{children}</main></div>;
}
