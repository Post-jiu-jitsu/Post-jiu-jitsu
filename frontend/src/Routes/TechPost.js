import { useParams } from "react-router";

export default function TechPost() {
  const { techTitle, postTitle } = useParams();
  return <div>{postTitle}</div>;
}
// export default function TechPost({ postTitle }) {
//   return <div>{postTitle}</div>;
// }
