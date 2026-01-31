import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  CalendarCheck, 
  MessageSquare, 
  Users, 
  FileText,
  Car
} from "lucide-react";
import { AdminTab } from "@/pages/Admin";

interface AdminSidebarProps {
  activeTab: AdminTab;
  setActiveTab: (tab: AdminTab) => void;
}

const menuItems = [
  { id: "overview" as AdminTab, label: "Overview", icon: LayoutDashboard },
  { id: "bookings" as AdminTab, label: "Bookings", icon: CalendarCheck },
  { id: "messages" as AdminTab, label: "Messages", icon: MessageSquare },
  { id: "clients" as AdminTab, label: "Clients", icon: Users },
  { id: "invoices" as AdminTab, label: "Invoices", icon: FileText },
];

const AdminSidebar = ({ activeTab, setActiveTab }: AdminSidebarProps) => {
  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Car className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-bold text-foreground">AutoGarage</h1>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                  activeTab === item.id
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          © 2024 AutoGarage
        </p>
      </div>
    </aside>
  );
};

export default AdminSidebar;
