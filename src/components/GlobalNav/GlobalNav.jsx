import { useEffect, useState } from "react";
import styles from "./globalNav.module.css";

export default function GlobalNav() {
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) setMenuOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!menuOpen) return;
        const close = () => setMenuOpen(false);
        document.addEventListener("scroll", close, true);
        window.addEventListener("wheel", close, { passive: true });
        window.addEventListener("touchmove", close, { passive: true });
        
        return () => {
            document.removeEventListener("scroll", close, true);
            window.removeEventListener("wheel", close);
            window.removeEventListener("touchmove", close);
        };
    },   [menuOpen]);

return (
<header className={styles.wrap} onClick={() => setMenuOpen(false)}>
    <nav className={styles.navPill} aria-label="Primary">
        <a className={styles.navItem} href="#home">Home</a>
        <a className={styles.navItem} href="#about">About</a>
        <a className={styles.navItem} href="#web">Web</a>
        <a className={styles.navItem} href="#designs">Designs</a>
        <a className={styles.navItem} href="#photography">Photography</a>
        <a className={styles.navItem} href="#questions">Got questions?</a>
        <a className={styles.navItem} href="#contact">Contact</a>
    </nav>
    <button
        className={styles.mobileMenuBtn}
        type="button"
        aria-label="Open menu"
        aria-expanded={menuOpen}
        onClick={(e) => {
            e.stopPropagation();
            setMenuOpen((v) => !v);
        }}
    >
        <span className={styles.hamburger}>{menuOpen ? "✕" : "☰"}</span>
    </button>
    {menuOpen && (
        <div className={styles.mobileMenu} onClick={(e) => e.stopPropagation()}>
            <a className={styles.mobileMenuItem} href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            <a className={styles.mobileMenuItem} href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a className={styles.mobileMenuItem} href="#web" onClick={() => setMenuOpen(false)}>Web</a>
            <a className={styles.mobileMenuItem} href="#designs" onClick={() => setMenuOpen(false)}>Designs</a>
            <a className={styles.mobileMenuItem} href="#photography" onClick={() => setMenuOpen(false)}>Photography</a>
            <a className={styles.mobileMenuItem} href="#questions" onClick={() => setMenuOpen(false)}>Got questions?</a>
            <a className={styles.mobileMenuItem} href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
    )}
</header>
);
}