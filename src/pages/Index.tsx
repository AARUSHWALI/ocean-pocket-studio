import { useEffect, useState } from "react";
import { Waves, Fish, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import WaveAnimation from "@/components/WaveAnimation";
import oceanHero from "@/assets/ocean-hero.jpg";
import waves from "@/assets/waves.jpg";

const Index = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${oceanHero})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[hsl(var(--ocean-deep))]/50 to-[hsl(var(--ocean-mid))]/70" />
        </div>
        
        <WaveAnimation />
        
        <div className={`relative z-10 text-center px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl">
            The Ocean
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-lg">
            Discover the beauty and mystery of the world beneath the waves
          </p>
          <Button 
            size="lg" 
            className="bg-[hsl(var(--ocean-foam))] hover:bg-[hsl(var(--ocean-light))] text-[hsl(var(--ocean-deep))] text-lg px-8 py-6 rounded-full shadow-2xl hover:scale-105 transition-transform"
          >
            Explore Depths
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-background relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[hsl(var(--ocean-dark))]">
            Ocean Wonders
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 bg-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-[hsl(var(--ocean-light))]/20">
              <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--ocean-mid))] to-[hsl(var(--ocean-light))] rounded-full flex items-center justify-center mb-6 animate-float">
                <Waves className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[hsl(var(--ocean-dark))]">
                Endless Waves
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                The rhythm of the ocean's waves has captivated humanity for millennia, each one unique yet part of an eternal dance.
              </p>
            </Card>

            <Card className="p-8 bg-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-[hsl(var(--ocean-light))]/20" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--ocean-mid))] to-[hsl(var(--ocean-light))] rounded-full flex items-center justify-center mb-6 animate-float">
                <Fish className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[hsl(var(--ocean-dark))]">
                Marine Life
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Over 230,000 known marine species call the ocean home, with countless more waiting to be discovered in the deep.
              </p>
            </Card>

            <Card className="p-8 bg-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-[hsl(var(--ocean-light))]/20" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-gradient-to-br from-[hsl(var(--ocean-mid))] to-[hsl(var(--ocean-light))] rounded-full flex items-center justify-center mb-6 animate-float">
                <Droplets className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-[hsl(var(--ocean-dark))]">
                Life Source
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Oceans produce over 50% of the world's oxygen and absorb carbon dioxide, making them essential to all life on Earth.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Image Section */}
      <section className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${waves})` }}
        >
          <div className="absolute inset-0 bg-[hsl(var(--ocean-dark))]/30" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl text-center px-4">
            Vast, Deep, Mysterious
          </h2>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[hsl(var(--ocean-dark))] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-lg mb-4">Protecting our oceans for future generations</p>
          <p className="text-sm text-white/70">© 2025 Ocean Website. Dive deeper into the blue.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
