import { useMemo, useState } from "react";
import { motion } from "motion/react";
import styles from "./technologies.module.css";

import cssLogo from "../../../../assets/images/techLogos/css_logo.png";
import figmaLogo from "../../../../assets/images/techLogos/figma_logo.png";
import githubLogo from "../../../../assets/images/techLogos/github_logo.png";
import htmlLogo from "../../../../assets/images/techLogos/html_logo.png";
import illustratorLogo from "../../../../assets/images/techLogos/ilustrator_logo.png";
import javaLogo from "../../../../assets/images/techLogos/java_logo.png";
import photoshopLogo from "../../../../assets/images/techLogos/photoshop_logo.png";
import procreateLogo from "../../../../assets/images/techLogos/porcreate_logo.png";
import reactLogo from "../../../../assets/images/techLogos/react_logo.png";

export default function Technologies() {
    const [showLogos, setShowLogos] = useState(false);

    const logos = useMemo(
        () => [
            { id: "java", src: javaLogo, alt: "Java" },
            { id: "css", src: cssLogo, alt: "CSS" },
            { id: "html", src: htmlLogo, alt: "HTML" },
            { id: "github", src: githubLogo, alt: "GitHub" },
            { id: "react", src: reactLogo, alt: "React" },
            { id: "ps", src: photoshopLogo, alt: "Photoshop" },
            { id: "ai", src: illustratorLogo, alt: "Illustrator" },
            { id: "procreate", src: procreateLogo, alt: "Procreate" },
            { id: "figma", src: figmaLogo, alt: "Figma" },
        ],
        []
    );

    return (
        <section
            id="technologies"
            className={styles.tech}
            onMouseDown={(e) => e.preventDefault()} 
        >   
            <div className={styles.inner}>
                <div className={styles.stack}>
                    <h2 className={styles.title}>TECHNOLOGIES</h2>

                    <motion.div
                        className={styles.row}
                        initial={false}
                        onViewportEnter={() => {
                            if (showLogos) return;
                            window.setTimeout(() => setShowLogos(true), 220);
                        }}  
                        viewport={{ once: true, amount: 0.35 }}
                    >   
                        {logos.map((l, i) => (
                            <motion.div
                                key={l.id}
                                className={styles.card}
                                initial={{ opacity: 0, y: 14, scale: 0.92 }}
                                animate={showLogos ? { opacity: 1, y: 0, scale: 1 } : {}}
                                transition={{
                                    type: "spring",
                                    stiffness: 380,
                                    damping: 18,
                                    delay: 0.18 + i * 0.12,
                                }}
                            >
                                <img className={styles.logo} src={l.src} alt={l.alt} draggable={false} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );  
}