import styles from "./MarqueeBanners.module.css";

function MarqueeLine({ text, variant, reverse }) {
    return (
        <div className={`${styles.strip} ${styles[variant]} ${reverse ? styles.reverse : ""}`}>
            <div className={styles.marquee}>
                <div className={styles.track} aria-hidden="true">
                    {Array.from({ length: 18 }).map((_, i) => (
                        <span key={`a-${i}`} className={styles.token}>
                            {text}
                            <span className={styles.dot}>•</span>
                        </span>
                    ))}
                </div>
                
                <div className={styles.track} aria-hidden="true">
                    {Array.from({ length: 18 }).map((_, i) => (
                        <span key={`b-${i}`} className={styles.token}>
                            {text}
                            <span className={styles.dot}>•</span>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function MarqueeBanners() {
    return (
        <section className={styles.wrap} aria-label="Scrolling banners">
            <MarqueeLine text="WEB - DESIGN - PHOTOGRAPHY" variant="white" />
            <MarqueeLine text="PROJECTS" variant="green" reverse />
        </section>
    );
}