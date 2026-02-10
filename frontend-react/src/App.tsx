import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DataExamplePreview from "./pages/DataExamplePreview";
import RequireAuth from "./components/RequireAuth";
import AppLayout from "./components/AppLayout";

export default function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes wrapped in layout */}
      <Route element={<RequireAuth />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/data-example" element={<DataExamplePreview />} />
        </Route>
      </Route>

      {/* Fallback → login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
