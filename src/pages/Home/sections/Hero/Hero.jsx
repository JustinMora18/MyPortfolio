import { useMemo, useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import styles from "./hero.module.css";

import folderBlue from "../../../../assets/images/hero/foldersBgDeco/folderBlue.png";
import folderCyan from "../../../../assets/images/hero/foldersBgDeco/folderCyan.png";
import folderGreen from "../../../../assets/images/hero/foldersBgDeco/folderGreen.png";
import folderGrey from "../../../../assets/images/hero/foldersBgDeco/folderGrey.png";
import folderOrange from "../../../../assets/images/hero/foldersBgDeco/folderOrange.png";
import folderPink from "../../../../assets/images/hero/foldersBgDeco/folderPink.png";

import MiniSquares from "./MiniSquares";
import PortfolioTitle from "../../../../components/PortfolioTitle/PortfolioTitle";
import SideVignette from "../../../../components/SideVignette/SideVignette";

export default function Hero() {
  const heroRef = useRef(null);

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);

  const sx = useSpring(mvX, { stiffness: 140, damping: 16, mass: 0.25 });
  const sy = useSpring(mvY, { stiffness: 140, damping: 16, mass: 0.25 });

  const mx = useTransform(sx, (v) => `${v * 28}px`);
  const my = useTransform(sy, (v) => `${v * 28}px`);

  const folders = useMemo(
    () => [
      { src: folderBlue, className: styles.folderBlue },
      { src: folderCyan, className: styles.folderCyan },
      { src: folderOrange, className: styles.folderOrange },
      { src: folderGreen, className: styles.folderGreen },
      { src: folderGrey, className: styles.folderGrey },
      { src: folderPink, className: styles.folderPink },
    ],
    []
  );

  const onMove = (e) => {
    const el = heroRef.current;
    if (!el) return;

    if (window.matchMedia?.("(pointer: coarse)").matches) return;

    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    mvX.set((px - 0.5) * 2);
    mvY.set((py - 0.5) * 2);
  };

  const onLeave = () => {
    mvX.set(0);
    mvY.set(0);
  };

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const handleTouchStart = () => {
      mvX.set(0);
      mvY.set(0);
    };

    el.addEventListener("touchstart", handleTouchStart, { passive: true });
    return () => el.removeEventListener("touchstart", handleTouchStart);
  }, [mvX, mvY]);

  return (
    <motion.section
      ref={heroRef}
      className={styles.hero}
      style={{ "--mx": mx, "--my": my }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      <div className={styles.topLeft}>JM</div>
      <div className={styles.topRight}>Portfolio</div>

      <MiniSquares />

      <div className={styles.foldersLayer} aria-hidden="true">
        {folders.map((f, i) => (
          <img
            key={i}
            src={f.src}
            alt=""
            className={`${styles.folder} ${f.className}`}
            draggable={false}
          />
        ))}
      </div>

      <div className={styles.content}>
        <motion.p
          className={styles.smallTitle}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          JUSTIN&apos;S
        </motion.p>

        <motion.div
          className={styles.portfolioWrap}
          initial={{ opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.18 }}
        >
          <PortfolioTitle />
        </motion.div>

        <motion.p
          className={styles.year}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
        >
          2025-2026
        </motion.p>
      </div>

      <SideVignette />
    </motion.section>
  );
}