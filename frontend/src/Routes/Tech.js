import { Outlet, useParams } from "react-router";
import { Link } from "react-router-dom";

export default function Tech() {
  const { techTitle } = useParams();

  return (
    <>
      <div>{techTitle}</div>
      <Link to={`/${techTitle}/mount`}>Link Mount</Link>
      {/* Outlet component renders the matching child route in react-route 6 */}
      <Outlet />
    </>
  );
}
