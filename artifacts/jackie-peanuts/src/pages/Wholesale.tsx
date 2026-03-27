import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useCreateWholesaleInquiry } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  businessName: z.string().min(2),
  contactName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  location: z.string().optional(),
  productsInterested: z.string().optional(),
  estimatedVolume: z.string().optional(),
  message: z.string().optional()
});

export default function Wholesale() {
  const createInquiry = useCreateWholesaleInquiry();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    createInquiry.mutate({ data }, {
      onSuccess: () => {
        alert("Inquiry submitted successfully! Our team will contact you soon.");
        reset();
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl font-bold text-primary mb-4">Partner With Us</h1>
            <p className="text-lg text-muted-foreground">Join our network of distributors and bring Jackie Peanuts to your customers.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="bg-card rounded-3xl p-8 md:p-12 shadow-xl shadow-primary/5 border border-border/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Business Name</label>
                <input {...register("businessName")} className="w-full rounded-xl border-2 border-border px-4 py-3 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Contact Person</label>
                <input {...register("contactName")} className="w-full rounded-xl border-2 border-border px-4 py-3 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Email</label>
                <input type="email" {...register("email")} className="w-full rounded-xl border-2 border-border px-4 py-3 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Phone</label>
                <input {...register("phone")} className="w-full rounded-xl border-2 border-border px-4 py-3 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Location / Region</label>
                <input {...register("location")} className="w-full rounded-xl border-2 border-border px-4 py-3 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Estimated Volume (Monthly)</label>
                <input {...register("estimatedVolume")} placeholder="e.g. 500 jars" className="w-full rounded-xl border-2 border-border px-4 py-3 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-primary mb-2">Products of Interest</label>
              <input {...register("productsInterested")} placeholder="Smooth, Crunchy, etc." className="w-full rounded-xl border-2 border-border px-4 py-3 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10" />
            </div>
            <div className="mb-8">
              <label className="block text-sm font-semibold text-primary mb-2">Additional Message</label>
              <textarea {...register("message")} rows={4} className="w-full rounded-xl border-2 border-border px-4 py-3 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10" />
            </div>

            <button 
              type="submit" 
              disabled={createInquiry.isPending}
              className="w-full h-14 rounded-xl bg-accent text-white font-bold text-lg shadow-lg shadow-accent/25 hover:bg-accent/90 transition-all hover:-translate-y-0.5 disabled:opacity-50"
            >
              {createInquiry.isPending ? "Submitting..." : "Submit Inquiry"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
