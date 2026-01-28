import { motion } from "motion/react";
import styles from "./loader.module.css";

export default function Loader() {
    return (
        <motion.div
            className={styles.wrap}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className={styles.text}>Loading...</div>
        </motion.div>
    );
}
