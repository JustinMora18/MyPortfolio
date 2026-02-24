import Hero from "./sections/Hero/Hero";
import About from "./sections/About/About";
import SectionSpikes from "../../components/SectionSpikes/SectionSpikes";
import styles from "./home.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <section id="home" className={styles.heroWrap}>
        <Hero />
      </section>

      <div className={styles.seam} aria-hidden="true">
        <SectionSpikes className={styles.spikes} />
      </div>

      <section id="about" className={styles.aboutWrap}>
        <About />
      </section>
    </main>
  );
}