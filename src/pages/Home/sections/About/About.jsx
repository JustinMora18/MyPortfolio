import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import styles from "./about.module.css";

import githubLogo from "../../../../assets/images/aboutMe/GithubLogo.svg";
import linkedinLogo from "../../../../assets/images/aboutMe/LinkedinLogo.svg";
import cvLogo from "../../../../assets/images/aboutMe/CVFileLogo.svg";
import SideVignette from "../../../../components/SideVignette/SideVignette";

export default function About() {
  const wrapRef = useRef(null);

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);

  const sx = useSpring(mvX, { stiffness: 240, damping: 18, mass: 0.4 });
  const sy = useSpring(mvY, { stiffness: 240, damping: 18, mass: 0.4 });

  const rotateY = useTransform(sx, [-0.5, 0.5], ["-22deg", "22deg"]);
  const rotateX = useTransform(sy, [-0.5, 0.5], ["18deg", "-18deg"]);

  const translateY = useTransform(sy, [-0.5, 0.5], ["-6px", "6px"]);
  const translateX = useTransform(sx, [-0.5, 0.5], ["-6px", "6px"]);

  const onMove = (e) => {
    const el = wrapRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;

    mvX.set(px - 0.5);
    mvY.set(py - 0.5);
  };

  const onLeave = () => {
    mvX.set(0);
    mvY.set(0);
  };

  return (
    <section className={styles.about} id="about">
      <SideVignette className={styles.sideVignette} />

      <div className={styles.bottomFade} aria-hidden="true" />

      <div className={styles.inner}>
        <motion.div
          ref={wrapRef}
          className={styles.window}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          style={{
            rotateX,
            rotateY,
            x: translateX,
            y: translateY,
          }}
        >
          <div className={styles.windowTop}>
            <div className={styles.dots} aria-hidden="true">
              <span className={styles.dotRed} />
              <span className={styles.dotYellow} />
              <span className={styles.dotGreen} />
            </div>

            <p className={styles.windowTitle}>About me</p>
            <span className={styles.windowTitleSpacer} aria-hidden="true" />
          </div>

          <div className={styles.windowBody}>
            <div className={styles.left}>
              <div className={styles.photoFrame} />
            </div>

            <div className={styles.right}>
              <p className={styles.text}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisque
                faucibus ex sapien vitae pellentesque sem placerat. In id cursus
                mi pretium tellus duis convallis. Tempus leo eu aenean sed diam
                urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum
                egestas.
              </p>
            </div>
          </div>

          <div className={styles.links}>
            <a className={styles.linkBtn} href="#" aria-label="GitHub">
              <img src={githubLogo} alt="" />
            </a>

            <a className={styles.linkBtn} href="#" aria-label="LinkedIn">
              <img src={linkedinLogo} alt="" />
            </a>

            <a className={styles.linkBtn} href="#" aria-label="Download CV">
              <img src={cvLogo} alt="" />
            </a>
          </div>

          <div className={styles.windowVignette} aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}
