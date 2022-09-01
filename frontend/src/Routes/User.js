import { Link, Outlet } from "react-router-dom";
import Calendar from "react-calendar";
import styles from "./User.module.css";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";

export default function User() {
  const [date, setDate] = useState(new Date());
  const onDateChange = (e) => {
    console.log(e);
    setDate(e);
  };
  return (
    <div className={styles.Wrapper}>
      <div className={styles.infoWrapper}>
        <h1>Welcome user!</h1>
        <div className={styles.belt}>
          <div className={styles.beltRank}>
            <div className={styles.beltGrau}></div>
            <div className={styles.beltGrau}></div>
          </div>
        </div>
      </div>
      <div>
        <h3>User's dairy</h3>

        <Calendar
          className={styles.calendar}
          onChange={onDateChange}
          value={date}
        />
      </div>
      <Link to={`/user/${date}`}>Today</Link>
      {/* Outlet component renders the matching child route in react-route 6 */}
      <Outlet />
    </div>
  );
}
