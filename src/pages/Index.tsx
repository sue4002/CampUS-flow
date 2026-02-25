import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import heroBg from "@/assets/hero-bg.png";

const stats = [
  { label: "Services", value: "4+" },
  { label: "Available", value: "24/7" },
  { label: "Campus Coverage", value: "100%" },
];

const Index = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          filter: "blur(20px)",
          transform: "scale(1.1)",
        }}
      />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, hsl(0 6% 7% / 0.85), hsl(0 6% 7% / 0.7) 50%, hsl(0 6% 7% / 0.95))" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 50% 40%, hsl(0 72% 70% / 0.12) 0%, transparent 55%)" }} />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center px-6"
      >
        <img src={logo} alt="CampUs" className="h-[90px] w-auto mx-auto mb-6" />

        <h1 className="text-5xl md:text-7xl font-extrabold text-foreground mb-4">
          Camp<span className="text-primary">Us</span>
        </h1>

        <p className="text-xl md:text-2xl text-highlight font-medium mb-2">
          Your Campus. One Tap Away.
        </p>
        <p className="text-lg text-muted-foreground mb-10">
          Find. Eat. Fix. Repeat.
        </p>

        <Link
          to="/login"
          className="inline-block px-10 py-4 rounded-2xl gradient-primary text-primary-foreground font-bold text-lg transition-all hover:opacity-90 active:scale-95 glow-primary"
        >
          Get Started
        </Link>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative z-10 mt-16 flex gap-8 md:gap-16"
      >
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-primary">{s.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Index;
