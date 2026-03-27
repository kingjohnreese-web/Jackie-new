import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useSubmitContact } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin, Phone, Mail } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10)
});

export default function Contact() {
  const submitContact = useSubmitContact();
  const { register, handleSubmit, reset } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    submitContact.mutate({ data }, {
      onSuccess: () => {
        alert("Message sent successfully!");
        reset();
      }
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h1 className="font-display text-4xl font-bold text-primary mb-6">Get in Touch</h1>
              <p className="text-lg text-muted-foreground mb-12">
                Have a question about our products, or just want to say hello? We'd love to hear from you.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-lg">Visit Us</h3>
                    <p className="text-muted-foreground">Nairobi, Kenya<br/>(Open for wholesale pickups)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-lg">Call Us</h3>
                    <p className="text-muted-foreground">+254 700 000 000</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary text-primary shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-lg">Email Us</h3>
                    <p className="text-muted-foreground">jackiepeanutske@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-card rounded-3xl p-8 shadow-xl shadow-primary/5 border border-border/50">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Name</label>
                  <input {...register("name")} className="w-full rounded-xl border-2 border-border px-4 py-3 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Email</label>
                  <input type="email" {...register("email")} className="w-full rounded-xl border-2 border-border px-4 py-3 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Subject</label>
                  <input {...register("subject")} className="w-full rounded-xl border-2 border-border px-4 py-3 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Message</label>
                  <textarea {...register("message")} rows={5} className="w-full rounded-xl border-2 border-border px-4 py-3 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10" />
                </div>
                <button 
                  type="submit" 
                  disabled={submitContact.isPending}
                  className="w-full h-14 rounded-xl bg-primary text-white font-bold text-lg shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {submitContact.isPending ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
