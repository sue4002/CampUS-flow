import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, MapPin } from "lucide-react";

const departments = ["All", "CSE", "ECE", "Mechanical", "Cultural", "Sports"];

const events = [
  { id: 1, title: "TechFest 2025", dept: "CSE", date: "Mar 15, 2025", location: "Main Auditorium", desc: "Annual tech symposium with workshops and hackathons", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop" },
  { id: 2, title: "Cultural Night", dept: "Cultural", date: "Mar 20, 2025", location: "Open Air Theatre", desc: "Music, dance and drama performances", image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=250&fit=crop" },
  { id: 3, title: "Robotics Workshop", dept: "ECE", date: "Mar 10, 2025", location: "Lab Block B", desc: "Hands-on workshop on Arduino and IoT", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=250&fit=crop" },
  { id: 4, title: "Inter-College Cricket", dept: "Sports", date: "Mar 25, 2025", location: "Sports Ground", desc: "Annual inter-college cricket tournament", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&h=250&fit=crop" },
  { id: 5, title: "CAD/CAM Seminar", dept: "Mechanical", date: "Mar 12, 2025", location: "Seminar Hall", desc: "Industry experts on modern manufacturing", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&h=250&fit=crop" },
];

const EventsModule = () => {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All");

  const filtered = events.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    const matchDept = dept === "All" || e.dept === dept;
    return matchSearch && matchDept;
  });

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">🎉 Events</h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <select
          value={dept}
          onChange={(e) => setDept(e.target.value)}
          className="px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {departments.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Event Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl overflow-hidden bg-card border border-border group transition-all duration-300 hover:-translate-y-1 glow-hover"
          >
            <div className="h-40 overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-4">
              <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">{event.dept}</span>
              <h4 className="font-bold text-foreground mt-2">{event.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{event.desc}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-3">
                <span className="flex items-center gap-1"><Calendar size={12} /> {event.date}</span>
                <span className="flex items-center gap-1"><MapPin size={12} /> {event.location}</span>
              </div>
              <button className="w-full mt-4 py-2.5 rounded-lg gradient-primary text-primary-foreground text-sm font-bold transition-all active:scale-[0.98]">
                Register
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default EventsModule;
