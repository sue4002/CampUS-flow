import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, password);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass rounded-2xl p-8 glow-primary"
      >
        <div className="text-center mb-8">
          <img src={logo} alt="CampUs" className="h-12 w-auto mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground">
            Camp<span className="text-primary">Us</span>
          </h2>
          <p className="text-primary font-medium text-sm mt-1">Find. Fix. Eat. Repeat.</p>
          <p className="text-muted-foreground text-sm mt-1">Your campus, simplified.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="student@campus.edu"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl gradient-primary text-primary-foreground font-bold text-base transition-all hover:opacity-90 active:scale-[0.98]"
          >
            Sign In
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
