import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import styles from "./App.module.css";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "react-redux";

function App() {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const cursor = useStore().getState();

  // check coordinate of mouse movement
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

  // (store.js) match with return value of reducers in cursorSlice
  const cursorVariants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    homeTitle: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: "#004a9d",
      mixBlendMode: "difference",
    },
  };

  return (
    <div>
      {/* change cursor animation by animate prop(cursorStore.js) */}
      <motion.div
        className={styles.cursor}
        variants={cursorVariants}
        animate={cursor}
      />
      {/* Nav by router and scroll */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
