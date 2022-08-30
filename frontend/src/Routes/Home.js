import styles from "./Home.module.css";
import { motion } from "framer-motion";

import { useEffect, useState } from "react";
import { cursorDefault, cursorHomeTech, cursorHomeTitle } from "../store";
import { useDispatch } from "react-redux";

export default function Home() {
  // To modify redux store by sending action to reducer
  const dispatch = useDispatch();
  // Event handler for cursorStore
  const titleEnter = () => dispatch(cursorHomeTitle());
  const titleLeave = () => dispatch(cursorDefault());

  // ✉️  Please implement scroll animation using "scroll" event
  // Do not using library. Practice useEffect hook or custom hook
  const handleScrollAnimation = (e) => {
    // console.log(e);
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

  // Cursor and illustration animation
  const techEnter = (e) => {
    setIllust(e.target.innerText.split(" ").join("")); //get animate value of variant from inddnerText of each div
    dispatch(cursorHomeTech());
  };
  const techLeave = () => {
    setIllust("default");
    dispatch(cursorDefault());
  };
  const [illust, setIllust] = useState("default");
  const illustVariant = {
    // Modify color -> image scr
    default: {
      backgroundColor: "white",
    },
    TopPosition: {
      backgroundColor: "red",
    },
    GuardPosition: {
      backgroundColor: "blue",
    },
    Drills: {
      backgroundColor: "green",
    },
  };
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
            TITLE
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
        <ul className={styles.techWrapper}>
          {["Top Position", "Guard Position", "Drills"].map((tech, index) => (
            <motion.div
              key={index}
              className={styles.tech}
              onMouseEnter={techEnter}
              onMouseLeave={techLeave}
              // onMouseEnter={techEnter(index)}
            >
              {tech}
            </motion.div>
          ))}
        </ul>
        <motion.div
          className={styles.techIllust}
          variants={illustVariant}
          animate={illust}
        />
      </div>
    </div>
  );
}
