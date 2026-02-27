import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

import styles from "./about.module.css";

import justinPhoto from "../../../../assets/images/aboutMe/justin.pngPhoto.png";
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

  const [showLinks, setShowLinks] = useState(false);

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
          onViewportEnter={() => {
            if (showLinks) return;
            window.setTimeout(() => setShowLinks(true), 220);
          }}

          initial={{ opacity: 0, y: 60, scale: 0.92, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 12,
            mass: 0.65,
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
            {/* LEFT: photo */}
            <div className={styles.left}>
              <div className={styles.photoWrap} aria-hidden="true">
                <img className={styles.photo} src={justinPhoto} alt="" />
              </div>
            </div>

            {/* RIGHT: text */}
            <div className={styles.right}>
              <p className={styles.text}>
                I’m Justin Mora, a Computer Science student focused on web development and Graphic Design. I enjoy creating clean, user-friendly digital experiences using technologies like React, and I’m equally passionate about design—using tools like Figma and Adobe Illustrator for social media visuals, branding, and creative concepts. I blend code with creativity through graphic design and photography, and I’m adaptable, quick to learn, and always looking to grow through new projects and challenges.
              </p>
            </div>

            {/* LINKS - buttons */}
            <div className={styles.links}>
              <motion.a
                className={styles.linkBtn}
                href="https://github.com/JustinMora18"
                aria-label="GitHub"
                style={{ "--icon": `url("${githubLogo}")` }}
                initial={{ opacity: 0, y: 14, scale: 0.9 }}
                animate={showLinks ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ type: "spring", stiffness: 380, damping: 18, delay: 0.18 }}
              >
                <img src={githubLogo} alt="" />
              </motion.a>

              <motion.a
                className={styles.linkBtn}
                href="https://www.linkedin.com/in/morajustin/"
                aria-label="LinkedIn"
                style={{ "--icon": `url("${linkedinLogo}")` }}
                initial={{ opacity: 0, y: 14, scale: 0.9 }}
                animate={showLinks ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ type: "spring", stiffness: 380, damping: 18, delay: 0.30 }}
              >
                <img src={linkedinLogo} alt="" />
              </motion.a>

              <motion.a
                className={styles.linkBtn}
                href="#"
                aria-label="Download CV"
                style={{ "--icon": `url("${cvLogo}")` }}
                initial={{ opacity: 0, y: 14, scale: 0.9 }}
                animate={showLinks ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ type: "spring", stiffness: 380, damping: 18, delay: 0.42 }}
              >
                <img src={cvLogo} alt="" />
              </motion.a>
            </div>
          </div>

          <div className={styles.blueOverlay} aria-hidden="true" />
          <div className={styles.windowVignette} aria-hidden="true" />
        </motion.div>
      </div>
    </section>
  );
}