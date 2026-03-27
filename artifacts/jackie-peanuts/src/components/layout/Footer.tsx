import { Link } from "wouter";
import { useSubscribe } from "@workspace/api-client-react";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const subscribe = useSubscribe();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    subscribe.mutate({ data: { email } }, {
      onSuccess: () => {
        setEmail("");
        alert("Thanks for subscribing!");
      }
    });
  };

  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-white">Jackie Peanuts</h3>
            <p className="text-primary-foreground/80">
              The Nutty Universe. Pure, natural, and trusted premium peanut brand.
            </p>
          </div>
          
          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-primary-foreground/80 hover:text-white transition-colors">Shop Now</Link></li>
              <li><Link href="/story" className="text-primary-foreground/80 hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/wholesale" className="text-primary-foreground/80 hover:text-white transition-colors">Wholesale</Link></li>
              <li><Link href="/contact" className="text-primary-foreground/80 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-4">Contact Info</h4>
            <ul className="space-y-2 text-primary-foreground/80">
              <li>Nairobi, Kenya</li>
              <li>jackiepeanutske@gmail.com</li>
              <li>+254 700 000 000</li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-lg font-semibold text-white mb-4">Newsletter</h4>
            <p className="text-sm text-primary-foreground/80 mb-4">Subscribe for updates and offers.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-white/10 px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
              <button
                type="submit"
                disabled={subscribe.isPending}
                className="rounded-lg bg-accent px-4 py-2 font-bold text-white transition-colors hover:bg-accent/90 disabled:opacity-50"
              >
                {subscribe.isPending ? "..." : "Join"}
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Jackie Peanuts. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
