import styles from "./sideVignette.module.css";

export default function SideVignette({ className = "" }) {
    return <div className={`${styles.vignette} ${className}`} aria-hidden="true" />;
}
