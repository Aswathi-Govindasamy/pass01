import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function ResetPassword() {
  const { token } = useParams();
  const [password, setPassword] = useState("");

  useEffect(() => {
    api.get(`/verify-token/${token}`)
      .catch(() => alert("Link expired or invalid"));
  }, [token]);

  const submit = async e => {
    e.preventDefault();
    await api.post(`/reset-password/${token}`, { password });
    alert("Password reset successful");
  };

  return (
    <div className="container mt-5">
      <h3>Reset Password</h3>
      <form onSubmit={submit}>
        <input
          type="password"
          className="form-control"
          required
          onChange={e => setPassword(e.target.value)}
        />
        <button className="btn btn-success mt-3">Reset</button>
      </form>
    </div>
  );
}
