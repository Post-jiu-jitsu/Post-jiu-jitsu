import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import styles from "./App.module.css";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function App() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [cursorAnimate, setcursorAnimate] = useState("default");
  console.log(mousePosition);
  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);
  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: "yellow",
      mixBlendMode: "difference",
    },
  };

  const textEnter = () => setcursorAnimate("text");
  const textLeave = () => setcursorAnimate("default");
  return (
    <div className={styles.viewportDiv}>
      {/* <CustomCursor /> */}
      <motion.div
        className={styles.cursor}
        variants={cursorVariants}
        animate={cursorAnimate}
      />
      <h1
        className={styles.title}
        onMouseEnter={textEnter}
        onMouseLeave={textLeave}
      >
        Hello world
      </h1>
      {/* <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router> */}
    </div>
  );
}

export default App;
