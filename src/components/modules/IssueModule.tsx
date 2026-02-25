import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, MapPin, Send } from "lucide-react";

const categories = ["Electrical", "Plumbing", "Furniture", "Cleanliness", "IT/Network", "Other"];

const statusSteps = ["Reported", "Assigned", "Resolved"];

const existingIssues = [
  { id: 1, title: "Broken fan in Room 204", category: "Electrical", status: 1, date: "2025-02-20" },
  { id: 2, title: "Water leakage in washroom", category: "Plumbing", status: 2, date: "2025-02-18" },
  { id: 3, title: "WiFi not working in Block C", category: "IT/Network", status: 0, date: "2025-02-24" },
];

const IssueModule = () => {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setCategory("");
    setDescription("");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-foreground mb-6">🛠 Issue Reporting</h2>

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="glass rounded-2xl p-6 mb-8 space-y-4"
      >
        <div className="flex items-center gap-3">
          <button type="button" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted hover:bg-muted/80 transition-colors text-sm">
            <Camera size={16} className="text-primary" /> Upload Photo
          </button>
          <button type="button" className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-muted hover:bg-muted/80 transition-colors text-sm">
            <MapPin size={16} className="text-primary" /> Pin Location
          </button>
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          required
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe the issue..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl bg-muted border border-border text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          required
        />

        <button
          type="submit"
          className="w-full py-3 rounded-xl gradient-primary text-primary-foreground font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <Send size={16} /> Submit Report
        </button>

        {submitted && (
          <p className="text-center text-sm text-green-400">✅ Issue reported successfully!</p>
        )}
      </motion.form>

      {/* Existing Issues */}
      <h3 className="text-lg font-semibold text-foreground mb-4">Your Reports</h3>
      <div className="space-y-3">
        {existingIssues.map((issue, i) => (
          <motion.div
            key={issue.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl bg-card border border-border p-4"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-semibold text-foreground">{issue.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{issue.category} · {issue.date}</p>
              </div>
            </div>
            {/* Status tracker */}
            <div className="flex items-center gap-1">
              {statusSteps.map((step, idx) => (
                <div key={step} className="flex items-center gap-1 flex-1">
                  <div className={`w-3 h-3 rounded-full shrink-0 ${idx <= issue.status ? "gradient-primary" : "bg-muted"}`} />
                  <span className={`text-xs ${idx <= issue.status ? "text-primary" : "text-muted-foreground"}`}>{step}</span>
                  {idx < statusSteps.length - 1 && (
                    <div className={`flex-1 h-0.5 ${idx < issue.status ? "gradient-primary" : "bg-muted"}`} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default IssueModule;
