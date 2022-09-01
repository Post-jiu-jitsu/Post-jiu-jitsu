import { Outlet, useParams } from "react-router";
import { Link } from "react-router-dom";
import styles from "./Tech.module.css";

export default function Tech() {
  const { techTitle } = useParams();
  const guards = [
    {
      title: "Open guard",
      link: "open-guard",
    },
    {
      title: "Closed guard",
      link: "closed-guard",
    },
    {
      title: "Spider guard",
      link: "spider-guard",
    },
    {
      title: "De La Riva guard",
      link: "deLaRiva-guard",
    },
    {
      title: "Half guard",
      link: "half-guard",
    },
    {
      title: "ETC.",
      link: "etc",
    },
  ];
  return (
    <>
      <div className={styles.techWrapper}>
        <h1>{techTitle.toUpperCase()}</h1>
        <div className={styles.categories}>
          <div className={styles.category}>
            <h2>Guard type</h2>
            <div className={styles.posts}>
              {guards.map((guard) => (
                <Link
                  className={styles.link}
                  to={`/${techTitle}/${guard.link}`}
                >
                  {guard.title}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h2>Sweeps</h2>
          </div>
          <div>
            <h2>Submission</h2>
          </div>
        </div>
      </div>

      {/* Outlet component renders the matching child route in react-route 6 */}
      <Outlet />
    </>
  );
}
