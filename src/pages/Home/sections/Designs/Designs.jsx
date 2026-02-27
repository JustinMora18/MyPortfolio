import { useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import styles from "./designs.module.css";

import designBackground from "../../../../assets/images/design/designBackground.png";

import asecuCover from "../../../../assets/images/design/designCovers/ASECU_cover.png";
import booksCover from "../../../../assets/images/design/designCovers/books_cover.png";
import brandingCover from "../../../../assets/images/design/designCovers/branding_cover.png";
import llcCover from "../../../../assets/images/design/designCovers/LLC__cover.png";
import printedCover from "../../../../assets/images/design/designCovers/printed_cover.png";
import randomCover from "../../../../assets/images/design/designCovers/random_cover.png";

import ProjectModal from "../../../../components/ProjectModal/ProjectModal";

import asecu1 from "../../../../assets/images/design/designProjects/ASECU/ASECU_img1.png";
import asecu2 from "../../../../assets/images/design/designProjects/ASECU/ASECU_img2.png";
import asecu3 from "../../../../assets/images/design/designProjects/ASECU/ASECU_img3.png";
import asecu4 from "../../../../assets/images/design/designProjects/ASECU/ASECU_img4.png";
import asecu5 from "../../../../assets/images/design/designProjects/ASECU/ASECU_img5.png";
import asecu6 from "../../../../assets/images/design/designProjects/ASECU/ASECU_img6.png";
import asecu7 from "../../../../assets/images/design/designProjects/ASECU/ASECU_img7.png";

import books1 from "../../../../assets/images/design/designProjects/books/books_img1.png";
import books2 from "../../../../assets/images/design/designProjects/books/books_img2.png";

import branding1 from "../../../../assets/images/design/designProjects/branding/branding_img1.png";
import branding2 from "../../../../assets/images/design/designProjects/branding/branding_img2.png";

import llc1 from "../../../../assets/images/design/designProjects/LLC/LLC_img1.png";
import llc2 from "../../../../assets/images/design/designProjects/LLC/LLC_img2.png";
import llc3 from "../../../../assets/images/design/designProjects/LLC/LLC_img3.png";
import llc4 from "../../../../assets/images/design/designProjects/LLC/LLC_img4.png";
import llc5 from "../../../../assets/images/design/designProjects/LLC/LLC_img5.png";

import printed1 from "../../../../assets/images/design/designProjects/printed/printed_img1.png";
import printed2 from "../../../../assets/images/design/designProjects/printed/printed_img2.png";

import random1 from "../../../../assets/images/design/designProjects/random/random_img1.png";
import random2 from "../../../../assets/images/design/designProjects/random/random_img2.png";
import random3 from "../../../../assets/images/design/designProjects/random/random_img3.png";
import random4 from "../../../../assets/images/design/designProjects/random/random_img4.png";
import random5 from "../../../../assets/images/design/designProjects/random/random_img5.png";

export default function Designs() {
    const sectionRef = useRef(null);
    const [openId, setOpenId] = useState(null);

    const isCoarse =
        typeof window !== "undefined" &&
        window.matchMedia?.("(pointer: coarse)").matches;

    const projects = useMemo(
        () => ({
            asecu: {
                title: "ASECU Design Work",
                description:
                    "A collection of ASECU design pieces focused on branding, layouts, and event visuals. (Temp — replace later.)",
                tags: ["Illustrator", "Photoshop", "Figma"],
                images: [asecu1, asecu2, asecu3, asecu4, asecu5, asecu6, asecu7],
            },
            books: {
                title: "Books Design",
                description:
                    "Book-themed design studies with clean composition and typography. (Temp — replace later.)",
                tags: ["Procreate", "Photoshop"],
                images: [books1, books2],
            },
            branding: {
                title: "Branding Concepts",
                description:
                    "Branding explorations: identity, color, and consistent visual language. (Temp — replace later.)",
                tags: ["Illustrator"],
                images: [branding1, branding2],
            },
            llc: {
                title: "LLC Visual System",
                description:
                    "Visual system and brand materials created for an LLC concept. (Temp — replace later.)",
                tags: ["Illustrator", "Photoshop", "Procreate"],
                images: [llc1, llc2, llc3, llc4, llc5],
            },
            printed: {
                title: "Printed Designs",
                description:
                    "Print-ready designs focused on layout, spacing, and production-safe assets. (Temp — replace later.)",
                tags: ["Illustrator"],
                images: [printed1, printed2],
            },
            random: {
                title: "Random Designs",
                description:
                    "A mixed set of design experiments and quick creative explorations. (Temp — replace later.)",
                tags: ["Illustrator", "Photoshop", "Procreate"],
                images: [random1, random2, random3, random4, random5],
            },
        }),
        []
    );

    const cards = useMemo(
        () => [
            { id: "asecu", cover: asecuCover, className: styles.cardTL, alt: "ASECU design" },
            { id: "books", cover: booksCover, className: styles.cardC1, alt: "Books design" },
            { id: "branding", cover: brandingCover, className: styles.cardTR, alt: "Branding design" },
            { id: "llc", cover: llcCover, className: styles.cardBL, alt: "LLC design" },
            { id: "printed", cover: printedCover, className: styles.cardC2, alt: "Printed design" },
            { id: "random", cover: randomCover, className: styles.cardBR, alt: "Random design" },
        ],
        []
    );

    const active = openId ? projects[openId] : null;
    const modalOpen = !!active;

    const appear = {
        hidden: { opacity: 0, y: 10, scale: 0.98, filter: "blur(10px)" },
        show: (i = 0) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                stiffness: 260,
                damping: 18,
                mass: 0.6,
                delay: 0.08 + i * 0.08,
            },
        }),
    };

    const openModal = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        setOpenId(id);
    };

    return (
        <section
            ref={sectionRef}
            id="designs"
            className={styles.designs}
            style={{ backgroundImage: `url(${designBackground})` }}
        >
            <div className={styles.inner}>
                <h2 className={styles.title}>DESIGNS</h2>

                <div className={styles.stage} style={{ pointerEvents: modalOpen ? "none" : "auto" }}>
                    {cards.map((c, i) => (
                        <div key={c.id} className={`${styles.card} ${c.className}`}>
                            <motion.div
                                className={styles.dragLayer}
                                variants={appear}
                                custom={i}
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: true, amount: 0.35 }}
                                drag={!isCoarse && !modalOpen}
                                dragListener={!isCoarse && !modalOpen}
                                dragConstraints={sectionRef}
                                dragElastic={0.35}
                                dragMomentum={false}
                                whileTap={!isCoarse && !modalOpen ? { scale: 0.98 } : undefined}
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                }}
                                onDoubleClick={(e) => {
                                    if (isCoarse) return;
                                    openModal(e, c.id);
                                }}
                                onClick={(e) => {
                                    if (!isCoarse) return;
                                    openModal(e, c.id);
                                }}
                            >
                                <img className={styles.thumb} src={c.cover} alt={c.alt} draggable={false} />
                            </motion.div>
                        </div>
                    ))}
                </div>

                <p className={styles.desc}>Some design work I&apos;ve done.</p>
            </div>

            <ProjectModal
                open={!!active}
                onClose={() => setOpenId(null)}
                title={active?.title}
                description={active?.description}
                tags={active?.tags}
                images={active?.images}
                showTags
                autoSlideMs={2600}
            />
        </section>
    );
}