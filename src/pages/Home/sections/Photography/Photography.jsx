import { useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import styles from "./photography.module.css";

import photographyBackground from "../../../../assets/images/photography/photographyBackground.png";

import sessionOneCover from "../../../../assets/images/photography/photographyCovers/sessionOne_cover.png";
import sessionTwoCover from "../../../../assets/images/photography/photographyCovers/sessionTwo_cover.png";
import sessionThreeCover from "../../../../assets/images/photography/photographyCovers/sessionThree_cover.png";
import sessionFourCover from "../../../../assets/images/photography/photographyCovers/sessionFour_cover.png";
import sessionFiveCover from "../../../../assets/images/photography/photographyCovers/sessionFive_cover.png";
import sessionSixCover from "../../../../assets/images/photography/photographyCovers/sessionSix_cover.png";

import ProjectModal from "../../../../components/ProjectModal/ProjectModal";

import sessionOne1 from "../../../../assets/images/photography/photographyProjects/sessionOne/sessionOne_img1.png";
import sessionOne2 from "../../../../assets/images/photography/photographyProjects/sessionOne/sessionOne_img2.png";
import sessionOne3 from "../../../../assets/images/photography/photographyProjects/sessionOne/sessionOne_img3.png";
import sessionOne4 from "../../../../assets/images/photography/photographyProjects/sessionOne/sessionOne_img4.png";
import sessionOne5 from "../../../../assets/images/photography/photographyProjects/sessionOne/sessionOne_img5.png";

import sessionTwo1 from "../../../../assets/images/photography/photographyProjects/sessionTwo/sessionTwo_img1.png";
import sessionTwo2 from "../../../../assets/images/photography/photographyProjects/sessionTwo/sessionTwo_img2.png";
import sessionTwo3 from "../../../../assets/images/photography/photographyProjects/sessionTwo/sessionTwo_img3.png";
import sessionTwo4 from "../../../../assets/images/photography/photographyProjects/sessionTwo/sessionTwo_img4.png";
import sessionTwo5 from "../../../../assets/images/photography/photographyProjects/sessionTwo/sessionTwo_img5.png";

import sessionThree1 from "../../../../assets/images/photography/photographyProjects/sessionThree/sessionThree_img1.png";
import sessionThree2 from "../../../../assets/images/photography/photographyProjects/sessionThree/sessionThree_img2.png";
import sessionThree3 from "../../../../assets/images/photography/photographyProjects/sessionThree/sessionThree_img3.png";
import sessionThree4 from "../../../../assets/images/photography/photographyProjects/sessionThree/sessionThree_img4.png";
import sessionThree5 from "../../../../assets/images/photography/photographyProjects/sessionThree/sessionThree_img5.png";

import sessionFour1 from "../../../../assets/images/photography/photographyProjects/sessionFour/sessionFour_img1.png";
import sessionFour2 from "../../../../assets/images/photography/photographyProjects/sessionFour/sessionFour_img2.png";
import sessionFour3 from "../../../../assets/images/photography/photographyProjects/sessionFour/sessionFour_img3.png";
import sessionFour4 from "../../../../assets/images/photography/photographyProjects/sessionFour/sessionFour_img4.png";

import sessionFive1 from "../../../../assets/images/photography/photographyProjects/sessionFive/sessionFive_img1.png";
import sessionFive2 from "../../../../assets/images/photography/photographyProjects/sessionFive/sessionFive_img2.png";
import sessionFive3 from "../../../../assets/images/photography/photographyProjects/sessionFive/sessionFive_img3.png";
import sessionFive4 from "../../../../assets/images/photography/photographyProjects/sessionFive/sessionFive_img4.png";
import sessionFive5 from "../../../../assets/images/photography/photographyProjects/sessionFive/sessionFive_img5.png";

import sessionSix1 from "../../../../assets/images/photography/photographyProjects/sessionSix/sessionSix_img1.png";
import sessionSix2 from "../../../../assets/images/photography/photographyProjects/sessionSix/sessionSix_img2.png";
import sessionSix3 from "../../../../assets/images/photography/photographyProjects/sessionSix/sessionSix_img3.png";
import sessionSix4 from "../../../../assets/images/photography/photographyProjects/sessionSix/sessionSix_img4.png";
import sessionSix5 from "../../../../assets/images/photography/photographyProjects/sessionSix/sessionSix_img5.png";
import sessionSix6 from "../../../../assets/images/photography/photographyProjects/sessionSix/sessionSix_img6.png";
import sessionSix7 from "../../../../assets/images/photography/photographyProjects/sessionSix/sessionSix_img7.png";

export default function Photography() {
  const sectionRef = useRef(null);
  const [openId, setOpenId] = useState(null);

  const isCoarse =
    typeof window !== "undefined" &&
    window.matchMedia?.("(pointer: coarse)").matches;

  const projects = useMemo(
    () => ({
      sessionOne: {
        title: "Session One",
        images: [sessionOne1, sessionOne2, sessionOne3, sessionOne4, sessionOne5],
      },
      sessionTwo: {
        title: "Session Two",
        images: [sessionTwo1, sessionTwo2, sessionTwo3, sessionTwo4, sessionTwo5],
      },
      sessionThree: {
        title: "Session Three",
        images: [sessionThree1, sessionThree2, sessionThree3, sessionThree4, sessionThree5],
      },
      sessionFour: {
        title: "Session Four",
        images: [sessionFour1, sessionFour2, sessionFour3, sessionFour4],
      },
      sessionFive: {
        title: "Session Five",
        images: [sessionFive1, sessionFive2, sessionFive3, sessionFive4, sessionFive5],
      },
      sessionSix: {
        title: "Session Six",
        images: [sessionSix1, sessionSix2, sessionSix3, sessionSix4, sessionSix5, sessionSix6, sessionSix7],
      },
    }),
    []
  );

  const cards = useMemo(
    () => [
      { id: "sessionOne", cover: sessionOneCover, className: styles.cardTL, alt: "Session one cover" },
      { id: "sessionTwo", cover: sessionTwoCover, className: styles.cardC1, alt: "Session two cover" },
      { id: "sessionThree", cover: sessionThreeCover, className: styles.cardTR, alt: "Session three cover" },
      { id: "sessionFour", cover: sessionFourCover, className: styles.cardBL, alt: "Session four cover" },
      { id: "sessionFive", cover: sessionFiveCover, className: styles.cardC2, alt: "Session five cover" },
      { id: "sessionSix", cover: sessionSixCover, className: styles.cardBR, alt: "Session six cover" },
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
      id="photography"
      className={styles.photography}
      style={{ backgroundImage: `url(${photographyBackground})` }}
    >
      <div className={styles.inner}>
        <h2 className={styles.title}>PHOTOGRAPHY</h2>

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

        <p className={styles.desc}>Some Photos I&apos;ve took.</p>
      </div>

      <ProjectModal
        open={!!active}
        onClose={() => setOpenId(null)}
        title={active?.title}
        description={active?.description}
        images={active?.images}
        showTags={false}
        autoSlideMs={2600}
      />
    </section>
  );
}