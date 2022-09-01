import { useParams } from "react-router";
import styles from "./TechPost.module.css";
import YouTube, { YouTubeProps } from "react-youtube";

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
      <div>
        <h2>Related video lectures</h2>
        {/* Install react-youtube to use this component */}
        {/* https://www.youtube.com/watch?v=w31i45Cfwvs*/}
        <div>
          <button> prev </button>
          <YouTube
            videoId="w31i45Cfwvs"
            opts={{
              width: "560",
              height: "315",
              playerVars: {
                autoplay: 0, // 1: autoplay on
                rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
                modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
              },
            }}
            //이벤트 리스너
            onEnd={(e) => {
              e.target.stopVideo(0);
            }}
          />
          <button> next </button>
        </div>
      </div>
    </div>
  );
}
// export default function TechPost({ postTitle }) {
//   return <div>{postTitle}</div>;
// }
