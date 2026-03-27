import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { WhatsAppFab } from "@/components/WhatsAppFab";

import Home from "@/pages/Home";
import Products from "@/pages/Products";
import Story from "@/pages/Story";
import Philosophy from "@/pages/Philosophy";
import Wholesale from "@/pages/Wholesale";
import Contact from "@/pages/Contact";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";

import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminOrders from "@/pages/admin/Orders";
import AdminSubscribers from "@/pages/admin/Subscribers";
import AdminWholesale from "@/pages/admin/WholesaleInquiries";
import AdminMessages from "@/pages/admin/ContactMessages";

import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <>
      <AnalyticsTracker />
      <Switch>
        {/* Public Routes */}
        <Route path="/" component={Home} />
        <Route path="/products" component={Products} />
        <Route path="/story" component={Story} />
        <Route path="/philosophy" component={Philosophy} />
        <Route path="/wholesale" component={Wholesale} />
        <Route path="/contact" component={Contact} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />

        {/* Admin Routes */}
        <Route path="/admin/login" component={AdminLogin} />
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/orders" component={AdminOrders} />
        <Route path="/admin/subscribers" component={AdminSubscribers} />
        <Route path="/admin/wholesale" component={AdminWholesale} />
        <Route path="/admin/messages" component={AdminMessages} />

        <Route component={NotFound} />
      </Switch>
      <WhatsAppFab />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
