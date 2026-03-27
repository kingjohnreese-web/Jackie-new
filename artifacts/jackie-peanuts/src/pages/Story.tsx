import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Story() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary mb-6">Our Story</h1>
            <p className="text-xl text-muted-foreground text-balance mx-auto">
              From a small family farm to a brand that fuels dreamers worldwide.
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden mb-16 shadow-2xl shadow-primary/10">
            <img 
              src={`${import.meta.env.BASE_URL}images/story-legacy.png`} 
              alt="Jackie Peanuts Farm" 
              className="w-full h-auto aspect-video object-cover"
            />
          </div>

          <div className="prose prose-lg prose-primary mx-auto">
            <p>
              Jackie Peanuts started with a simple belief: the best foods come directly from the earth, 
              untouched by artificial processing. What began as a small batch of carefully roasted peanuts 
              shared among family and friends quickly grew into a passion project.
            </p>
            <h3>The Pursuit of Purity</h3>
            <p>
              We realized that most commercial peanut butter was packed with refined sugars, hydrogenated oils, 
              and artificial preservatives. We wanted to change that. "The Nutty Universe" was born out of 
              the desire to create a world where snacking is both incredibly delicious and entirely wholesome.
            </p>
            <p>
              Our process is simple. We source the finest peanuts, roast them to perfection to unlock their 
              deepest flavors, and grind them into the smooth and crunchy textures our customers love. 
              Nothing more, nothing less.
            </p>
            <h3>Looking Forward</h3>
            <p>
              Today, Jackie Peanuts is trusted by young professionals, students, and health-conscious families. 
              But our journey doesn't stop here. We are constantly innovating, looking for new ways to bring 
              the natural goodness of peanuts into your daily routine.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
