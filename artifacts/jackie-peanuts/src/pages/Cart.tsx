import { useCart } from "@/store/use-cart";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "wouter";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";

export default function Cart() {
  const { items, updateQuantity, removeItem, getTotal } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-primary mb-8">Shopping Cart</h1>
          
          {items.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-3xl border border-border/50">
              <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-primary mb-6">
                <ShoppingBag size={32} />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">Looks like you haven't added any nutty goodness yet.</p>
              <Link href="/products" className="inline-flex h-12 items-center justify-center rounded-xl bg-accent px-8 font-bold text-white shadow-lg shadow-accent/20 hover:bg-accent/90">
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid gap-8">
              <div className="bg-card rounded-3xl p-6 md:p-8 border border-border/50 shadow-sm">
                <div className="flex flex-col gap-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-6 py-4 border-b border-border/50 last:border-0 last:pb-0">
                      <img 
                        src={item.variant?.imageUrl || item.product.imageUrl} 
                        alt={item.product.name} 
                        className="w-24 h-24 rounded-xl object-cover bg-secondary/30"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-primary">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground">Weight: {item.variant?.weight || item.product.weight}</p>
                        <p className="font-bold text-accent mt-2">KES {item.variant?.price || item.product.price}</p>
                      </div>
                      
                      <div className="flex items-center gap-4 w-full sm:w-auto justify-between">
                        <div className="flex items-center rounded-lg border border-border bg-background">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-2 text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-10 text-center font-semibold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-destructive/80 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary text-primary-foreground rounded-3xl p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <p className="text-primary-foreground/80 mb-1">Subtotal</p>
                  <p className="font-display text-4xl font-bold">KES {getTotal()}</p>
                </div>
                <Link 
                  href="/checkout" 
                  className="w-full md:w-auto inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-accent px-8 text-lg font-bold text-white shadow-lg shadow-accent/25 hover:bg-accent/90 transition-all hover:-translate-y-1"
                >
                  Proceed to Checkout <ArrowRight size={20} />
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Ensure ShoppingBag works since I missed importing it above inside the file
import { ShoppingBag as ShoppingBagIcon } from "lucide-react";
const ShoppingBag = ShoppingBagIcon;
