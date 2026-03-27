import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Leaf, Heart, Zap, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={`${import.meta.env.BASE_URL}images/hero-peanuts.png`} 
            alt="Jackie Peanuts Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>
        
        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="inline-block rounded-full bg-accent/20 px-4 py-1.5 text-sm font-bold text-accent backdrop-blur-sm mb-6 border border-accent/20">
              The Nutty Universe
            </span>
            <h1 className="font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6">
              Pure. Natural.<br />Trusted.
            </h1>
            <p className="text-xl text-white/90 mb-10 text-balance leading-relaxed">
              Experience the rich, authentic taste of premium roasted peanuts and creamy peanut butter crafted with zero preservatives.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/products" 
                className="inline-flex h-14 items-center justify-center rounded-xl bg-accent px-8 text-base font-bold text-white shadow-lg shadow-accent/25 transition-all hover:-translate-y-1 hover:bg-accent/90 hover:shadow-xl hover:shadow-accent/30"
              >
                Shop Now
              </Link>
              <Link 
                href="/story" 
                className="inline-flex h-14 items-center justify-center rounded-xl bg-white/10 px-8 text-base font-bold text-white backdrop-blur-md border border-white/20 transition-all hover:bg-white/20"
              >
                Our Story
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { icon: Leaf, title: "100% Natural", desc: "No additives, no preservatives. Just pure, wholesome peanuts sourced from the best farms." },
              { icon: Heart, title: "Inspired by Legacy", desc: "Built on a family tradition of quality and passion for authentic, hearty flavors." },
              { icon: Zap, title: "Fuel for Dreamers", desc: "Packed with protein and energy to power your day, perfect for students and professionals." }
            ].map((value, idx) => (
              <motion.div 
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="rounded-3xl bg-card p-8 shadow-xl shadow-primary/5 border border-border/50 text-center flex flex-col items-center hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary text-primary mb-6">
                  <value.icon size={32} />
                </div>
                <h3 className="font-display text-xl font-bold text-primary mb-4">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-16">Why People Choose Jackie Peanuts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              "Natural Ingredients", "No Preservatives", "Quality Roasted", "Trusted Brand"
            ].map((text, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                  <ShieldCheck size={32} className="text-accent" />
                </div>
                <span className="font-semibold text-lg">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Preview */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <img 
                src={`${import.meta.env.BASE_URL}images/story-legacy.png`} 
                alt="Our Legacy" 
                className="rounded-3xl shadow-2xl shadow-primary/10 w-full h-auto object-cover aspect-[4/3]"
              />
            </div>
            <div>
              <h2 className="font-display text-4xl font-bold text-primary mb-6">The Inspiration Behind The Taste</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Jackie Peanuts was born from a simple desire: to bring the authentic, rich taste of perfectly roasted peanuts to everyone. We believe in the power of pure ingredients to not just feed the body, but fuel the soul.
              </p>
              <Link 
                href="/story" 
                className="inline-flex items-center gap-2 font-bold text-accent hover:text-primary transition-colors text-lg"
              >
                Read the full story <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
