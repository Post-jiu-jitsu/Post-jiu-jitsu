import styles from "./Video.module.css";
import YouTube, { YouTubeProps } from "react-youtube";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Video() {
  const [videoId, setVideoId] = useState("w31i45Cfwvs");
  const prevBtnClicked = () => {
    setVideoId("w31i45Cfwvs");
  };
  const nextBtnClicked = () => {
    setVideoId("4KlDlLV6SnE");
  };
  return (
    <div className={styles.VideoWrapper}>
      <h2>Related video lectures</h2>
      {/* Install react-youtube to use this component */}
      {/* https://www.youtube.com/watch?v=w31i45Cfwvs*/}
      <div className={styles.Video}>
        <button onClick={prevBtnClicked} className={styles.VideoBtn}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <YouTube
          videoId={videoId}
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
        <button onClick={nextBtnClicked} className={styles.VideoBtn}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
}
