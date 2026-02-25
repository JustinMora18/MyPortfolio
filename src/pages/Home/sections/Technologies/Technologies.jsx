import styles from "./technologies.module.css";

import javaLogo from "../../../../assets/images/techLogos/java_logo.png";
import cssLogo from "../../../../assets/images/techLogos/css_logo.png";
import htmlLogo from "../../../../assets/images/techLogos/html_logo.png";
import githubLogo from "../../../../assets/images/techLogos/github_logo.png";
import reactLogo from "../../../../assets/images/techLogos/react_logo.png";
import photoshopLogo from "../../../../assets/images/techLogos/photoshop_logo.png";
import illustratorLogo from "../../../../assets/images/techLogos/ilustrator_logo.png";
import procreateLogo from "../../../../assets/images/techLogos/porcreate_logo.png";
import figmaLogo from "../../../../assets/images/techLogos/figma_logo.png";

const TECH = [
    { name: "Java", src: javaLogo },
    { name: "CSS", src: cssLogo },
    { name: "HTML", src: htmlLogo },
    { name: "GitHub", src: githubLogo },
    { name: "React", src: reactLogo },
    { name: "Photoshop", src: photoshopLogo },
    { name: "Illustrator", src: illustratorLogo },
    { name: "Procreate", src: procreateLogo },
    { name: "Figma", src: figmaLogo },
];

export default function Technologies() {
    return (
        <section className={styles.tech} id="technologies" aria-labelledby="technologies-title">
            <div className={styles.inner}>
                <div className={styles.stack}>
                    <p id="technologies-title" className={styles.title}>
                        TECHNOLOGIES
                    </p>

                    <div className={styles.row} role="list" aria-label="Technologies">
                        {TECH.map((t) => (
                            <div
                                key={t.name}
                                className={styles.card}
                                role="listitem"
                                title={t.name}
                            >
                                <img
                                    className={styles.logo}
                                    src={t.src}
                                    alt={t.name}
                                    draggable={false}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}