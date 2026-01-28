import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import Loader from "./components/Loader/Loader";
import Home from "./pages/Home/Home";
import styles from "./app.module.css";

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={styles.page}>
      <AnimatePresence mode="wait">
        {loading ? <Loader key="loader" /> : <Home key="home" />}
      </AnimatePresence>
    </div>
  );
}
