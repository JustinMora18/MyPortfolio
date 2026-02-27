import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./web.module.css";

import webBackground from "../../../../assets/images/web/webBackgrond.png";

import flashcardsCover from "../../../../assets/images/web/FalshcardsPage.png";
import calculatorCover from "../../../../assets/images/web/MycalculatorPage.jpg";
import neonCover from "../../../../assets/images/web/NeonConceptPage.png";
import photoPortCover from "../../../../assets/images/web/PhotographerPortfolio.png";
import promodoneCover from "../../../../assets/images/web/PromodonePage.png";
import linktreeCover from "../../../../assets/images/web/linktreePage.png";

import ProjectModal from "../../../../components/ProjectModal/ProjectModal";

import calc1 from "../../../../assets/images/web/projects/calculator/Calculator_img1.png";
import calc2 from "../../../../assets/images/web/projects/calculator/Calculator_img2.png";
import calc3 from "../../../../assets/images/web/projects/calculator/Calculator_img3.png";

import flash1 from "../../../../assets/images/web/projects/flashcards/FlashCards_img1.png";
import flash2 from "../../../../assets/images/web/projects/flashcards/FlashCards_img2.png";
import flash3 from "../../../../assets/images/web/projects/flashcards/FlashCards_img3.png";

import link1 from "../../../../assets/images/web/projects/linktree/Linktree_img1.png";

import neon1 from "../../../../assets/images/web/projects/neonConceptPg/neon_img1.png";

import ph1 from "../../../../assets/images/web/projects/phPortfolio/PhPortfolio_img1.png";
import ph2 from "../../../../assets/images/web/projects/phPortfolio/PhPortfolio_img2.png";
import ph3 from "../../../../assets/images/web/projects/phPortfolio/PhPortfolio_img3.png";
import ph4 from "../../../../assets/images/web/projects/phPortfolio/PhPortfolio_img4.png";
import ph5 from "../../../../assets/images/web/projects/phPortfolio/PhPortfolio_img5.png";

import pro1 from "../../../../assets/images/web/projects/promodone/Promodone_img1.png";
import pro2 from "../../../../assets/images/web/projects/promodone/Promodone_img2.png";
import pro3 from "../../../../assets/images/web/projects/promodone/Promodone_img3.png";

export default function Web() {
  const sectionRef = useRef(null);
  const [openId, setOpenId] = useState(null);

  const isCoarse =
    typeof window !== "undefined" &&
    window.matchMedia?.("(pointer: coarse)").matches;

  const [showToast, setShowToast] = useState(false);
  const toastShownRef = useRef(false);
  const toastTimerRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (toastShownRef.current) return;

        toastShownRef.current = true;
        setShowToast(true);

        toastTimerRef.current = window.setTimeout(() => {
          setShowToast(false);
        }, 5200);
      },
      { threshold: 0.35 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    };
  }, []);

  const projects = useMemo(
    () => ({
      calc: {
        title: "Basic Calculator",
        description:
          "A simple calculator UI concept with core interactions and clean layout.",
        tags: ["Figma", "JS", "HTML", "CSS"],
        images: [calc1, calc2, calc3],
      },
      flash: {
        title: "Ultimate Computer Science Flashcards",
        description:
          "Flashcards experience designed to practice CS fundamentals with a clean, playful UI.",
        tags: ["Figma", "React", "JS", "HTML", "CSS"],
        images: [flash1, flash2, flash3],
      },
      linktree: {
        title: "ASECU Linktree Design",
        description:
          "Linktree design concept for ASECU, focused on quick access and strong branding.",
        tags: ["Figma", "Illustrator"],
        images: [link1],
      },
      neon: {
        title: "Neon Concept",
        description:
          "A neon-themed concept landing page experiment focused on layout and visual hierarchy.",
        tags: ["HTML", "CSS", "JavaScript"],
        images: [neon1],
      },
      photo: {
        title: "Photographer’s Portfolio",
        description:
          "Portfolio concept for a photographer with emphasis on galleries, rhythm, and contrast.",
        tags: ["Figma", "React", "HTML", "CSS"],
        images: [ph1, ph2, ph3, ph4, ph5],
      },
      promo: {
        title: "PROMODONE - Focus Timer",
        description:
          "A focus timer concept inspired by Pomodoro workflows and customizable themes.",
        tags: ["Figma", "JS", "HTML", "CSS"],
        images: [pro1, pro2, pro3],
      },
    }),
    []
  );

  const cards = useMemo(
    () => [
      { id: "calc", cover: calculatorCover, className: styles.cardTL, alt: "Calculator" },
      { id: "flash", cover: flashcardsCover, className: styles.cardC1, alt: "Flashcards" },
      { id: "promo", cover: promodoneCover, className: styles.cardTR, alt: "Promodone" },
      { id: "neon", cover: neonCover, className: styles.cardBL, alt: "Neon concept" },
      { id: "linktree", cover: linktreeCover, className: styles.cardC2, alt: "Linktree" },
      { id: "photo", cover: photoPortCover, className: styles.cardBR, alt: "Photography portfolio" },
    ],
    []
  );

  const active = openId ? projects[openId] : null;
  const modalOpen = !!active;

  useEffect(() => {
    if (!modalOpen) return;
    setShowToast(false);
    if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
  }, [modalOpen]);

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
      id="web"
      className={styles.web}
      style={{ backgroundImage: `url(${webBackground})` }}
    >
      <div className={styles.inner}>
        <h2 className={styles.title}>WEB</h2>

        <div
          className={styles.stage}
          style={{ pointerEvents: modalOpen ? "none" : "auto" }}
        >
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
                <img
                  className={styles.thumb}
                  src={c.cover}
                  alt={c.alt}
                  draggable={false}
                />
              </motion.div>
            </div>
          ))}
        </div>

        <p className={styles.desc}>Some Projects i&apos;ve made.</p>
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

      <AnimatePresence>
        {showToast && !modalOpen && (
          <motion.div
            className={styles.toast}
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 14, scale: 0.98, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 10, scale: 0.985, filter: "blur(10px)" }}
            transition={{ type: "spring", stiffness: 260, damping: 20, mass: 0.6 }}
          >
            <div className={styles.toastInner}>
              <div className={styles.toastTitle}>Tip</div>
              <div className={styles.toastText}>
                {isCoarse ? "Tap a card to open." : "Drag cards · Double-click to open."}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}