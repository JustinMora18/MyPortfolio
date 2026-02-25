import { useMemo, useRef } from "react";
import { motion } from "motion/react";
import styles from "./web.module.css";

import webBackground from "../../../../assets/images/web/webBackgrond.png";

import flashcardsImg from "../../../../assets/images/web/FalshcardsPage.png";
import calculatorImg from "../../../../assets/images/web/MycalculatorPage.jpg";
import neonImg from "../../../../assets/images/web/NeonConceptPage.png";
import photoPortImg from "../../../../assets/images/web/PhotographerPortfolio.png";
import promodoneImg from "../../../../assets/images/web/PromodonePage.png";
import linktreeImg from "../../../../assets/images/web/linktreePage.png";

export default function Web() {
    const sectionRef = useRef(null);

    const cards = useMemo(
        () => [
            { id: "calc", src: calculatorImg, className: styles.cardTL, alt: "Calculator" },
            { id: "promo", src: promodoneImg, className: styles.cardTR, alt: "Promodone" },
            
            { id: "flash", src: flashcardsImg, className: styles.cardC1, alt: "Flashcards" },
            { id: "linktree", src: linktreeImg, className: styles.cardC2, alt: "Linktree" },
            
            { id: "neon", src: neonImg, className: styles.cardBL, alt: "Neon concept" },
            { id: "photo", src: photoPortImg, className: styles.cardBR, alt: "Photography portfolio" },
        ],  
        []
    );

    const dragEnabled =
        typeof window !== "undefined" && !window.matchMedia?.("(pointer: coarse)").matches;

    return (
        <section
            ref={sectionRef}
            id="web"
            className={styles.web}
            style={{ backgroundImage: `url(${webBackground})` }}
        >
            <div className={styles.inner}>
                <h2 className={styles.title}>WEBS</h2>

                <div className={styles.stage} aria-hidden="true">
                    {cards.map((c) => (
                        <div key={c.id} className={`${styles.card} ${c.className}`}>
                            <motion.div
                                className={styles.dragLayer}
                                drag={dragEnabled}
                                dragConstraints={sectionRef}
                                dragElastic={0.35}
                                dragMomentum={false}
                                whileTap={dragEnabled ? { scale: 0.98 } : undefined}
                            >   
                                <img className={styles.thumb} src={c.src} alt={c.alt} draggable={false} />
                            </motion.div>
                        </div>
                    ))}
                </div>
                
                <p className={styles.desc}>Some personal projects i've made.</p>
            </div>
        </section>
    );
}