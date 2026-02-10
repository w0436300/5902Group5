import { Navigate, Outlet } from "react-router-dom";
import { isDemoAuthed } from "../auth";

/**
 * Route guard – redirects to /login when demo auth is not active.
 * Wrap protected <Route> elements with this component.
 */
export default function RequireAuth() {
  return isDemoAuthed() ? <Outlet /> : <Navigate to="/login" replace />;
}
