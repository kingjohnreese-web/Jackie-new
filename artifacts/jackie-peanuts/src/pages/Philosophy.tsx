import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Philosophy() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-accent font-bold tracking-widest uppercase text-sm mb-4 block">Brand Philosophy</span>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-primary mb-8">
                Welcome to The Nutty Universe
              </h1>
              <div className="space-y-8 text-lg text-muted-foreground">
                <p>
                  At Jackie Peanuts, "The Nutty Universe" isn't just a slogan—it's an entire ecosystem built around purity, health, and authenticity.
                </p>
                <div className="pl-6 border-l-4 border-accent">
                  <h3 className="font-bold text-primary text-xl mb-2">Uncompromising Purity</h3>
                  <p>Nature got it right the first time. We refuse to compromise our products with additives. What you see is exactly what you get.</p>
                </div>
                <div className="pl-6 border-l-4 border-accent">
                  <h3 className="font-bold text-primary text-xl mb-2">Empowering the Dreamers</h3>
                  <p>We believe that high-quality, protein-rich food is essential fuel. Whether you're studying late into the night or building your own empire, we provide the clean energy you need.</p>
                </div>
                <div className="pl-6 border-l-4 border-accent">
                  <h3 className="font-bold text-primary text-xl mb-2">Sustainable & Ethical</h3>
                  <p>We respect the earth that provides our harvest. Ethical sourcing and mindful production are woven into everything we do.</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img 
                src={`${import.meta.env.BASE_URL}images/philosophy-nature.png`} 
                alt="Philosophy" 
                className="rounded-[3rem] shadow-2xl shadow-primary/10 w-full h-auto object-cover aspect-[3/4]"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
