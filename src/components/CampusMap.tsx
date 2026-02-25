import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, X } from "lucide-react";

const locations = [
  { name: "Academic Block", x: 30, y: 25 },
  { name: "Engineering Block", x: 60, y: 20 },
  { name: "Pharmacy Block", x: 75, y: 40 },
  { name: "Law Department", x: 20, y: 55 },
  { name: "Diploma Block", x: 50, y: 60 },
  { name: "Canteen", x: 40, y: 45 },
  { name: "Nescafe", x: 65, y: 55 },
  { name: "Bus Depot", x: 85, y: 75 },
  { name: "Multipurpose Ground", x: 35, y: 78 },
];

const CampusMap = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 left-6 z-40 p-3.5 rounded-2xl gradient-primary text-primary-foreground shadow-lg transition-all hover:opacity-90 active:scale-95 animate-pulse-glow"
      >
        <Map size={22} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl glass rounded-2xl p-6"
            >
              <button onClick={() => setOpen(false)} className="absolute top-4 right-4 p-1 hover:bg-muted rounded-lg transition-colors">
                <X size={20} />
              </button>

              <h3 className="text-xl font-bold text-foreground mb-4">🗺 Campus Map</h3>

              <div className="relative w-full aspect-[4/3] rounded-xl bg-muted border border-border overflow-hidden">
                {/* Grid lines */}
                <div className="absolute inset-0 opacity-10">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i}>
                      <div className="absolute w-full h-px bg-foreground" style={{ top: `${(i + 1) * 10}%` }} />
                      <div className="absolute h-full w-px bg-foreground" style={{ left: `${(i + 1) * 10}%` }} />
                    </div>
                  ))}
                </div>

                {/* You Are Here */}
                <div className="absolute animate-pulse-glow" style={{ left: "48%", top: "42%" }}>
                  <div className="w-4 h-4 rounded-full bg-primary border-2 border-primary-foreground shadow-lg" />
                  <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs text-primary font-bold whitespace-nowrap">You</span>
                </div>

                {/* Location markers */}
                {locations.map((loc) => (
                  <button
                    key={loc.name}
                    onClick={() => setSelected(selected === loc.name ? null : loc.name)}
                    className="absolute group"
                    style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                  >
                    <span className="text-lg">📍</span>
                    {selected === loc.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-3 py-1.5 rounded-lg glass text-xs font-semibold whitespace-nowrap text-foreground shadow-xl"
                      >
                        {loc.name}
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CampusMap;
