import { Link, useLocation } from "wouter";
import { useAuth } from "@/store/use-auth";
import { LayoutDashboard, ShoppingBag, Users, Store, MessageSquare, LogOut, Package } from "lucide-react";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const { token, logout } = useAuth();

  if (!token) {
    setLocation("/admin/login");
    return null;
  }

  const handleLogout = () => {
    logout();
    setLocation("/admin/login");
  };

  const menu = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Orders", path: "/admin/orders", icon: ShoppingBag },
    { name: "Subscribers", path: "/admin/subscribers", icon: Users },
    { name: "Wholesale", path: "/admin/wholesale", icon: Store },
    { name: "Messages", path: "/admin/messages", icon: MessageSquare },
  ];

  return (
    <div className="flex min-h-screen bg-muted/50">
      <aside className="fixed inset-y-0 left-0 w-64 border-r bg-card shadow-sm">
        <div className="flex h-16 items-center px-6 border-b">
          <span className="font-display text-xl font-bold text-primary">Admin Panel</span>
        </div>
        <nav className="p-4 space-y-1">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                  isActive ? "bg-primary text-white" : "text-muted-foreground hover:bg-secondary hover:text-primary"
                }`}
              >
                <Icon size={20} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl font-medium text-destructive transition-colors hover:bg-destructive/10"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
      <main className="pl-64 flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
