import { useCart } from "@/store/use-cart";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateOrder } from "@workspace/api-client-react";

const checkoutSchema = z.object({
  customerName: z.string().min(2, "Name is required"),
  customerEmail: z.string().email("Valid email is required"),
  customerPhone: z.string().min(10, "Valid phone number required"),
  deliveryAddress: z.string().min(5, "Delivery address is required"),
  paymentMethod: z.enum(["mpesa", "card"]),
  notes: z.string().optional()
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { items, getTotal, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const createOrder = useCreateOrder();

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "mpesa"
    }
  });

  if (items.length === 0) {
    setLocation("/cart");
    return null;
  }

  const onSubmit = (data: CheckoutForm) => {
    const orderData = {
      ...data,
      totalAmount: getTotal(),
      items: items.map(i => ({
        productId: i.product.id,
        variantId: i.variant?.id,
        productName: i.product.name,
        weight: i.variant?.weight || i.product.weight,
        quantity: i.quantity,
        price: i.variant?.price || i.product.price
      }))
    };

    createOrder.mutate({ data: orderData }, {
      onSuccess: () => {
        clearCart();
        alert("Order placed successfully! We will contact you soon.");
        setLocation("/");
      },
      onError: (err) => {
        alert("Failed to place order. Please try again.");
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl font-bold text-primary mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit(onSubmit)} className="bg-card rounded-3xl p-8 border border-border/50 shadow-sm space-y-6">
                <h2 className="font-display text-2xl font-bold text-primary mb-6">Delivery Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">Full Name</label>
                    <input 
                      {...register("customerName")}
                      className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                    />
                    {errors.customerName && <p className="text-destructive text-xs mt-1">{errors.customerName.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-primary mb-2">Phone Number</label>
                    <input 
                      {...register("customerPhone")}
                      className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                    />
                    {errors.customerPhone && <p className="text-destructive text-xs mt-1">{errors.customerPhone.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Email Address</label>
                  <input 
                    type="email"
                    {...register("customerEmail")}
                    className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                  />
                  {errors.customerEmail && <p className="text-destructive text-xs mt-1">{errors.customerEmail.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Delivery Address (Nairobi)</label>
                  <textarea 
                    {...register("deliveryAddress")}
                    rows={3}
                    className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all"
                  />
                  {errors.deliveryAddress && <p className="text-destructive text-xs mt-1">{errors.deliveryAddress.message}</p>}
                </div>

                <div className="pt-6 border-t border-border">
                  <h2 className="font-display text-2xl font-bold text-primary mb-6">Payment Method</h2>
                  <div className="flex gap-6">
                    <label className="flex-1 cursor-pointer">
                      <input type="radio" value="mpesa" {...register("paymentMethod")} className="peer sr-only" />
                      <div className="rounded-xl border-2 border-border p-4 text-center peer-checked:border-accent peer-checked:bg-accent/5 transition-all">
                        <span className="font-bold text-primary">M-Pesa</span>
                      </div>
                    </label>
                    <label className="flex-1 cursor-pointer">
                      <input type="radio" value="card" {...register("paymentMethod")} className="peer sr-only" />
                      <div className="rounded-xl border-2 border-border p-4 text-center peer-checked:border-accent peer-checked:bg-accent/5 transition-all">
                        <span className="font-bold text-primary">Card</span>
                      </div>
                    </label>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={createOrder.isPending}
                  className="w-full h-14 rounded-xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {createOrder.isPending ? "Processing..." : `Pay KES ${getTotal()}`}
                </button>
              </form>
            </div>
            
            <div className="lg:col-span-5">
              <div className="bg-secondary/30 rounded-3xl p-8 sticky top-32">
                <h2 className="font-display text-2xl font-bold text-primary mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-primary font-medium">{item.quantity}x {item.product.name} ({item.variant?.weight || item.product.weight})</span>
                      <span className="font-bold text-primary">KES {(item.variant?.price || item.product.price) * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-primary/10 pt-4 flex justify-between items-center text-lg">
                  <span className="font-bold text-primary">Total</span>
                  <span className="font-display text-2xl font-bold text-accent">KES {getTotal()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
