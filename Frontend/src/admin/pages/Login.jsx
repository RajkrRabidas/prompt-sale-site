import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    setError("");
    if (!email) return setError("Please enter your email.");
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
    if (!re.test(email)) return setError("Please enter a valid email address.");
    if (!password) return setError("Please enter your password.");
    return true;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (validate() !== true) return;

    setLoading(true);
    setError("");
    try {
      const res = await api.post("/admin/login", { email, password });
      if (res?.data?.token) {
        localStorage.setItem("admin_token", res.data.token);
        navigate("/admin/dashboard");
        toast.success("Login successful!");
      } else {
        setError("Unexpected server response. Try again.");
        toast.error("Unexpected server response. Try again.");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || err?.message || "Login failed";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
      toast.dismiss("loading");
    }
  };

  const styles = {
    container: {
      maxWidth: 450,
      padding: 24,
      border: "1px solid #e6e6e6",
      borderRadius: 8,
      boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      fontFamily: "Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",

    },
    label: { display: "block", marginBottom: 6, fontSize: 14, color: "#333" },
    input: { width: "100%", padding: "10px 12px", marginBottom: 12, borderRadius: 6, border: "1px solid #ccc", outline: "none" },
    button: { width: "100%", padding: "10px 12px", borderRadius: 6, border: "none", background: "#1f6feb", color: "white", fontWeight: 600, cursor: "pointer" },
    error: { color: "#b00020", marginBottom: 12 },
    title: { textAlign: "center", fontSize: 24, fontWeight: 600, marginBottom: 18 }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-linear-to-b from-[#7acaf8] to-[#FBFDFF]">
    <form style={styles.container} onSubmit={submit} aria-labelledby="admin-login-title" className="bg-linear-to-b from-[#9ad4f5] from-5% to-[#FBFDFF]">
      <h2 id="admin-login-title" style={styles.title}>Admin Login</h2>

      {error && <div role="alert" style={styles.error}>{error}</div>}

      <label style={styles.label} htmlFor="admin-email">Email</label>
      <input
        id="admin-email"
        type="email"
        placeholder="you@company.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={styles.input}
        autoComplete="username"
      />

      <label style={styles.label} htmlFor="admin-password">Password</label>
      <input
        id="admin-password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={styles.input}
        autoComplete="current-password"
      />

      <button type="submit" style={styles.button} disabled={loading}>
        {loading ? "Signing in..." : "Sign in"}
      </button>
      <Toaster />
    </form>
    </div>
  );
}
