import styles from "./Home.module.css";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import { useEffect, useRef, useState } from "react";
import { cursorDefault, cursorHomeTitle } from "../store";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Navigation from "../Component/Navigation";

// function useParallax(value, distance) {
//   return useTransform(value, [0, 1], [-distance, distance]);
// }
export default function Home() {
  // To modify redux store by sending action to reducer
  const dispatch = useDispatch();
  // Event handler for cursorStore
  const titleEnter = () => dispatch(cursorHomeTitle());
  const titleLeave = () => dispatch(cursorDefault());

  // ✉️  Please implement scroll animation using "scroll" event
  // Do not using library. Practice useEffect hook or custom hook
  const handleScrollAnimation = (e) => {
    console.log(e);
  };

  useEffect(() => {
    window.addEventListener("scroll", (e) => {
      handleScrollAnimation(e);
    });

    return () => {
      window.removeEventListener("scroll", (e) => {
        handleScrollAnimation(e);
      });
    };
  }, []);

  return (
    <div className={`${styles.wrapper}`}>
      <div className={`${styles.viewportDiv}`}>
        <motion.div className={`${styles.scroller}`}>
          <motion.span
            className={styles.scrollerTitle}
            onMouseEnter={titleEnter}
            onMouseLeave={titleLeave}
            // variants={spanVariant}
            // animate={yPosAnim}
          >
            POST
            <br />
            BLACK
            <br />
            BELT
          </motion.span>
          {/* {["POST", "BLACK", "BELT"].map((word) => (
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
        ))} */}
        </motion.div>
      </div>
      <div className={`${styles.viewportDiv}`}>
        <div className={styles.title}>BJJ</div>
      </div>
    </div>
  );
}
