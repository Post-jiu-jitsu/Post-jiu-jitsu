import styles from "./Navigation.module.css";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Navigation() {
  const [navState, setNaveState] = useState("invisible");
  const navVariant = {
    invisible: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
    },
  };
  const navBtnClicked = () => {
    navState === "invisible"
      ? setNaveState("visible")
      : setNaveState("invisible");
  };
  return (
    <>
      <button className={styles.navBtn} onClick={navBtnClicked} />
      <motion.nav
        className={styles.navWrapper}
        variants={navVariant}
        animate={navState}
      >
        <Link to="/">Home</Link>
        <div></div>
        <Link to="/top" className="techWrapper">
          Top position
        </Link>
        <Link to="/guard">Guard position</Link>
        <Link to="/drills">Drills</Link>
        <div></div>
        <Link to="/user">My page</Link>
        <Link to="/login">Logout</Link>
      </motion.nav>
    </>
  );
}
