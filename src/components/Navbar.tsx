import { Link, useNavigate } from "react-router-dom";
import { Bell, ChevronDown, LogOut, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import logo from "@/assets/logo.png";
import { motion, AnimatePresence } from "framer-motion";

const notifications = [
  { id: 1, text: "Your canteen order #42 is ready!", type: "order" },
  { id: 2, text: "Issue #15 has been assigned", type: "issue" },
  { id: 3, text: "Lost item match found: iPhone 13", type: "lost" },
  { id: 4, text: "TechFest 2025 registration open!", type: "event" },
];

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotif, setShowNotif] = useState(false);
  const [showUser, setShowUser] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2.5">
          <img src={logo} alt="CampUs" className="h-[34px] w-auto" />
          <span className="text-xl font-bold text-foreground">Camp<span className="text-primary">Us</span></span>
        </Link>

        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
            <Link
              to="/login"
              className="px-5 py-2 rounded-lg gradient-primary text-primary-foreground font-semibold text-sm transition-all hover:opacity-90 active:scale-95"
            >
              Sign In
            </Link>
          ) : (
            <>
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => { setShowNotif(!showNotif); setShowUser(false); }}
                  className="relative p-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <Bell size={20} />
                  <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-secondary" />
                </button>
                <AnimatePresence>
                  {showNotif && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 top-12 w-80 glass rounded-xl p-3 space-y-2 shadow-xl"
                    >
                      <p className="text-sm font-semibold text-foreground px-2">Notifications</p>
                      {notifications.map((n) => (
                        <div key={n.id} className="px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                          <p className="text-sm text-foreground/90">{n.text}</p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => { setShowUser(!showUser); setShowNotif(false); }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center">
                    <User size={16} className="text-primary-foreground" />
                  </div>
                  <ChevronDown size={14} className="text-muted-foreground" />
                </button>
                <AnimatePresence>
                  {showUser && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute right-0 top-12 w-48 glass rounded-xl p-2 shadow-xl"
                    >
                      <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors text-sm text-foreground">
                        <User size={16} /> Profile
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors text-sm text-primary"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
