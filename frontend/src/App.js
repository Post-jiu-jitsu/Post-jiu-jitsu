import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Routes/Home";
import styles from "./App.module.css";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "react-redux";
import Tech from "./Routes/Tech";
import User from "./Routes/User";
import Navigation from "./Component/Navigation";
import Login from "./Routes/login";
import TechPost from "./Routes/TechPost";
import NoMatch from "./Routes/NoMatch";
import UserDiary from "./Routes/UserDiary";

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
      backgroundColor: "#b1e1ff",
      mixBlendMode: "hard-light",
    },
    homeTech: {
      height: 70,
      width: 70,
      x: mousePosition.x - 35,
      y: mousePosition.y - 35,
      backgroundColor: "#b1e1ff",
      mixBlendMode: "difference",
    },
  };

  return (
    <>
      {/* change cursor animation by animate prop(cursorStore.js) */}
      <motion.div
        className={styles.cursor}
        variants={cursorVariants}
        animate={cursor}
      />
      {/* Nav by router and scroll */}
      <Router>
        <Navigation />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          {/* Nested routes with react-router 6 */}
          <Route path="/user" element={<User />}>
            <Route path="/user/:diaryId" element={<UserDiary />} />
          </Route>
          <Route path="/:techTitle" element={<Tech />}>
            <Route path="/:techTitle/:postTitle" element={<TechPost />} />
          </Route>
          {/* Others */}
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
