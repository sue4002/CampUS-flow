import { useState } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Clock, Star } from "lucide-react";

const todaysSpecial = {
  name: "Butter Chicken Thali",
  image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&h=400&fit=crop",
  prepTime: "20 min",
  rating: 4.8,
};

const menuItems = [
  { id: 1, name: "Veg Biryani", price: 120, available: true, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&h=200&fit=crop" },
  { id: 2, name: "Paneer Tikka", price: 90, available: true, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=300&h=200&fit=crop" },
  { id: 3, name: "Masala Dosa", price: 60, available: true, image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=300&h=200&fit=crop" },
  { id: 4, name: "Cold Coffee", price: 50, available: false, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300&h=200&fit=crop" },
  { id: 5, name: "Samosa", price: 20, available: true, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=300&h=200&fit=crop" },
  { id: 6, name: "Chai", price: 15, available: true, image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=300&h=200&fit=crop" },
];

const CanteenModule = () => {
  const [cart, setCart] = useState<Record<number, number>>({});

  const addToCart = (id: number) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">🍔 Canteen</h2>
        {cartCount > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass">
            <ShoppingCart size={18} className="text-primary" />
            <span className="text-sm font-semibold">{cartCount} items</span>
          </div>
        )}
      </div>

      {/* Today's Special */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl overflow-hidden bg-card border border-border mb-8"
      >
        <div className="relative h-[180px] w-full overflow-hidden">
          <img src={todaysSpecial.image} alt={todaysSpecial.name} className="w-full h-full object-cover" />
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full gradient-primary text-primary-foreground text-xs font-bold">
            ⭐ Today's Special
          </div>
        </div>
        <div className="p-4 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-lg text-foreground">{todaysSpecial.name}</h3>
            <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1"><Clock size={14} /> {todaysSpecial.prepTime}</span>
              <span className="flex items-center gap-1"><Star size={14} className="text-primary" /> {todaysSpecial.rating}</span>
            </div>
          </div>
          <button
            onClick={() => addToCart(0)}
            className="px-5 py-2 rounded-xl gradient-primary text-primary-foreground text-sm font-bold transition-all active:scale-95"
          >
            Add
          </button>
        </div>
      </motion.div>

      {/* Menu */}
      <h3 className="text-lg font-semibold text-foreground mb-4">Menu</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {menuItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl overflow-hidden bg-card border border-border"
          >
            <div className="h-32 overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-3 flex items-center justify-between">
              <div>
                <p className="font-semibold text-foreground">{item.name}</p>
                <p className="text-sm text-primary font-bold">₹{item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${item.available ? "bg-green-900/50 text-green-400" : "bg-red-900/50 text-red-400"}`}>
                  {item.available ? "Available" : "Out"}
                </span>
                {item.available && (
                  <button
                    onClick={() => addToCart(item.id)}
                    className="px-3 py-1.5 rounded-lg gradient-primary text-primary-foreground text-xs font-bold transition-all active:scale-95"
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CanteenModule;
