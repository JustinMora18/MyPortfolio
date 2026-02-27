import styles from "./Footer.module.css";

import footerBackground from "../../../../assets/images/footer/footerBackground.png";
import GithubLogo from "../../../../assets/images/aboutMe/GithubLogo.svg";
import LinkedinLogo from "../../../../assets/images/aboutMe/LinkedinLogo.svg";

export default function Footer() {
  return (
    <footer
      className={styles.footer}
      style={{ backgroundImage: `url(${footerBackground})` }}
    >
      <div className={styles.inner}>
        {/* LEFT */}
        <div className={styles.brand}>
          <h3 className={styles.name}>
            Justin
            <br />
            Mora
          </h3>

          <div className={styles.rule} />

          <div className={styles.sub}>Portfolio</div>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>
          <nav className={styles.nav} aria-label="Footer navigation">
            <a className={styles.link} href="#home">Home</a>
            <a className={styles.link} href="#about">About Me</a>
            <a className={styles.link} href="#web">Web</a>
            <a className={styles.link} href="#designs">Designs</a>
            <a className={styles.link} href="#photography">Photography</a>
            <a className={styles.link} href="#questions">Questions?</a>
            <a className={styles.link} href="#contact">Contact Me</a>
          </nav>

          <div className={styles.socials} aria-label="Social links">
            <a
              className={styles.iconBtn}
              href="https://github.com/JustinMora18"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              title="GitHub"
            >
              <img className={styles.icon} src={GithubLogo} alt="" />
            </a>

            <a
              className={styles.iconBtn}
              href="https://www.linkedin.com/in/morajustin/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <img className={styles.icon} src={LinkedinLogo} alt="" />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Justin Mora</span>
      </div>
    </footer>
  );
}