import styles from "./sectionSpikes.module.css";
import spikeLeft from "../../assets/images/aboutMe/SpikeLeft.png";
import spikeRight from "../../assets/images/aboutMe/SpikeRight.png";

export default function SectionSpikes({ className = "" }) {
  return (
    <div className={`${styles.wrap} ${className}`} aria-hidden="true">
      <img className={styles.left} src={spikeLeft} alt="" draggable={false} />
      <img className={styles.right} src={spikeRight} alt="" draggable={false} />
    </div>
  );
}