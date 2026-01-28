import { motion } from "motion/react";
import styles from "./portfolioTitle.module.css";

import titleSvg from "../../assets/images/hero/PorfolioTextTitle.svg";
import selectionSvg from "../../assets/images/hero/BlueSquare-PorfolioTextTitle.svg";

export default function PortfolioTitle() {
    return (
        <motion.div
            className={styles.wrapper}
            initial={{ opacity: 0, y: 10, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <motion.img
                src={titleSvg}
                alt="Portfolio"
                className={styles.title}
                draggable={false}
                animate={{ y: [0, -3, 0], rotate: [0, -0.15, 0] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            /> 
            <motion.img
                src={selectionSvg}
                alt=""
                className={styles.selection}
                draggable={false}
                animate={{
                    opacity: [1, 0.35, 1, 0.6, 1],
                    x: [0, 1, -1, 0],
                    y: [0, -1, 1, 0],
                }}
                transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear",
                }}
            />
        </motion.div>
    );
}
