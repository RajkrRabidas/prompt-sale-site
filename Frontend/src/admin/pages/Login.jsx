import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    const res = await api.post("/admin/login", { email, password });
    localStorage.setItem("admin_token", res.data.token);
    navigate("/admin/dashboard");

    console.log("Logged in");
    console.log(res.data);
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password"
        onChange={e => setPassword(e.target.value)} />
      <button onClick={submit}>Login</button>
    </div>
  );
}
