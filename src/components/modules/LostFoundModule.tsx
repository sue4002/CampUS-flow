import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Phone } from "lucide-react";

type Tab = "all" | "lost" | "found";

const items = [
  { id: 1, name: "iPhone 13", type: "lost" as const, desc: "Space grey, cracked screen protector", location: "Library 2nd Floor", date: "2025-02-22", image: "https://images.unsplash.com/photo-1632633173522-47456de71b76?w=300&h=200&fit=crop" },
  { id: 2, name: "Student ID Card", type: "found" as const, desc: "Name: Rahul Sharma, B.Tech CSE", location: "Canteen", date: "2025-02-23", image: "https://images.unsplash.com/photo-1578496479914-7ef3b0193be3?w=300&h=200&fit=crop" },
  { id: 3, name: "Water Bottle", type: "lost" as const, desc: "Blue Milton 1L bottle with stickers", location: "Lab Block A", date: "2025-02-21", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=200&fit=crop" },
  { id: 4, name: "Umbrella", type: "found" as const, desc: "Black folding umbrella", location: "Bus Depot", date: "2025-02-24", image: "https://images.unsplash.com/photo-1534309466160-70b22cc6254b?w=300&h=200&fit=crop" },
  { id: 5, name: "Backpack", type: "lost" as const, desc: "Grey Wildcraft bag with laptop", location: "Multipurpose Ground", date: "2025-02-20", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=200&fit=crop" },
];

const LostFoundModule = () => {
  const [tab, setTab] = useState<Tab>("all");

  const filtered = tab === "all" ? items : items.filter((i) => i.type === tab);

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">🔎 Lost & Found</h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(["all", "lost", "found"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-2 rounded-xl text-sm font-semibold capitalize transition-all ${
              tab === t ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl overflow-hidden bg-card border border-border"
          >
            <div className="h-36 overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-foreground">{item.name}</h4>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                  item.type === "lost" ? "bg-red-900/50 text-red-400" : "bg-green-900/50 text-green-400"
                }`}>
                  {item.type}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{item.desc}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1"><MapPin size={12} /> {item.location}</span>
                <span className="flex items-center gap-1"><Calendar size={12} /> {item.date}</span>
              </div>
              <button className="w-full py-2 rounded-lg bg-muted hover:bg-muted/80 text-sm font-semibold text-primary flex items-center justify-center gap-1.5 transition-colors">
                <Phone size={14} /> Contact
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LostFoundModule;
