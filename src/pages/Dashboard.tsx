import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import canteenImg from "@/assets/canteen.png";
import issueImg from "@/assets/issue-reporting.jpg";
import lostImg from "@/assets/lost-found.jpg";
import eventsImg from "@/assets/events.jpg";
import CanteenModule from "@/components/modules/CanteenModule";
import IssueModule from "@/components/modules/IssueModule";
import LostFoundModule from "@/components/modules/LostFoundModule";
import EventsModule from "@/components/modules/EventsModule";

const cards = [
  { id: "canteen", title: "Canteen", desc: "Order food & beverages", img: canteenImg },
  { id: "issues", title: "Issue Reporting", desc: "Report campus issues", img: issueImg },
  { id: "lost", title: "Lost & Found", desc: "Find lost belongings", img: lostImg },
  { id: "events", title: "Events", desc: "Discover campus events", img: eventsImg },
];

const Dashboard = () => {
  const [activeModule, setActiveModule] = useState<string | null>(null);

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground">Hi, Student 👋</h1>
          <p className="text-muted-foreground mt-1">Find. Fix. Eat. Repeat.</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!activeModule ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
            >
              {cards.map((card, i) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setActiveModule(card.id)}
                  className="group cursor-pointer rounded-2xl overflow-hidden bg-card border border-border transition-all duration-300 hover:-translate-y-2 glow-hover"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground text-lg">{card.title}</h3>
                    <p className="text-sm text-muted-foreground mt-0.5">{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <button
                onClick={() => setActiveModule(null)}
                className="mb-6 text-sm text-primary hover:underline flex items-center gap-1"
              >
                ← Back to Dashboard
              </button>
              {activeModule === "canteen" && <CanteenModule />}
              {activeModule === "issues" && <IssueModule />}
              {activeModule === "lost" && <LostFoundModule />}
              {activeModule === "events" && <EventsModule />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;
