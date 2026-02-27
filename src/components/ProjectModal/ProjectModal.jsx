import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./ProjectModal.module.css";

const TAG_DOT = {
    Figma: "#ff3b30",
    Illustrator: "#ff7a18",
    React: "#2ee7ff",
    HTML: "#ffb35c",
    CSS: "#ffd36a",
    JS: "#ffd36a",
    JavaScript: "#ffd36a",
};

export default function ProjectModal({
    open,
    onClose,
    title,
    description,
    tags = [],
    images = [],
    autoSlideMs = 2600,
    showTags = true,
}) {
    const hasImages = images?.length > 0;
    const isSlideshow = images?.length > 1;

    const [idx, setIdx] = useState(0);

    useEffect(() => {
        if (!open) return;
        setIdx(0);
    }, [open, title]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === "Escape") onClose?.();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    useEffect(() => {
        if (!open) return;
        if (!isSlideshow) return;

        const t = window.setInterval(() => {
            setIdx((v) => (v + 1) % images.length);
        }, autoSlideMs);

        return () => window.clearInterval(t);
    }, [open, isSlideshow, images, autoSlideMs]);

    const currentSrc = useMemo(() => {
        if (!hasImages) return "";
        return images[Math.min(idx, images.length - 1)];
    }, [hasImages, images, idx]);

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className={styles.overlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onWheel={(e) => e.preventDefault()}
                    onTouchMove={(e) => e.preventDefault()}
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget) onClose?.();
                    }}
                >
                    <motion.div
                        className={styles.window}
                        role="dialog"
                        aria-modal="true"
                        aria-label={title || "Project details"}
                        initial={{ opacity: 0, y: 18, scale: 0.98, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 12, scale: 0.98, filter: "blur(10px)" }}
                        transition={{ type: "spring", stiffness: 260, damping: 22, mass: 0.7 }}
                        onMouseDown={(e) => e.stopPropagation()}
                    >
                        <div className={styles.topBar}>
                            <button
                                type="button"
                                className={styles.closeDot}
                                aria-label="Close modal"
                                onClick={onClose}
                            />
                            <div className={styles.topTitle}>{title}</div>
                            <div className={styles.topSpacer} />
                        </div>

                        <div className={styles.body}>
                            <div className={styles.media}>
                                {hasImages ? (
                                    <AnimatePresence mode="wait">
                                        <motion.img
                                            key={currentSrc}
                                            className={styles.heroImg}
                                            src={currentSrc}
                                            alt=""
                                            draggable={false}
                                            initial={{ opacity: 0, scale: 0.995 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.995 }}
                                            transition={{ duration: 0.25 }}
                                        />
                                    </AnimatePresence>
                                ) : (
                                    <div className={styles.mediaEmpty} />
                                )}
                            </div>
                            
                            <p className={styles.desc}>{description}</p>
                            
                            {showTags && tags.length > 0 && (
                                <div className={styles.tags} aria-label="Technologies used">
                                    {tags.map((t) => (
                                        <span key={t} className={styles.tag}>
                                            <span
                                                className={styles.tagDot}
                                                style={{
                                                    background: TAG_DOT[t] || "rgba(255,255,255,0.55)",
                                                }}
                                                aria-hidden="true"
                                            />
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}  
        </AnimatePresence>
    );
}