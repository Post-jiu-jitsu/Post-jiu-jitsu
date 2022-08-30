import styles from "./Home.module.css";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import { useRef } from "react";
import { cursorDefault, cursorHomeTitle } from "../store";
import { useDispatch } from "react-redux";

// function useParallax(value, distance) {
//   return useTransform(value, [0, 1], [-distance, distance]);
// }
export default function Home() {
  // To modify redux store by sending action to reducer
  const dispatch = useDispatch();
  // Event handler for cursorStore
  const titleEnter = () => dispatch(cursorHomeTitle());
  const titleLeave = () => dispatch(cursorDefault());

  // const { scrollYProgress } = useScroll();
  // const ref = useRef(null);
  // const scale = useTransform(scrollYProgress, [0, 1], [1, 3]);
  // const { scrollYProgress } = useScroll({ target: ref });
  // const y = useParallax(scrollYProgress, 300);
  return (
    <div className={`${styles.wrapper}`}>
      <motion.div className={`${styles.titleWrapper}`}>
        {["POST", "BLACK", "BELT"].map((word) => (
          <motion.div
            key={word}
            className={styles.title}
            onMouseEnter={titleEnter}
            onMouseLeave={titleLeave}
            style={{}}
            // drag="x"
            // dragSnapToOrigin
          >
            {word}
          </motion.div>
        ))}
      </motion.div>
      <div className={`${styles.viewportDiv}`}>
        <div
          className={styles.title}
          onMouseEnter={titleEnter}
          onMouseLeave={titleLeave}
        >
          BJJ
        </div>
      </div>
    </div>
  );
}
