import { Wifi } from 'lucide-react';
import { HeroSection } from '@/components/landing/HeroSection';
import { SocialProofBar } from '@/components/landing/SocialProofBar';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { FeaturesGrid } from '@/components/landing/FeaturesGrid';
import { PricingSection } from '@/components/landing/PricingSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { FAQSection } from '@/components/landing/FAQSection';
import { Footer } from '@/components/landing/Footer';

const LandingNav = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 backdrop-blur-xl bg-background/80">
    <div className="container px-4 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
          <Wifi className="w-4 h-4 text-primary-foreground" />
        </div>
        <span className="font-display font-bold text-foreground text-lg">HotspotHive</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
        <a href="/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Login</a>
        <a href="/register" className="gradient-bg text-primary-foreground text-sm font-semibold px-5 py-2 rounded-lg hover:opacity-90 transition-opacity">Get Started</a>
      </div>
      <a href="/register" className="md:hidden gradient-bg text-primary-foreground text-sm font-semibold px-4 py-2 rounded-lg">Start</a>
    </div>
  </nav>
);

const Index = () => (
  <div className="min-h-screen bg-background">
    <LandingNav />
    <HeroSection />
    <SocialProofBar />
    <HowItWorks />
    <FeaturesGrid />
    <PricingSection />
    <TestimonialsSection />
    <FAQSection />
    <Footer />
  </div>
);

export default Index;
