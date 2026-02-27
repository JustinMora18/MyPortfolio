import Hero from "./sections/Hero/Hero";
import About from "./sections/About/About";
import Technologies from "./sections/Technologies/Technologies";
import SectionSpikes from "../../components/SectionSpikes/SectionSpikes";
import MarqueeBanners from "../../components/MarqueeBanners/MarqueeBanners";
import GlobalNav from "../../components/GlobalNav/GlobalNav";
import Web from "./sections/Web/Web";
import Designs from "./sections/Designs/Designs";


import styles from "./home.module.css";

export default function Home() {
  return (
    <main className={styles.page}>
      <GlobalNav />
      <section id="home" className={styles.heroWrap}>
        <Hero />
      </section>

      <div className={styles.seam} aria-hidden="true">
        <SectionSpikes className={styles.spikes} />
      </div>

      <section id="about" className={styles.aboutWrap}>
        <About />
      </section>

      <Technologies />
      <MarqueeBanners />
      <Web />
      <Designs />
    </main>
  );
}