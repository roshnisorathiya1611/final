import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function PatientProtectedWrapper({ children }) {
  const { user } = useSelector((state) => state);
  return user == null ? <Navigate to="/" /> : children;
}
