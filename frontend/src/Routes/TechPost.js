import { useParams } from "react-router";
import styles from "./TechPost.module.css";
import Video from "../Component/Video";

export default function TechPost() {
  const { techTitle, postTitle } = useParams();
  return (
    <div className={styles.Wrapper}>
      <h1>{postTitle}</h1>
      <div className={styles.illusts}>
        {[1, 2, 3, 4].map((illust) => (
          <div className={styles.illustWrapper}>
            {illust % 2 !== 0 ? (
              <div className={styles.illustInfo}>동작 설명</div>
            ) : null}
            <div key={illust} className={styles.illust}></div>
            {illust % 2 === 0 ? (
              <div className={styles.illustInfo}>동작 설명</div>
            ) : null}
          </div>
        ))}
      </div>
      <Video />
    </div>
  );
}
// export default function TechPost({ postTitle }) {
//   return <div>{postTitle}</div>;
// }
