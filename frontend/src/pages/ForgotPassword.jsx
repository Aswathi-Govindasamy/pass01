import { useState } from "react";
import api from "../services/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  

  const submit = async e => {
    e.preventDefault();
    const res = await api.post("/forgot-password", { email });
  alert(res.data.message);
  };

  return (
    <div className="container mt-5">
      <h3>Forgot Password</h3>
      <form onSubmit={submit}>
        <input
          type="email"
          className="form-control"
          required
          onChange={e => setEmail(e.target.value)}
        />
        <button className="btn btn-primary mt-3">Send Link</button>
      </form>
    </div>
  );
}
