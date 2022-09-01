import { Link, Outlet } from "react-router-dom";

export default function User() {
  return (
    <>
      <div>My Page</div>
      <Link to={`/user/123`}>Link DairyId</Link>
      {/* Outlet component renders the matching child route in react-route 6 */}
      <Outlet />
    </>
  );
}
