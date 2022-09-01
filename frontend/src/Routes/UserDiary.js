import { useParams } from "react-router";

export default function UserDiary() {
  const { diaryId } = useParams();

  return (
    <>
      <div>{diaryId}</div>
    </>
  );
}
