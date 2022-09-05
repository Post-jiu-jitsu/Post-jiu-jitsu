import { Link, useParams } from "react-router-dom";
import styles from "./TechTree.module.css";

export default function TechTree({ techs }) {
  const { techTitle } = useParams();
  return (
    <div className={styles.categories}>
      {techs.map((tech) => (
        <div key={tech.title} className={styles.category}>
          <h2>{tech.title}</h2>
          <div className={styles.posts}>
            {tech.contents.map((content) => (
              <div key={content.title}>
                <Link
                  className={styles.link}
                  to={`/${techTitle}/${content.link}`}
                >
                  {content.title}
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
