import miniSquare from "../../../../assets/images/hero/miniSquareBgDeco.svg";
import styles from "./hero.module.css";

const SQUARES = [
  { top: "34%", left: "16%", size: "clamp(18px, 2.2vw, 28px)", rot: "-10deg", delay: "0.0s" },
  { top: "36%", left: "84%", size: "clamp(18px, 2.0vw, 26px)", rot: "12deg", delay: "0.3s" },
  { top: "52%", left: "12%", size: "clamp(20px, 2.5vw, 32px)", rot: "8deg", delay: "0.6s" },
  { top: "56%", left: "88%", size: "clamp(20px, 2.5vw, 32px)", rot: "-6deg", delay: "0.2s" },
  { top: "44%", left: "33%", size: "clamp(18px, 2.0vw, 26px)", rot: "-14deg", delay: "0.5s" },
  { top: "46%", left: "64%", size: "clamp(18px, 2.0vw, 26px)", rot: "16deg", delay: "0.1s" },
  { top: "68%", left: "42%", size: "clamp(18px, 2.2vw, 28px)", rot: "6deg", delay: "0.4s" },
  { top: "70%", left: "58%", size: "clamp(18px, 2.2vw, 28px)", rot: "-8deg", delay: "0.7s" },
];

export default function MiniSquares() {
  return (
    <div className={styles.miniSquaresWrap} aria-hidden="true">
      {SQUARES.map((s, i) => (
        <img
          key={i}
          src={miniSquare}
          alt=""
          className={styles.miniSquare}
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            transform: `translate(-50%, -50%) rotate(${s.rot})`,
            animationDelay: s.delay,
          }}
          draggable="false"
        />
      ))}
    </div>
  );
}
